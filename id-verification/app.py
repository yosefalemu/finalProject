import cv2
import face_recognition
import pytesseract
import re
import shutil
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Constants
ID_CARD_MATCH_THRESHOLD = 0.3
FACE_MATCH_THRESHOLD = 0.45

# Helper functions
def detect_and_encode_face(image, description):
    face_locations = face_recognition.face_locations(image)
    if not face_locations:
        raise Exception(f"No face detected in the {description}.")
    if len(face_locations) > 1:
        raise Exception(f"Multiple faces detected in the {description}. Please provide a single face.")
    face_encoding = face_recognition.face_encodings(image, face_locations)[0]
    return face_encoding

def preprocess_image(image):
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    resized_image = cv2.resize(gray_image, None, fx=2, fy=2, interpolation=cv2.INTER_CUBIC)
    _, threshold_image = cv2.threshold(resized_image, 128, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    return threshold_image

def correct_ocr_errors(text):
    corrections = {
        'O': '0',
        'I': '1',
        'L': '1',
        'Z': '2',
        'S': '5',
        'B': '8',
        'D': '0',
        'G': '6'
    }
    corrected_text = ''.join([corrections.get(char, char) for char in text])
    return corrected_text

def extract_id_number(image):
    preprocessed_image = preprocess_image(image)
    
    try:
        id_number_text = pytesseract.image_to_string(preprocessed_image, config='--psm 6')
    except pytesseract.pytesseract.TesseractError as e:
        raise Exception("Tesseract OCR is not installed or configured correctly. Please ensure it's installed and in your PATH.")
    
    print("EXTRACTED TEXT:", id_number_text)
    
    id_number_text = correct_ocr_errors(id_number_text)
    
    id_number_pattern = re.compile(r'\b(?:\d{4}[-\s]?){3}\d{4}\b|\b\d{16}\b')
    match = id_number_pattern.search(id_number_text)
    if match:
        print("ID NUMBER FOUND", match.group(0).replace(' ', '').replace('-', ''))
        return match.group(0).replace(' ', '').replace('-', '')
    else:
        raise Exception("National ID is not recognized. Please improve the quality of your image.")

def match_images(image1, image2):
    orb = cv2.ORB_create()
    keypoints1, descriptors1 = orb.detectAndCompute(image1, None)
    keypoints2, descriptors2 = orb.detectAndCompute(image2, None)

    if descriptors1 is None or descriptors2 is None:
        raise Exception("Could not find enough descriptors in one of the images to perform matching.")
    
    bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
    matches = bf.match(descriptors1, descriptors2)
    matches = sorted(matches, key=lambda x: x.distance)
    
    match_ratio = len(matches) / min(len(keypoints1), len(keypoints2))
    return match_ratio

@app.route('/upload_id_card', methods=['POST'])
def upload_id_card_image():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    file_path = 'uploaded_id_card.jpg'
    file.save(file_path)
    
    id_card_image = cv2.imread(file_path, cv2.IMREAD_GRAYSCALE)
    if id_card_image is None:
        return jsonify({"error": "Could not read the image from the provided path"}), 400
    
    reference_image_path = os.path.abspath('reference.png')
    reference_image = cv2.imread(reference_image_path, cv2.IMREAD_GRAYSCALE)
    if reference_image is None:
        return jsonify({"error": f"Could not read the reference image from {reference_image_path}"}), 500
    
    try:
        match_ratio = match_images(id_card_image, reference_image)
        if match_ratio > ID_CARD_MATCH_THRESHOLD:
            return jsonify({"message": "Uploaded image matches the Ethiopian national ID card reference."}), 200
        else:
            return jsonify({"message": "Uploaded image does not match the Ethiopian national ID card reference."}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/compare_faces', methods=['POST'])
def compare_faces():
    if 'applicant_image' not in request.files or 'id_card_image' not in request.files:
        return jsonify({"error": "Both applicant_image and id_card_image are required"}), 400
    
    applicant_image_file = request.files['applicant_image']
    id_card_image_file = request.files['id_card_image']
    
    applicant_image = cv2.imdecode(np.frombuffer(applicant_image_file.read(), np.uint8), cv2.IMREAD_COLOR)
    id_card_image = cv2.imdecode(np.frombuffer(id_card_image_file.read(), np.uint8), cv2.IMREAD_COLOR)
    
    if applicant_image is None or id_card_image is None:
        return jsonify({"error": "Could not read one of the images"}), 400

    try:
        applicant_image_rgb = cv2.cvtColor(applicant_image, cv2.COLOR_BGR2RGB)
        id_card_image_rgb = cv2.cvtColor(id_card_image, cv2.COLOR_BGR2RGB)

        applicant_face_encoding = detect_and_encode_face(applicant_image_rgb, "personal photo")
        id_card_face_encoding = detect_and_encode_face(id_card_image_rgb, "ID card photo")

        results = face_recognition.compare_faces([id_card_face_encoding], applicant_face_encoding)
        face_distance = face_recognition.face_distance([id_card_face_encoding], applicant_face_encoding)[0]

        match = bool(results[0]) and float(face_distance) < FACE_MATCH_THRESHOLD
        id_number = extract_id_number(id_card_image) if match else None

        return jsonify({
            "match": match,
            "face_distance": float(face_distance),
            "id_number": id_number
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if not shutil.which("tesseract"):
    raise Exception("Tesseract is not installed or it's not in your PATH. See README file for more information.")

if __name__ == '__main__':
    app.run(debug=True)
