
from flask import Blueprint, request, jsonify

from models.plastic_report_model import PlasticReportModel
from config.db import get_database
from routes.auth_routes import token_required

volunteer_bp = Blueprint('volunteer', __name__)

@volunteer_bp.route('/missions', methods=['GET'])
@token_required
def get_missions(current_user):
    db = get_database()
    if not db:
        return jsonify({'message': 'Database connection failed'}), 500
    
    report_model = PlasticReportModel(db)
    
    # Get verified reports that can be cleaned by volunteers
    missions = report_model.find_reports_by_status("verified")
    return jsonify(missions)

@volunteer_bp.route('/complete/<report_id>', methods=['POST'])
@token_required
def complete_mission(current_user, report_id):
    db = get_database()
    if not db:
        return jsonify({'message': 'Database connection failed'}), 500
    
    report_model = PlasticReportModel(db)
    
    # Update report status to cleaned
    updated_report = report_model.update_report_status(report_id, "cleaned")
    if not updated_report:
        return jsonify({'message': 'Report not found'}), 404
    
    return jsonify(updated_report)
