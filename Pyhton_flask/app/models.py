from app import db

class Internship(db.Model):
    __tablename__ = "internships"

    internship_id= db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    description = db.Column(db.Text)
    skills = db.Column(db.String(255))
    stipend = db.Column(db.String(100))
    preferred_location = db.Column(db.String(255))
    embedding = db.Column(db.LargeBinary)

    def __repr__(self):
        return f"<Internship {self.id}: {self.description[:30]}> {self.skills}"
