from flask import Flask, request, jsonify, json
from flask_cors import CORS 

app = Flask(__name__)
CORS(app, supports_credentials=True)

@app.route("/getdata", methods = ["POST", "GET"])
def get_data():
    text = request.json["text"]
    model = request.json["model"]
       
    return jsonify(
        mytext = text,
        mymodel = model
    )

if __name__ == "__main__":
    app.run(debug=True)