import pickle

def serialize_embedding(embedding):
    return pickle.dumps(embedding)

def deserialize_embedding(blob):
    return pickle.loads(blob)
