import sys
sys.path.append("..")

from flask import Response, request
from database.models.todoModels import Todo
from flask_restful import Resource

class TodosApi(Resource):

    def get(self):
        todos = Todo.objects().to_json()
        return Response(todos, mimetype="application/json", status=200)

    def post(self):
        body = request.get_json()
        todo = Todo(**body).save()
        newTodo = Todo.objects.get(id=str(todo.id)).to_json()
        return Response(newTodo, mimetype="application/json", status=200)

class TodoApi(Resource):

    def get(self, id):
        todo = Todo.objects.get(id=id).to_json()
        return Response(todo, mimetype="application/json", status=200)

    def put(self, id):
        body = request.get_json()
        todo = Todo.objects.get(id=id)
        todo.status = body["status"]
        todo.save()
        return "", 200

    def delete(self, id):
        todo = Todo.objects.get(id=id).delete()
        return "", 200