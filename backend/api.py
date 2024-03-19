from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://admin:admin@postgres/msg_db'
db = SQLAlchemy(app)
CORS(app)


class Message(db.Model):
    __tablename__ = 'message'
    id = db.Column(db.Integer, primary_key=True)
    author = db.Column(db.String)
    time = db.Column(db.String)
    content = db.Column(db.String)

    def __repr__(self):
        return f"<Message(author={self.author}, time={self.time}, content={self.content})>"

    def __init__(self, author, time, content):
        self.author = author
        self.time = time
        self.content = content

    def json(self):
        return {'id': self.id, 'author': self.author, 'time': self.time, 'content': self.content}


with app.app_context():
    db.create_all()


@app.route('/')
def connection():
    return 'Connected'


@app.route('/new-message', methods=['POST'])
def post_message():
    data = request.get_json()

    message = Message(author=data['author'], time=data['time'], content=data['content'])
    db.session.add(message)
    db.session.commit()

    return jsonify(message.json())


@app.route('/get-messages', methods=['GET'])
def get_messages():
    messages = Message.query.all()
    response_data = [msg.json() for msg in messages]
    return jsonify(response_data)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
