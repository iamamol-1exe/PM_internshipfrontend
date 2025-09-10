from app import db, model
import pickle
import numpy as np

def add_internship_with_embedding(title, description, skills, stipend, preferred_location):
    """
    Add a new internship with automatically generated embedding.
    
    Args:
        title (str): Title of the internship
        description (str): Description of the internship
        skills (str): Required skills for the internship
        stipend (str): Stipend information
        preferred_location (str): Preferred location for the internship
        
    Returns:
        Internship: The created internship object
    """
    from app.models import Internship
    
    # Generate embedding from the description
    embedding = model.encode(description, convert_to_numpy=True)
    # Normalize the embedding
    embedding_norm = embedding / np.linalg.norm(embedding)
    # Pickle the embedding
    pickled_embedding = pickle.dumps(embedding_norm)
    
    # Create new internship
    internship = Internship(
        title=title,
        description=description,
        skills=skills,
        stipend=stipend,
        preferred_location=preferred_location,
        embedding=pickled_embedding
    )
    
    # Add to database
    db.session.add(internship)
    db.session.commit()
    
    return internship

def update_embeddings_for_existing_internships():
    """
    Update embeddings for all internships that don't have them.
    Call this function to generate embeddings for existing records.
    """
    from app.models import Internship
    
    internships = Internship.query.filter(Internship.embedding.is_(None)).all()
    count = 0
    
    for internship in internships:
        if internship.description:
            # Generate embedding from the description
            embedding = model.encode(internship.description, convert_to_numpy=True)
            # Normalize the embedding
            embedding_norm = embedding / np.linalg.norm(embedding)
            # Pickle the embedding
            internship.embedding = pickle.dumps(embedding_norm)
            count += 1
    
    if count > 0:
        db.session.commit()
        print(f"Updated embeddings for {count} internships")
    else:
        print("No internships needed embedding updates")
    
    return count
