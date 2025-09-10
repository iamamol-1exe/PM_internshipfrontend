from app.models import Internship
from app import db

def fetch_and_parse_internships(Internship):
    internships = []
    results = Internship.query.all()
    for i in results:
        # Format: Title | Skills | Preferred Location
        formatted = f"{i.title} | {i.skills} | {i.preferred_location}"
        internships.append(formatted)
        print(internships)
    return internships
