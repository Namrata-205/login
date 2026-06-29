from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

app = FastAPI()

users = {}


class RegisterRequest(BaseModel):
    email: str
    password: str


class LoginRequest(BaseModel):
    email: str
    password: str


@app.get("/health")
def health():
    return {"message": "FastAPI is ready"}


@app.post("/api/register")
def register(data: RegisterRequest):
    if data.email in users:
        raise HTTPException(status_code=400, detail="Email already registered")

    users[data.email] = data.password
    return {"message": "Account created", "email": data.email}


@app.post("/api/login")
def login(data: LoginRequest):
    if users.get(data.email) != data.password:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    return {"message": "Login successful", "email": data.email}


frontend_dist = Path(__file__).parent / "frontend_dist"
if frontend_dist.exists():
    app.mount("/", StaticFiles(directory=frontend_dist, html=True), name="frontend")