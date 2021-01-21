from .todo import TodosApi, TodoApi
from .auth import SignupApi, LoginApi

def initialize_routes(api):
    api.add_resource(TodosApi, '/api/todos')
    api.add_resource(TodoApi, "/api/todos/<id>")
    api.add_resource(SignupApi, "/api/auth/signup")
    api.add_resource(LoginApi, "/api/auth/login")
