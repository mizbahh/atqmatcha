# atqmatcha

a) How can the grader start your web server?
The grader can start the web server by doing the following steps:
To run the frontend client:
1) Open a terminal and navigate to the project folder
2) Ensure that the file is unzipped, then access that directory
3) navigate to the client directory 'cd client'
4) use 'npm install' to install all necessary dependencies
5) use 'npm run dev' to begin the client


b) Is there a second server needed for your React application? If so, explain how to start.
Yes, there are two servers needed for our React application, the backend server and the frontend server.
To run the backend server:
1) Open a new terminal independent of the terminal used for the frontend client
2) navigate to the backend directory 'cd backend'
3) use 'npm install' to install all necessary dependencies
4) use 'npm audit fix' if prompted to patch dependencies
5) use 'npm run dev' to begin the server over port 5001 - If the port is not 5001, backend calls will return invalid.


c) How can the grader navigate to the application? I.e., what port and/or URI?
The grader can navigate to the application via the localhost port stated in the first set of instructions.
By default, this port will be assigned to 5173, so access the website by going to http://localhost:5173/ in your brower.
If the port is being taken by another application, then the terminal will state the other port to use.


d) What Collections are needed in MongoDB?
The collections needed in MongoDB are the collections present in our database. Those include:
[announcements, events, images, menuitems, orders, reviews, scheduledevents, users]