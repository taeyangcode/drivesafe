import numpy as np
import pandas as pd
import math

def haversine_distance(lat1, lon1, lat2, lon2):
    R = 3963.0  # Earth radius in miles

    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = (math.sin(dlat / 2) * math.sin(dlat / 2) +
         math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) *
         math.sin(dlon / 2) * math.sin(dlon / 2))
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    return R * c

def points_within_radius(center, radius):
    data = pd.read_csv("US_Accidents_March23_sampled_500k.csv")[['Severity','Start_Lat','Start_Lng']]

    result = []
    for index,row in data.iterrows():
        if haversine_distance(center[0], center[1], row['Start_Lat'], row['Start_Lng']) <= radius:
            result.append({"Severity":row['Severity'],"Latitude":row['Start_Lat'],"Longitude":row['Start_Lng']})
    return result
    

if __name__ == "main":
    R = 3963.0 #radius of earth
    radius = 5
    center = (37.7749, -122.4194)
    filtered_points = points_within_radius(center, radius)
    print(filtered_points)