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
        return Response(Todo.objects.get(id=str(todo.id)).to_json(), mimetype="application/json", status=200)

class TodoApi(Resource):

    def get(self, id):
        return Response(Todo.objects.get_or_404(id=id).to_json(), mimetype="application/json", status=200)

    def put(self, id):
        # !!!!!!!!! Body can be just {"name": "newName", status: trueOrfalse}
        body = request.get_json()
        Todo.objects.get_or_404(id=id).update(**body)
        return "", 200

    def delete(self, id):
        todo = Todo.objects.get(id=id).delete()
        return "", 200