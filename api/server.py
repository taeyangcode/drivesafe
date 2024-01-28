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

# @app.get("/nearby_accidents/")
# async def nearby_accidents(user_lat: float, user_lng: float):
#     temp_radius = 5
#     return points_within_radius(data, (user_lat, user_lng), temp_radius)

@app.get("/nearby_accidents/")
async def nearby_accidents(north: float, south: float, east: float, west: float):

    # find the radius
    y = abs(north - south) * 54.6  # longitude converted to miles
    x = abs(west-east) * 69        # latitude converted to miles
    dist_miles = max(x , y) / 2         # get the larger radius in miles

    if dist_miles < 30:
        # return individual car accidents
        return points_within_bounds(data, north, south, east, west)
    
    elif dist_miles < 50:
        # return cities (lat,lng) and their car crash counts
        return grouped_crashes_in_bounds(city_data, north, south, east, west)

    elif dist_miles < 70:
        # return counties (lat,lng) and their car crash counts
        return grouped_crashes_in_bounds(county_data, north, south, east, west)

    else:
        # return states (lat, lng) and their car crash counts
        return grouped_crashes_in_bounds(state_data, north, south, east, west)


if __name__ == "__main__":
    pass

