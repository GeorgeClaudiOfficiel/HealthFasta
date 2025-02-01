from flask import Flask
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_mysqldb import MySQL

mysql = MySQL()
bcrypt = Bcrypt()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')

    # Initialize extensions
    mysql.init_app(app)
    jwt.init_app(app)
    CORS(app)

    # Register routes
    from app.routes import routes
    app.register_blueprint(routes)

    return app
