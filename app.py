from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import joblib

app = Flask(__name__)
CORS(app)
loaded_model = joblib.load("models/diabetes_model.pkl")
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

if __name__ == '__main__':
    app.run(debug=True)