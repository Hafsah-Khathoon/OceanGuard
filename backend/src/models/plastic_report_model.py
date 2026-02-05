
from datetime import datetime
from mysql.connector import Error

class PlasticReportModel:
    def __init__(self, connection):
        self.connection = connection
    
    def create_report(self, report_data: dict):
        if not self.connection:
            return None
            
        cursor = self.connection.cursor()
        try:
            query = """
            INSERT INTO plastic_reports (image, location_lat, location_lng, severity, status, reported_by)
            VALUES (%s, %s, %s, %s, %s, %s)
            """
            
            location = report_data.get("location", {})
            values = (
                report_data.get("image"),
                location.get("lat"),
                location.get("lng"),
                report_data["severity"],
                report_data.get("status", "pending"),
                int(report_data["reported_by"])
            )
            
            cursor.execute(query, values)
            self.connection.commit()
            
            report_id = cursor.lastrowid
            report_data["id"] = str(report_id)
            report_data["created_at"] = datetime.utcnow()
            report_data["updated_at"] = datetime.utcnow()
            
            return report_data
            
        except Error as e:
            print(f"Error creating report: {e}")
            return None
        finally:
            cursor.close()
    
    def find_all_reports(self):
        if not self.connection:
            return []
            
        cursor = self.connection.cursor(dictionary=True)
        try:
            query = """
            SELECT r.*, u.name as reporter_name 
            FROM plastic_reports r 
            LEFT JOIN users u ON r.reported_by = u.id
            ORDER BY r.created_at DESC
            """
            cursor.execute(query)
            reports = cursor.fetchall()
            
            # Convert to expected format
            formatted_reports = []
            for report in reports:
                formatted_report = {
                    "id": str(report["id"]),
                    "image": report["image"],
                    "location": {
                        "lat": float(report["location_lat"]) if report["location_lat"] else 0,
                        "lng": float(report["location_lng"]) if report["location_lng"] else 0
                    },
                    "severity": report["severity"],
                    "status": report["status"],
                    "reported_by": str(report["reported_by"]),
                    "reporter_name": report["reporter_name"],
                    "created_at": report["created_at"],
                    "updated_at": report["updated_at"]
                }
                formatted_reports.append(formatted_report)
            
            return formatted_reports
            
        except Error as e:
            print(f"Error finding all reports: {e}")
            return []
        finally:
            cursor.close()
    
    def find_reports_by_status(self, status: str):
        if not self.connection:
            return []
            
        cursor = self.connection.cursor(dictionary=True)
        try:
            query = """
            SELECT r.*, u.name as reporter_name 
            FROM plastic_reports r 
            LEFT JOIN users u ON r.reported_by = u.id
            WHERE r.status = %s
            ORDER BY r.created_at DESC
            """
            cursor.execute(query, (status,))
            reports = cursor.fetchall()
            
            # Convert to expected format
            formatted_reports = []
            for report in reports:
                formatted_report = {
                    "id": str(report["id"]),
                    "image": report["image"],
                    "location": {
                        "lat": float(report["location_lat"]) if report["location_lat"] else 0,
                        "lng": float(report["location_lng"]) if report["location_lng"] else 0
                    },
                    "severity": report["severity"],
                    "status": report["status"],
                    "reported_by": str(report["reported_by"]),
                    "reporter_name": report["reporter_name"],
                    "created_at": report["created_at"],
                    "updated_at": report["updated_at"]
                }
                formatted_reports.append(formatted_report)
            
            return formatted_reports
            
        except Error as e:
            print(f"Error finding reports by status: {e}")
            return []
        finally:
            cursor.close()
    
    def update_report_status(self, report_id: str, status: str):
        if not self.connection:
            return None
            
        cursor = self.connection.cursor(dictionary=True)
        try:
            # Update the report
            update_query = """
            UPDATE plastic_reports 
            SET status = %s, updated_at = CURRENT_TIMESTAMP 
            WHERE id = %s
            """
            cursor.execute(update_query, (status, int(report_id)))
            self.connection.commit()
            
            if cursor.rowcount > 0:
                # Fetch the updated report
                select_query = """
                SELECT r.*, u.name as reporter_name 
                FROM plastic_reports r 
                LEFT JOIN users u ON r.reported_by = u.id
                WHERE r.id = %s
                """
                cursor.execute(select_query, (int(report_id),))
                report = cursor.fetchone()
                
                if report:
                    formatted_report = {
                        "id": str(report["id"]),
                        "image": report["image"],
                        "location": {
                            "lat": float(report["location_lat"]) if report["location_lat"] else 0,
                            "lng": float(report["location_lng"]) if report["location_lng"] else 0
                        },
                        "severity": report["severity"],
                        "status": report["status"],
                        "reported_by": str(report["reported_by"]),
                        "reporter_name": report["reporter_name"],
                        "created_at": report["created_at"],
                        "updated_at": report["updated_at"]
                    }
                    return formatted_report
            
            return None
            
        except Error as e:
            print(f"Error updating report status: {e}")
            return None
        finally:
            cursor.close()
