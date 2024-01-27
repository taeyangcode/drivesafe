from typing import Union
from fastapi import FastAPI
from main import *
app = FastAPI()


@app.get("/crashes")
def read_root():
    return {
        "hello":"test"
    }

@app.get("/nearby_accidents/")
async def nearby_accidents(user_lat: float, user_lng: float):
    temp_radius = 5
    return points_within_radius((user_lat, user_lng), temp_radius)

if __name__ == "__main__":
    pass

