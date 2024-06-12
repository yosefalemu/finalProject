from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import ImageDataGenerator, img_to_array
from PIL import Image
import numpy as np
from joblib import load
import json
import imghdr
import tensorflow as tf

# Enable eager execution
tf.config.run_functions_eagerly(True)

# Initialize Flask application
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the feature extractor and MLP model
feature_extractor = load_model('feature_extractor.h5')
mlp_classifier = load('mlp_classifier.joblib')

# Load the label map
with open('label_map.json', 'r') as f:
    label_map = json.load(f)

# Initialize ImageDataGenerator
datagen = ImageDataGenerator(rescale=1.0/255.0)

# Preprocessing function
def preprocess_image(image, target_size):
    image = image.convert("RGB")  # Convert image to RGB
    image = image.resize(target_size)
    image_array = img_to_array(image)
    image_array = np.expand_dims(image_array, axis=0)
    image_array = datagen.standardize(image_array)
    return image_array

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    # Check if the uploaded file is an image
    file_type = imghdr.what(file)
    if file_type not in ['jpeg', 'png', 'gif', 'bmp', 'tiff']:
        return jsonify({'error': 'Unsupported file type. Please upload an image file.'}), 400

    try:
        image = Image.open(file)
    except Exception as e:
        return jsonify({'error': 'Could not open the image file'}), 400

    processed_image = preprocess_image(image, target_size=(224, 224))

    # Log the processed image shape and type
    print(f"Processed image shape: {processed_image.shape}, type: {processed_image.dtype}")

    try:
        # Extract features using the feature extractor
        features = feature_extractor.predict(processed_image)
        features = features.reshape((features.shape[0], -1))

        # Log the extracted features
        print(f"Extracted features shape: {features.shape}, features: {features}")

        # Predict using the MLP model
        prediction = mlp_classifier.predict(features)

        # Log the raw prediction
        print(f"Raw prediction: {prediction}")

        # Convert prediction to an integer and then to a string
        prediction_label = str(int(prediction[0]))

        # Log the processed prediction label
        print(f"Processed prediction label: {prediction_label}")

        # Check if the prediction_label exists in the label_map
        if prediction_label in label_map:
            predicted_label = label_map[prediction_label]
        else:
            # Handle case where the key is not found
            predicted_label = 'Unknown'

        # Log the final predicted label
        print(f"Final predicted label: {predicted_label}")

        return jsonify({'predicted_label': predicted_label})
    except Exception as e:
        return jsonify({'error': f'Prediction failed: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)
