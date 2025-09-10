from flask import request, jsonify
from app import model, index, internship_ids, internship_texts
import faiss
from app.embedding_utils import add_internship_with_embedding

def register_routes(app):

    @app.route("/health", methods=["GET"])
    def health():
        return {"status": "ok"}
    
    @app.route("/update-embeddings", methods=["POST"])
    def update_embeddings():
        from app.embedding_utils import update_embeddings_for_existing_internships
        
        try:
            count = update_embeddings_for_existing_internships()
            # Reinitialize the search system with new embeddings
            from app.models import Internship
            from app import init_system
            init_system(Internship)
            
            return jsonify({"success": True, "message": f"Updated embeddings for {count} internships"}), 200
        except Exception as e:
            return jsonify({"success": False, "error": str(e)}), 500

    @app.route("/search", methods=["POST"])
    def search():
        data = request.json
        query = data.get("query", "")
        top_k = int(data.get("top_k", 3))

        if not query:
            return jsonify({"error": "Query is required"}), 400

        if index is None:
            return jsonify({"error": "Search index is not initialized. Add internships with embeddings first."}), 500

        query_emb = model.encode([query], convert_to_numpy=True)
        faiss.normalize_L2(query_emb)
        scores, indices = index.search(query_emb, top_k)

        results = []
        for idx, score in zip(indices[0], scores[0]):
            results.append({
                "id": internship_ids[idx],
                "description": internship_texts[idx],
                "score": float(score)
            })

        return jsonify({"results": results})
        
    @app.route("/add-internship", methods=["POST"])
    def add_internship():
        data = request.json
        
        # Validate required fields
        required_fields = ["title", "description", "skills", "stipend", "preferred_location"]
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing required field: {field}"}), 400
        
        try:
            # Add internship with embedding
            internship = add_internship_with_embedding(
                title=data["title"],
                description=data["description"],
                skills=data["skills"],
                stipend=data["stipend"],
                preferred_location=data["preferred_location"]
            )
            
            # Reinitialize the search system with new internship
            from app.models import Internship
            from app import init_system
            init_system(Internship)
            
            return jsonify({
                "success": True,
                "message": "Internship added successfully",
                "id": internship.internship_id
            }), 201
            
        except Exception as e:
            return jsonify({"error": str(e)}), 500
