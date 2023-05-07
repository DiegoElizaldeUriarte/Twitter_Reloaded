# Twitter_Reloaded <br/> 
## Fernando Carlos Aceves Díaz - A01366071 <br/> Diego Raúl Elizalde Uriarte - A01748756 <br/>
<br/>
Twitter Reloaded is a social media platform that allows users to create tweets with 300 characters maximum, reply to tweets, and see their home dashboard with the recent 10 tweets. The dashboard contains tweets and threads. Every action triggered by Twitter Reloaded is registered as a new event at the event dashboard, with information such as the type of action, user who did the action, and timestamp. Reports can be generated based on the event data, such as the user who registered more events during the day, the most commented tweet of the day, and how many users opened the application during the day.

Compiling
---------

If you have not installed the necessary dependencies, run the following command:

`npm install`

To compile the project, run:


`npm run build`

Running
-------

To run the project, run:

`npm start`

This will start the server and the web application will be accessible at `http://localhost:3000`.

Docker
------

To build the Docker image, navigate to the project directory and run the following command:

`docker build -t twitter-reloaded .`

This will create a Docker image with the tag `twitter-reloaded`. You can then run the image with the following command:

`docker run -p 3000:3000 twitter-reloaded`
