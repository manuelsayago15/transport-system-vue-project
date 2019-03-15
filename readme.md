## How to build.
- Run ```npm install``` to download dependencies.  
- Then, run ```npm run build``` to build Vue components.  
- Finally, run ```npm run start:dev``` to create a development server in order to test the application.  
- Go to: ```localhost:8080``` to see the application index.

## Application Routes.
Assuming you are running the application in ```localhost:8080```, the routes are as follows:  
```localhost:8080/drivers```  
```localhost:8080/passengers```  
```localhost:8080/seats```  
```localhost:8080/schedules```  
```localhost:8080/journeys```  
```localhost:8080/buses```  
Each of them has its own registered component when you go to its specific route (Single File Component).
All the process is handled by Vue Router.