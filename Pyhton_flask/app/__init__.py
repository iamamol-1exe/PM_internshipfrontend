from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
import pickle

db = SQLAlchemy()
model = None
index = None
internship_ids = []
internship_texts = []
parsed_internships = []

def create_app():
    app = Flask(__name__)

    # MySQL connection (edit username, password, db_name)
    app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://root:root@localhost/Sih"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)

    with app.app_context():
        from app.models import Internship
       # db.create_all()
        init_system(Internship)

        global parsed_internships
        parsed_internships = fetch_and_parse_internships(Internship)

        from app.routes import register_routes
        register_routes(app)

    return app

def init_system(Internship):
    global model, index, internship_ids, internship_texts

    # Load model
    model = SentenceTransformer("all-MiniLM-L6-v2")

    # Load embeddings from DB
    internships = Internship.query.all()
    internship_ids.clear()
    internship_texts.clear()
    embeddings = []
    for i in internships:
        internship_ids.append(i.internship_id)
        internship_texts.append(i.description)
        if i.embedding is not None:
            embeddings.append(pickle.loads(i.embedding))

    embeddings = np.array(embeddings).astype("float32")

    # Build FAISS index only if embeddings exist
    if embeddings.size > 0 and embeddings.ndim == 2:
        dim = embeddings.shape[1]
        index = faiss.IndexFlatIP(dim)
        faiss.normalize_L2(embeddings)
        index.add(embeddings)

def fetch_and_parse_internships(Internship):
    internships = []
    results = Internship.query.all()
    for i in results:
        formatted = f"{i.title} | {i.skills} | {i.preferred_location}"
        internships.append(formatted)
    return internships
