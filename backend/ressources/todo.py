import sys
sys.path.append("..")

from flask import Response, request
from database.models.todoModel import Todo
from database.models.userModel import User
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity

class TodosApi(Resource):

    @jwt_required
    def get(self):
        user_id = get_jwt_identity()
        todos = Todo.objects(added_by=user_id).to_json()
        return Response(todos, mimetype="application/json", status=200)
    
    @jwt_required
    def post(self):
        user_id = get_jwt_identity()
        body = request.get_json()
        user = User.objects.get(id=user_id)
        todo = Todo(**body, added_by=user)
        todo.save()
        user.update(push__todos=todo)
        return Response(Todo.objects(added_by=user_id).to_json(), mimetype="application/json", status=200)

class TodoApi(Resource):

    @jwt_required
    def get(self, id):
        user_id = get_jwt_identity()
        return Response(Todo.objects.get_or_404(id=id, added_by=user_id).to_json(), mimetype="application/json", status=200)

    @jwt_required
    def put(self, id):
        user_id = get_jwt_identity()
        todo = Todo.objects.get(id=id, added_by=user_id)
        # !!!!!!!!! Body can be just {"name": "newName", status: trueOrfalse}
        body = request.get_json()
        Todo.objects.get_or_404(id=id).update(**body)
        return Response(Todo.objects(added_by=user_id).to_json(), mimetype="application/json", status=200)
    
    @jwt_required
    def delete(self, id):
        user_id = get_jwt_identity()
        todo = Todo.objects.get(id=id, added_by=user_id)
        todo.delete()
        return Response(Todo.objects(added_by=user_id).to_json(), mimetype="application/json", status=200)