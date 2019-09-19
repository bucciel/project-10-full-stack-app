Elise Bucciarelli, Treehouse FSJS Techdegree Project 10: Full Stack App with React and a REST API

This project uses React to create a client for my existing school database REST API (project 9). This application will allow users to view a full list of courses, the details for a specific course. They will also be able to create an account or sign in with an existing account, and create, update, or delete courses that they own.

This project has been styled with a Harry Potter theme, in order to maintain the themed courses and users please refrain from running `npm run seed`. 

In order to run this program, you need to navigate to the api folder and client folder in seperate terminals:
- `cd api`
- `npm install` 
- `npm start`

- `cd client`
- `npm install`
- `npm start`

Then open your browser to `http://localhost:3000/` to view the page.

"Exceeds expectations" requirements:
- CourseDetail redirects users to the /notfound path if the requested course isn't returned from the REST API.
- UserSignIn redirects users back to the previous screen after successfully signing in.
- UpdateCourse redirects users to the /notfound path if the requested course isn't returned from the REST API.
- UpdateCourse redirects users to the /forbidden path if the requested course isn't owned by the authenticated user.
- Users are redirected to the /error path when requests to the REST API return a "500 Internal Server Error" HTTP status code.
- This app contains the following stateless functional components: NotFound, Forbidden, and UnhandledError.
- The following routes are configured: /notfound, /forbidden, and /error. 
- React Router is configured so that if a route isn't matched the NotFound component is rendered.
- The app persists user credentials using an HTTP cookie or local storage so that the user's authenticated state is maintained even if the application is reloaded or loaded into a new browser tab.