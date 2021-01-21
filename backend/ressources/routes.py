from .todo import TodosApi, TodoApi

def initialize_routes(api):
    api.add_resource(TodosApi, '/api/todos')
    api.add_resource(TodoApi, "/api/todos/<id>")