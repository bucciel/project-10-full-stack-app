import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';



class App extends React.Component {     //Renders application components and routes

  state = {           //State declarations for app components
    courses: [],
    isLoading: true,
  }

  componentDidMount() {
    fetch(`http://localhost:5000/api/courses`)
      .then(response => response.json())
      .then(courses => this.setState({
        courses: courses,
        isLoading: false
      }))
      .then(() => console.log(this.state.courses))
      .catch(error => console.log("Sorry, there's nothing here"));
  }

  render() {
    return this.state.isLoading ? (<h2>Loading...</h2>) : (
      <div className="container">
        {
          this.state.courses.map(course => {
            return (
              <ul key={course.id}>
                <li>{course.id}</li>
                <li>{course.title}</li>
                <li>{course.description}</li>
                <li>{course.estimatedTime}</li>
                <li>{course.materialsNeeded}</li>
              </ul>
            );
          })
        }
      </div>
    )
  }
}

export default App;
