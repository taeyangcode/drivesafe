import numpy as np
import pandas as pd
import math
data = pd.read_csv("US_Accidents_March23_sampled_500k.csv")[['ID','Severity','Start_Lat','Start_Lng','Weather_Condition']]
# data = pd.read_csv("US_Accidents_March23.csv")[['ID','Severity','Start_Lat','Start_Lng', 'County','Weather_Condition']]

# load data from csv files for city, county, and state counts
city_data = pd.read_csv("cities_data.csv")
county_data = pd.read_csv("counties_data.csv")
state_data = pd.read_csv("states_data.csv")

# Rain
rain_conditions = {'Rain', 'Heavy Rain', 'Rain Showers',
                    'Heavy Rain Showers', 'Rain and Sleet', 
                   'Rain Shower / Windy', 'Heavy Rain Shower / Windy'}

# Thunderstorms
thunderstorm_conditions = {'Thunderstorms and Snow', 'Thunder / Wintry Mix', 
                            'Thunder / Wintry Mix / Windy', 'Thunder / Windy', 
                            'Thunder and Hail', 'Heavy Thunderstorms and Small Hail', 
                            'Thunder / Wintry Mix / Windy', 'Thunder and Hail / Windy', 
                            'Heavy Thunderstorms with Small Hail', 'Thunderstorms and Rain', 
                            'Heavy Thunderstorms and Rain', 'Heavy T-Storm', 'Thunder / Windy'}

# Snow
snow_conditions = {'Snow', 'Heavy Snow', 'Blowing Snow', 
                   'Snow and Thunder', 'Snow / Windy', 'Heavy Snow / Windy', 
                   'Heavy Snow with Thunder', 'Heavy Blowing Snow'}

# Fog
fog_conditions = {'Fog / Windy', 'Mist / Windy', 'Partial Fog / Windy'}

# Sleet
sleet_conditions = {'Sleet', 'Sleet / Windy', 'Heavy Sleet', 'Heavy Sleet / Windy', 
                    'Sleet and Thunder', 'Heavy Sleet and Thunder'}

weatherConds = []
for weather in data['Weather_Condition']:
    if weather in rain_conditions:
        weatherConds.append('rain')
    elif weather in thunderstorm_conditions:
        weatherConds.append('thunder')
    elif weather in snow_conditions:
        weatherConds.append('snow')
    elif weather in fog_conditions:
        weatherConds.append('fog')
    elif weather in sleet_conditions:
        weatherConds.append('sleet')
    else:
        weatherConds.append(None)
    
if len(data) == len(weatherConds):
    data.insert(5, 'weather_icon', weatherConds)

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
        result.append({"ID":row['ID'],"Severity":row['Severity'],"Latitude":row['Start_Lat'],"Longitude":row['Start_Lng'], "Weather_Condition":row["Weather_Condition"]})
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