from fastapi import APIRouter, HTTPException, Depends
from api.models.user import User
from api.utils.auth import get_current_user
from api.schemas.user import GetUser, PostUser, PutUser

user_router = APIRouter(prefix="/api/users", tags=["User"])

@user_router.get("/")
async def all_users():
    data = User.all()
    return await GetUser.from_queryset(data)

@user_router.post("/")
async def post_user(body: PostUser):
    row = await User.create(**body.model_dump(exclude_unset=True))
    return await GetUser.from_tortoise_orm(row)

@user_router.put("/{key}")
async def update_user(key: int, body: PutUser):
    data = body.model_dump(exclude_unset=True)
    exists = await User.filter(id=key).exists()
    if not exists:
        raise HTTPException(status_code=404, detail="User not found")
    
    await User.filter(id=key).update(**data)
    return await GetUser.from_queryset_single(User.get(id=key))

@user_router.delete("/{key}")
async def delete_user(key: int):
    exists = await User.filter(id=key).exists()
    if not exists:
        raise HTTPException(status_code=404, detail="User not found")
    await User.filter(id=key).delete()

    return "User deleted successfully!"

@user_router.get("/{key}")
async def get_user(key: int):
    exists = await User.filter(id=key).exists()
    if not exists:
        raise HTTPException(status_code=404, detail="User not found")
    return await GetUser.from_queryset_single(User.get(id=key))

@user_router.get("/me")
async def get_current_user_endpoint(current_user: User = Depends(get_current_user)):
    return current_user
