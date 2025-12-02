from fastapi import FastAPI
from api.routes.todo import todo_router
from api.routes.user import user_router
from api.routes.auth import auth_router
from tortoise.contrib.fastapi import register_tortoise
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(todo_router)
app.include_router(user_router)
app.include_router(auth_router)
register_tortoise(
    app=app,
    db_url="sqlite://db.sqlite3",
    modules={"models": ["api.models.todo", "api.models.user"]},
    generate_schemas=True,
    add_exception_handlers=True,
)

@app.get("/")
def index():
    return {"message": "Hello, World!"}