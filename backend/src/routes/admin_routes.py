
from flask import Blueprint, request, jsonify

from models.plastic_report_model import PlasticReportModel
from config.db import get_database
from routes.auth_routes import token_required

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/pending', methods=['GET'])
@token_required
def get_pending_reports(current_user):
    # Check if user is admin
    if current_user["role"] != "admin":
        return jsonify({'message': 'Admin access required'}), 403
    
    db = get_database()
    if not db:
        return jsonify({'message': 'Database connection failed'}), 500
    
    report_model = PlasticReportModel(db)
    
    # Get pending reports for verification
    pending_reports = report_model.find_reports_by_status("pending")
    return jsonify(pending_reports)

@admin_bp.route('/verify/<report_id>', methods=['POST'])
@token_required
def verify_report(current_user, report_id):
    # Check if user is admin
    if current_user["role"] != "admin":
        return jsonify({'message': 'Admin access required'}), 403
    
    db = get_database()
    if not db:
        return jsonify({'message': 'Database connection failed'}), 500
    
    report_model = PlasticReportModel(db)
    
    # Update report status to verified
    updated_report = report_model.update_report_status(report_id, "verified")
    if not updated_report:
        return jsonify({'message': 'Report not found'}), 404
    
    return jsonify(updated_report)
