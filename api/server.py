from typing import Union
from fastapi import FastAPI
from main import *
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
origins = [
    "http://localhost",
    "http://localhost:5173",  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/crashes")
def read_root():
    return {
        "hello":"test"
    }

@app.get("/nearby_accidents/")
async def nearby_accidents(user_lat: float, user_lng: float):
    temp_radius = 5
    return points_within_radius(data, (user_lat, user_lng), temp_radius)

if __name__ == "__main__":
    pass

