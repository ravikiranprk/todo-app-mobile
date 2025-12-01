from fastapi import APIRouter, HTTPException
from tortoise.exceptions import DoesNotExist

from api.models.user import User
from api.schemas.auth import SignupRequest, LoginRequest, TokenResponse
from api.schemas.user import GetUser
from api.utils.auth import hash_password, verify_password, create_access_token

auth_router = APIRouter(prefix="/api/auth", tags=["Authentication"])

@auth_router.post("/signup", response_model=GetUser)
async def signup(body: SignupRequest):
    if await User.filter(username=body.username).exists():
        raise HTTPException(status_code=400, detail="Username already exists")

    if await User.filter(email=body.email).exists():
        raise HTTPException(status_code=400, detail="Email already exists")

    user = await User.create(
        username=body.username,
        email=body.email,
        password=body.password,
    )

    return await GetUser.from_tortoise_orm(user)


@auth_router.post("/login", response_model=TokenResponse)
async def login(body: LoginRequest):
    try:
        user = await User.get(username=body.username)
    except DoesNotExist:
        raise HTTPException(status_code=400, detail="Invalid username or password")

    if body.password != user.password:
        raise HTTPException(status_code=400, detail="Invalid username or password")

    token = create_access_token({"sub": user.username, "id": user.id})

    return TokenResponse(access_token=token)

