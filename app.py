from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import joblib
import tensorflow as tf
import numpy as np
import io

from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.mobilenet_v3 import preprocess_input

app = Flask(__name__)
CORS(app)
loaded_model = joblib.load("models/diabetes_model.pkl")
loaded_model_jankenpon = tf.keras.models.load_model("models/jankenpon.keras")
loaded_scaler = joblib.load("models/standard_scaler.pkl")
columns = [
    "Pregnancies",
    "Glucose",
    "BloodPressure",
    "SkinThickness",
    "Insulin",
    "BMI",
    "DiabetesPedigreeFunction",
    "Age"
]

jankenpon_class = ["Paper", "Rock", "Scissors"]

@app.route('/')
def index():
    return jsonify({
        "meta" : {
            "status" : "Success",
            "message" : "Welcome to Diabetes API"
        },
        "data" : None
    })

@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.get_json()

    x_input = pd.DataFrame([data], columns=columns)

    x_input_scaled = loaded_scaler.transform(x_input)

    prediction = loaded_model.predict(x_input_scaled)

    return jsonify({
        "meta" : {
            "status" : "Success",
            "message" : "Predict diabetes using a trained model"
        },
        "data" : "Positive Diabetes" if prediction.tolist()[0] == 1 else "Negative Diabetes"
    })

@app.route("/api/predict-jankenpon", methods=["POST"])
def predict_jankenpon():
    if "file" not in request.files:
        return jsonify({
            "meta" : {
                "status" : "400",
                "message" : "File is required"
            }
        })
    
    file = request.files["file"]
    img_bytes = io.BytesIO(file.read())

    img = image.load_img(img_bytes, target_size =(150,150))
    img_array = image.img_to_array(img)
    img_array = preprocess_input(img_array)
    img_batch = np.expand_dims(img_array, axis = 0)

    prediction = loaded_model_jankenpon.predict(img_batch)
    prediction_class_index = np.argmax(prediction)

    return jsonify({
        "meta" : {
            "status" : "200",
            "message" : "Successfully Predicting"
        },
        "data" : {
            "prediction" : jankenpon_class[prediction_class_index] if np.max(prediction) >= 0.9 else "Not a paper, rock, nor scissors" ,
            "probability" : f"{np.max(prediction) * 100:.2f}%   "
        }
    })


if __name__ == '__main__':
    app.run(debug=True)