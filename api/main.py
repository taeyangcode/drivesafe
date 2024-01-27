import numpy as np
import pandas as pd

data = pd.read_csv("US_Accidents_March23_sampled_500k.csv")[['Severity','Start_Lat','Start_Lng']]
# print(data) 

def points_within_radius(data, center, radius):
    result = []
    filtered_data = data[data['Start_Lat']>= center[0] -radius/69]
    filtered_data = filtered_data[filtered_data['Start_Lat']<= center[0] +radius/69]
    filtered_data = filtered_data[filtered_data['Start_Lng']>= center[1] -radius/69]
    filtered_data = filtered_data[filtered_data['Start_Lng']<= center[1] +radius/69]

    for index,row in filtered_data.iterrows():
        result.append({"Severity":row['Severity'],"Latitude":row['Start_Lat'],"Longitude":row['Start_Lng']})
    return result
    

if __name__=="__main__":
    # radius = 5
    # center = (37.7749, -122.4194)
    # filtered_points = points_within_radius(data, center, radius)
    # print(filtered_points)
    pass
