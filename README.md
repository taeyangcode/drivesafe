# DriveSafe Document

## Inspiration
Imagine being behind the wheel, exiting the freeway, only to find yourself abruptly approaching a stop sign or a busy intersection, caught off guard by the sudden transition.  At that pivotal moment, as I pressed the brake, the idea struck me like a bolt of lightning. Realization dawned that knowing about accident-prone areas could be the key to safer journeys. In that instant, I understood the power of foresight – the ability to anticipate, to react, to protect. It's a realization that drives me to advocate for safer roads, one moment of awareness at a time. By being vigilant, I believe we can significantly reduce the likelihood of accidents, making our roads safer for everyone. It's about taking personal responsibility and making a collective difference.

## What it does
In a world where every journey counts, DriveSafe emerges as your ultimate companion, dedicated to ensuring your safety and security on the road. DriveSafe isn't just another navigation app; seamlessly integrated with Google Maps, It is designed to empower you with real-time awareness of accident-prone areas during your journeys.
﻿
## Inspiration
Imagine being behind the wheel, exiting the freeway, only to find yourself abruptly approaching a stop sign or a busy intersection, caught off guard by the sudden transition.  At that pivotal moment, as I pressed the brake, the idea struck me like a bolt of lightning. Realization dawned that knowing about accident-prone areas could be the key to safer journeys. In that instant, I understood the power of foresight – the ability to anticipate, to react, to protect. It's a realization that drives me to advocate for safer roads, one moment of awareness at a time. By being vigilant, I believe we can significantly reduce the likelihood of accidents, making our roads safer for everyone. It's about taking personal responsibility and making a collective difference.

## What it does
In a world where every journey counts, DriveSafe emerges as your ultimate companion, dedicated to ensuring your safety and security on the road. DriveSafe isn't just another navigation app; seamlessly integrated with Google Maps, It is designed to empower you with real-time awareness of accident-prone areas during your journeys.

## How we built it
Starting by utilizing the Google Maps API alongside a comprehensive dataset spanning car accidents across the United States from 2016 to 2023, we programmed DriveSafe with the help of Fast API and python to dynamically map the incidents within a specified radius of the user's current location. We then manipulated TypeScript and React so that the plotted points are continuously updated as the user moves, ensuring real-time visibility of accident-prone areas nearby. We also implemented continuous checking of average severity levels of car crashes within a one mile radius using pandas data frames, alerting the user when entering high-risk areas. We kept all of these in mind in order to allow users to make informed decisions while navigating unfamiliar routes or high-risk areas. 

## Challenges we ran into
One of the most challenging components in regards to the backend was filtering large data sets , and overcoming lags in real-time updates. Working with React in the frontend, we ran into issues with changing states, the most important part of our app. It seemed almost impossible to use the Google Maps API while rendering 7 million points of car accidents on the map, having to learn multiple Google Map wrapper APIs in order to use the perfect one for our app.

## Accomplishments that we're proud of
We take pride in being able to integrate real-time user location tracking while swiftly displaying historical car accident data. Our achievement lies in figuring out the optimal scaling on mobile devices in order to not cluster the user with too much data at once and providing them with up-to-the-minute insights into potential hazards, ensuring a responsive and reliable experience. 

## What we learned
While analyzing the dataset, we were shocked to learn about the staggering frequency of accidents every single day, particularly on highways. This revelation strengthened our resolve to address this pressing issue head-on, making us believe that our app might actually make a difference in everyday lives. It required us to learn and use data manipulation techniques, and the important task of seamlessly exchange data between our frontend and backend. 

## What's next for DriveSafe
As we continue to evolve DriveSafe, our vision extends beyond merely informing users about accident-prone areas. Our next milestone involves transforming DriveSafe into an actual navigation tool, letting users proactively navigate safer routes to their destinations.
With this vision in mind, our future updates will introduce a user-friendly search bar, allowing them to input their destinations and receive guidance on the safest routes available. Leveraging our extensive database and real-time hazard alerts, DriveSafe will intelligently analyze road conditions, traffic patterns, and accident data to recommend the most secure pathways, prioritizing user safety every step of the way. Stay tuned as we embark on this exciting journey to redefine road safety and empower drivers with the tools they need to navigate confidently, securely, and, above all, safely. Together, we're driving towards a future where every road is a safer road.
