import numpy as np
import pandas as pd
import math
# data = pd.read_csv("US_Accidents_March23_sampled_500k.csv")[['ID','Severity','Start_Lat','Start_Lng']]
data = pd.read_csv("US_Accidents_March23_sampled_500k.csv")[['ID','Severity','Start_Lat','Start_Lng', 'County']]

def points_within_bounds(data, north, south, east, west):
    result = []
    filtered_data = data[data['Start_Lat']>= west] # west
    filtered_data = filtered_data[filtered_data['Start_Lat']<= east]  # east
    filtered_data = filtered_data[filtered_data['Start_Lng']>= south] # south
    filtered_data = filtered_data[filtered_data['Start_Lng']<= north] # north

    for index,row in filtered_data.iterrows():
        result.append({"ID":row['ID'],"Severity":row['Severity'],"Latitude":row['Start_Lat'],"Longitude":row['Start_Lng']})
    return result




if __name__=="__main__":
    # radius = 5
    # center = (37.7749, -122.4194)
    # filtered_points = points_within_radius(data, center, radius)
    # print(filtered_points)
    pass
