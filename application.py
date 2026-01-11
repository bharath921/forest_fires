import pickle
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler 
from flask import Flask,request,jsonify,render_template

application = Flask(__name__, template_folder='templates', static_folder='static')
app=application
ridge_model=pickle.load(open('models/ridge.pkl','rb'))
scaler_model = pickle.load(open('models/scaler.pkl','rb'))
@app.route("/")
def index():
    try:
        return render_template('index.html')
    except Exception as e:
        # Basic error logging to help diagnose template issues
        return jsonify({"error": str(e)}), 500

@app.route("/debug/templates")
def debug_templates():
    import os
    tpl = application.template_folder
    try:
        files = os.listdir(tpl)
    except Exception as e:
        return jsonify({"template_folder": tpl, "list_error": str(e)}), 500
    return jsonify({"template_folder": tpl, "files": files})

@app.route("/health")
def health():
    return jsonify({"status": "ok"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)