# Prerequisites and running:
To run the project, if you do not have installed already on your machine you will need the following:
•	Node.js and npm (The Node.js installation will also install npm) https://nodejs.org/en/

Unzip the downloaded project folder then initialize the npm project inside ./games directory and install necessary dependencies by executing the following commands:

```
npm init -y
npm install express body-parser	
```


To run the service, from within the /games directory run the following command:
```
node gamesService.js
```


# Usage:

## The service should now be running on :  http://localhost:8080/games/<gameID>

1.	Endpoint: http://localhost:8080/games/1 will return the details on the game with ID 1. There are 2 games in the dataset. 


2.	Endpoint : http://localhost:8080/games/report will return a summary of the games. 


## Note: You can use any browser or a prettified JSON output I would recommend Postman App.
