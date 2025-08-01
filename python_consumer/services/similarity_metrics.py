import difflib
# import nltk
# from nltk.tokenize import word_tokenize
# from fuzzywuzzy import fuzz

def difflib_similarity(reference: str, transcription: str):
    ratio = difflib.SequenceMatcher(None, reference.lower(), transcription.lower()).ratio()
    return ratio * 100  # percentage


#metrica de similaridade com fuzzywuzzy
# def fuzzy_similarity(ref, trans):
#     return fuzz.ratio(ref, trans)

# transformers (com embeddings semânticos)
# requer mais memoria e internet
# from sentence_transformers import SentenceTransformer, util

# def semantic_similarity(ref, trans):
#     model = SentenceTransformer('all-MiniLM-L6-v2')
#     emb1 = model.encode(ref, convert_to_tensor=True)
#     emb2 = model.encode(trans, convert_to_tensor=True)
#     score = util.pytorch_cos_sim(emb1, emb2)
#     return float(score) * 100
