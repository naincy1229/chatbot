from flask import Flask, render_template, request, jsonify
import google.generativeai as genai

genai.configure(api_key="AIzaSyCMwEAVYiGmq7tI_qrmysLClZOTJMlcpWM")  # Replace with your Gemini API key
model = genai.GenerativeModel(model_name="gemini-1.5-flash")

app = Flask(__name__, template_folder="templates", static_folder="static")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/ask", methods=["POST"])
def ask():
    data = request.get_json()
    prompt = data.get("prompt")
    try:
        response = model.generate_content(prompt)
        return jsonify({"response": response.text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
