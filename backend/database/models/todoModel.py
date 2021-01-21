from ..db import db

class Todo(db.Document):
    name = db.StringField(required=True, unique=True)
    status = db.BooleanField(default=False)
    added_by = db.ReferenceField("User")