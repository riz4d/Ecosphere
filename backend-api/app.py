from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from flask_cors import CORS
import pyrebase
from mail import send_mail

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'rizaS'
jwt = JWTManager(app)
CORS(app)

firebase_config = {
    "apiKey": "your-api-key",
    "authDomain": "your-auth-domain",
    "databaseURL": "your-database-url",
    "projectId": "your-project-id",
    "storageBucket": "your-storage-bucket",
    "messagingSenderId": "your-messaging-sender-id",
    "appId": "your-app-id"
}

firebase = pyrebase.initialize_app(firebase_config)
db = firebase.database()

@app.route('/api/register', methods=['POST'])
def register():
    print(request.json)
    users = db.child("users").get()
    try:
        number_list = [user.val().get('number') for user in users.each()]
    except:
        number_list = []
    username = request.json.get('name')
    password = request.json.get('password')
    email = request.json.get('email')
    number = request.json.get('phoneNumber')
    if not username or not password or not email or not number:
        return jsonify({"status":False,"message": "Missing username, password, email or number"}), 400
    if number in number_list:
        return jsonify({"status":False,"message": "User already exists"}), 400
    try:
        data = {
            "name": username,
            "email": email,
            "number": number,
            "password": password,
            "rewardPoints": 0
        }
        db.child("users").child(str(number)).set(data)
        return jsonify({"status":True,"message": "User created successfully"}), 200
    except Exception as e:
        return jsonify({"status":False,"message": str(e)}), 400
@app.route('/api/login', methods=['POST'])
def login():
    try:
        users = db.child("users").get()
        try:
            number_list = [user.val().get('number') for user in users.each()]
        except:
            number_list = []
        username = request.json.get('phoneNumber')
        password = request.json.get('password')
        if not username or not password:
            return jsonify({"error": "Missing username or password"}), 400
        if username in number_list:
            user = db.child("users").child(str(username)).get()
            if user.val().get('password') == password:
                access_token = create_access_token(identity=username)
                print(access_token)
                return jsonify({"status":True,"accessToken":access_token,"userid":str(username)}), 200
            else:
                return jsonify({"error": "Invalid credentials"}), 401
    except Exception as e:
        return jsonify({"error": "Invalid credentials"}), 401

@app.route('/api/placeorder', methods=['POST'])
def placeorder():
    userdata = db.child("users").child(str(request.json.get('userId'))).get().val()
    rewardpoint = userdata.get('rewardPoints')
    usermail = userdata.get('email')
    
    try:
        print(request.json)
        userid = request.json.get('userId')
        rewardpoint = int(rewardpoint) + 10
        data = {
            "userId": userid,
            "wasteType": request.json.get('wasteType'),
            "description": request.json.get('description'),
            "date": request.json.get('date'),
            "time": request.json.get('time'),
            "address": request.json.get('address'),
            "status" : "20"
        }
        db.child("orders").child(str(userid)).push(data)
        db.child("users").child(str(userid)).update({"rewardPoints": rewardpoint})
        send_mail(recipient=usermail)
        return jsonify({"status":True,"message": "Order placed successfully"}), 200
    except Exception as e:
        return jsonify({"status":False,"message": str(e)}), 400
@app.route('/api/protected', methods=['GET'])
@jwt_required()
def protected():
    return jsonify(message="This is a protected route"), 200

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0',port=80)
