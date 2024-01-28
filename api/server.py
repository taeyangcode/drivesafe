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
async def nearby_accidents(north: float, south: float, east: float, west: float):

    # <= 30 indivual car accidents
    y = math.abs(north - south)/54.6
    x = math.abs(west-east)/69
    dist_miles = max(x , y) / 2
    if dist_miles < 30:
        return points_within_bounds(data, north, south, east, west)
    elif dist_miles < 50:
        pass
    elif dist_miles < 70:
        pass
    else:
        pass

    return 

if __name__ == "__main__":
    pass

