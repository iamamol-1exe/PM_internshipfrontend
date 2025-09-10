from app import db, model
from app.models import Internship
from app.embedding_utils import add_internship_with_embedding

# Example data
sample_internships = [
    {
        "title": "Software Engineering Intern",
        "description": "Join our engineering team to build innovative software solutions. You'll work on real-world projects using cutting-edge technologies like Python, React, and AWS.",
        "skills": "Python, JavaScript, React",
        "stipend": "15000-20000 per month",
        "preferred_location": "Bangalore"
    },
    {
        "title": "Data Science Intern",
        "description": "Work with our data team to analyze large datasets and build machine learning models. You'll gain experience with data cleaning, feature engineering, and model deployment.",
        "skills": "Python, SQL, Machine Learning",
        "stipend": "18000-25000 per month",
        "preferred_location": "Hyderabad"
    },
    {
        "title": "Frontend Developer Intern",
        "description": "Design and implement user interfaces for our web applications. You'll collaborate with designers and backend developers to create responsive and accessible UIs.",
        "skills": "HTML, CSS, JavaScript, React",
        "stipend": "12000-18000 per month",
        "preferred_location": "Remote"
    }
]

def add_sample_internships():
    """Add sample internships with embeddings to the database"""
    count = 0
    for internship_data in sample_internships:
        try:
            add_internship_with_embedding(**internship_data)
            count += 1
        except Exception as e:
            print(f"Error adding internship: {str(e)}")
    
    print(f"Added {count} sample internships")
    return count

if __name__ == "__main__":
    # Import this file and run add_sample_internships() to add sample data
    from app import create_app
    app = create_app()
    with app.app_context():
        add_sample_internships()
