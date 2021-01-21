from flask import Flask
from flask_restful import Api
from flask_bcrypt import Bcrypt
from database.db import initialize_db
from ressources.routes import initialize_routes
from flask_jwt_extended import JWTManager

app = Flask(__name__)


app.config["MONGODB_SETTINGS"] = {
    "host": "mongodb://localhost:27017/todoapp"
}

app.config.from_envvar("APPLICATION_SETTINGS")


api = Api(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

initialize_db(app)
initialize_routes(api)


app.run()