import numpy as np
import pandas as pd
import math
# data = pd.read_csv("US_Accidents_March23_sampled_500k.csv")[['ID','Severity','Start_Lat','Start_Lng','Weather_Condition']]
data = pd.read_csv("US_Accidents_March23.csv")[['ID','Severity','Start_Lat','Start_Lng', 'City','County','State']]

# load data from csv files for city, county, and state counts
city_data = pd.read_csv("cities_data.csv")
county_data = pd.read_csv("counties_data.csv")
state_data = pd.read_csv("states_data.csv")

def points_within_radius(data, center, radius):
    result = []
    filtered_data = data[data['Start_Lat']>= center[0] -radius/69]
    filtered_data = filtered_data[filtered_data['Start_Lat']<= center[0] +radius/69]
    filtered_data = filtered_data[filtered_data['Start_Lng']>= center[1] -radius/69]
    filtered_data = filtered_data[filtered_data['Start_Lng']<= center[1] +radius/69]

    for index,row in filtered_data.iterrows():
        result.append({"ID":row['ID'],"Severity":row['Severity'],"Latitude":row['Start_Lat'],"Longitude":row['Start_Lng']})
    return result


def points_within_bounds(data, north: float, south: float, east: float, west: float):
    '''
    Return individual car crashes that occur within the rectangular bounds provided
    '''
    result = []
    filtered_data = data[data['Start_Lat'] >= west]
    filtered_data = filtered_data[filtered_data['Start_Lat'] <= east]
    filtered_data = filtered_data[filtered_data['Start_Lng'] >= south]
    filtered_data = filtered_data[filtered_data['Start_Lng'] <= north]

    for index,row in filtered_data.iterrows():
        result.append({"ID":row['ID'],"Severity":row['Severity'],"Latitude":row['Start_Lat'],"Longitude":row['Start_Lng']})
    return result


def grouped_crashes_in_bounds(data, north, south, east, west):
    result = []
    filtered_data = data[data['Start_Lat'] >= west]
    filtered_data = filtered_data[filtered_data['Start_Lat'] <= east]
    filtered_data = filtered_data[filtered_data['Start_Lng'] >= south]
    filtered_data = filtered_data[filtered_data['Start_Lng'] <= north]

    for index, row in filtered_data.iterrows():
        result.append({"Latitude":row['Start_Lat'],"Longitude":row['Start_Lng'], "Count":row['Count']})
    return result
    

if __name__=="__main__":
    # radius = 5
    # center = (37.7749, -122.4194)
    # filtered_points = points_within_radius(data, center, radius)
    # print(filtered_points)
    pass
