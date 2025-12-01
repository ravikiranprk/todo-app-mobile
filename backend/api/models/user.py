from tortoise.models import Model
from tortoise.fields import IntField, CharField

class User(Model):
    id = IntField(pk=True)
    username = CharField(max_length=50, unique=True, null=False)
    email = CharField(unique=True, null=False, max_length=100)
    password = CharField(max_length=72, null=False)

    class Meta:
        table = "users"

    def __str__(self):
        return self.username