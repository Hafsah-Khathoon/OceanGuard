
from flask import Blueprint, request, jsonify

from models.plastic_report_model import PlasticReportModel
from config.db import get_database
from routes.auth_routes import token_required

citizen_bp = Blueprint('citizen', __name__)

@citizen_bp.route('/report', methods=['POST'])
@token_required
def create_report(current_user):
    data = request.get_json()
    
    if not data or not all(k in data for k in ('location', 'severity')):
        return jsonify({'message': 'Missing required fields'}), 400
    
    db = get_database()
    if not db:
        return jsonify({'message': 'Database connection failed'}), 500
    
    report_model = PlasticReportModel(db)
    
    report_data = {
        "image": data.get('image'),
        "location": data['location'],
        "severity": data['severity'],
        "status": data.get('status', 'pending'),
        "reported_by": current_user["id"]
    }
    
    created_report = report_model.create_report(report_data)
    return jsonify(created_report), 201

@citizen_bp.route('/reports', methods=['GET'])
def get_all_reports():
    db = get_database()
    if not db:
        return jsonify({'message': 'Database connection failed'}), 500
    
    report_model = PlasticReportModel(db)
    reports = report_model.find_all_reports()
    return jsonify(reports)
