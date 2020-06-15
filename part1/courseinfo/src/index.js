//////////////////////////////////////////////////
//////   2.4: course contents step9
//////////////////////////////////////////////////

import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ header }) => {
  return (
    <h2>{header}</h2>
  )
}

const Part = ({ part }) => {
  console.log('Part', part)
  return (
    <p>
      {part.name} {part.exercises}
    </p>    
  )
}

const Total = ({ part }) => {
  console.log('Total', part)
   
  const total = part.map(parts => parts.exercises).reduce((sum, exercise) => sum + exercise, 0)
  
    return(
      <h4>Number of exercises: {total}</h4>
    ) 
}

const Content = ({ parts }) => {
  console.log('Content', parts)
  return (
    <div>
      {parts.map(parts =>
        <Part key={parts.id} 
              part={parts}
        />  
      )}
      <Total part={parts} />
    </div>
  )
}

const Course = ({ course }) => {
  console.log('Course', course)
  return (
    <div>
      {course.map(course => 
        <><Header header={course.name} />
          <Content parts={course.parts} /></>
      )}
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  return (
    <div>
      <h1>Web development curriculum</h1>
      <Course course={courses} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))


//////////////////////////////////////////////////
//////   2.3: course contents step8
//////////////////////////////////////////////////
// Utilized the reduce function already
/* 
import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ header }) => {
  return (
    <h1>{header}</h1>
  )
}

const Part = ({ part }) => {
  console.log('Part', part)
  return (
    <p>
      {part.name} {part.exercises}
    </p>    
  )
}

const Total = ({ part }) => {
  console.log('Total', part)
   //const exercisesArr = part.map((parts) => parts.exercises )
   //console.log(exercisesArr)
  // const exercisesSum = exercisesArr.reduce(function(sum, exercise) {
  //   console.log('hello', sum, exercise)
  //   return sum + exercise
  // }, 0)
  ////// Now use arrow function!! //////
  //const exercisesSum = exercisesArr.reduce((sum, exercise) => sum + exercise, 0)
  // Joni Help Solution //
  //const total = part.exercises.map(parts => parts.exercises).reduce((a,b) => a + b, 0)
  // Utilizing Joni's help //
   
  const total = part.map(parts => parts.exercises).reduce((sum, exercise) => sum + exercise, 0)
  
    return(
      <h4>Number of exercises: {total}</h4>
    ) 
}

const Content = ({ parts }) => {
  console.log('Content', parts)
  //console.log('PartsExercises', parts.exercises)
  return (
    <div>
      {parts.map(parts =>
        <Part key={parts.id} 
              part={parts}
        />  
      )}
      <Total part={parts} />
    </div>
  )
}

const Course = ({ course }) => {
  console.log('Course', course)
  return (
    <div>
      <Header header={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

ReactDOM.render(<App />, document.getElementById('root'))
 */

//////////////////////////////////////////////////
//////   2.2: course contents step7
//////////////////////////////////////////////////
/* 
import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ header }) => {
  return (
    <h1>{header}</h1>
  )
}

const Part = ({ part }) => {
  console.log('Part', part)
  return (
    <p>
      {part.name} {part.exercises}
    </p>    
  )
}

const Total = ({ part }) => {
  console.log('Total', part)
   //const exercisesArr = part.map((parts) => parts.exercises )
   //console.log(exercisesArr)
  // const exercisesSum = exercisesArr.reduce(function(sum, exercise) {
  //   console.log('hello', sum, exercise)
  //   return sum + exercise
  // }, 0)
  ////// Now use arrow function!! //////
  //const exercisesSum = exercisesArr.reduce((sum, exercise) => sum + exercise, 0)
  // Joni Help Solution //
  //const total = part.exercises.map(parts => parts.exercises).reduce((a,b) => a + b, 0)
  // Utilizing Joni's help //
   
  const total = part.map(parts => parts.exercises).reduce((sum, exercise) => sum + exercise, 0)

    return(
      <h4>Number of exercises: {total}</h4>
    ) 
}

const Content = ({ parts }) => {
  console.log('Content', parts)
  //console.log('PartsExercises', parts.exercises)
  return (
    <div>
      {parts.map(parts =>
        <Part key={parts.id} 
              part={parts}
        />  
      )}
      <Total part={parts} />
    </div>
  )
}

const Course = ({ course }) => {
  console.log('Course', course)
  return (
    <div>
      <Header header={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

ReactDOM.render(<App />, document.getElementById('root'))
 */

//////////////////////////////////////////////////
//////   2.1: course contents step6
//////////////////////////////////////////////////
/* 
import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ header }) => {
  return (
    <h1>{header}</h1>
  )
}

// const Total = ({ course }) => {
//   const sum = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises
//   return(
//     <p>Number of exercises {sum}</p>
//   ) 
// }

const Part = ({ part }) => {
  console.log('Part', part)
  return (
    <p>
      {part.name} {part.exercises}
    </p>    
  )
}

const Content = ({ parts }) => {
  console.log('Content', parts)
  return (
    <div>
      {parts.map(parts =>
        <Part key={parts.id} 
              part={parts}
        />  
      )}
    </div>
  )
}

const Course = ({ course }) => {
  console.log('Course', course)
  return (
    <div>
      <Header header={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

ReactDOM.render(<App />, document.getElementById('root'))
 */

//////////////////////////////////////////////////
//////   1.5: course information step5
//////////////////////////////////////////////////

/*
Exercise 1.5 task information

Let's take the changes one step further. Change the course and its parts into a single JavaScript object. Fix everything that breaks.

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      ...
    </div>
  )
}
*/

//////////////////////////////// End 1.5 task information ex. 1.5 below
/* 
import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {
  console.log(props);
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part1 = (props) => {
  console.log(props);
  return (
    <div>
      <p>
        {props.parts1.name} {props.parts1.exercises}
      </p>
    </div>
  )
}

const Part2 = (props) => {
  console.log(props);
  return (
    <div>
      <p>
        {props.parts2.name} {props.parts2.exercises}
      </p>
    </div>
  )
}

const Part3 = (props) => {
  console.log(props);
  return (
    <div>
      <p>
        {props.parts3.name} {props.parts3.exercises}
      </p>
    </div>
  )
}

const Content = (props) => {
  console.log(props);
  
  return (
    <div>
      <Part1 parts1={props.parts[0]} />
      <Part2 parts2={props.parts[1]} />
      <Part3 parts3={props.parts[2]} />
    </div>
  )
}

const Total = (props) => {
  console.log(props);
  return (
    <div>
      <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    </div>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
*/
 
//////////////////////////////////////////////////
//////   1.4: course information step4
//////////////////////////////////////////////////

/*
Exercise 1.4 task information

And then place the objects into an array. Modify the variable definitions of App into the following form and modify the other parts of the application accordingly:

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      ...
    </div>
  )
}
NB at this point you can assume that there are always three items, so there is no need to go through the arrays using loops. We will come back to the topic of rendering components based on items in arrays with a more thorough exploration in the next part of the course.

However, do not pass different objects as separate props from the App component to the components Content and Total. Instead, pass them directly as an array:

const App = () => {
  // const definitions

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}
*/
//////////////////////////////// End 1.4 task information ex. 1.4 below
/*
import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  console.log(props);
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part1 = (props) => {
  console.log(props);
  return (
    <div>
      <p>
        {props.parts1.name} {props.parts1.exercises}
      </p>
    </div>
  )
}

const Part2 = (props) => {
  console.log(props);
  return (
    <div>
      <p>
        {props.parts2.name} {props.parts2.exercises}
      </p>
    </div>
  )
}

const Part3 = (props) => {
  console.log(props);
  return (
    <div>
      <p>
        {props.parts3.name} {props.parts3.exercises}
      </p>
    </div>
  )
}

const Content = (props) => {
  console.log(props);
   
  return (
    <div>
      <Part1 parts1={props.parts[0]} />
      <Part2 parts2={props.parts[1]} />
      <Part3 parts3={props.parts[2]} />
    </div>
  )
}

const Total = (props) => {
  console.log(props);
  return (
    <div>
      <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    </div>
  )
}

const App = () => {

  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    } 
  ]
  
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
*/ 

//////////////////////////////////////////////////
//////   1.3: course information step3
//////////////////////////////////////////////////

/*
Exercise 1.3 task information

Let's move forward to using objects in our application. Modify the variable definitions of the App component as follows and also refactor the application so that it still works:

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      ...
    </div>
  )
}
*/
//////////////////////////////// End 1.3 task information ex. 1.3 below
/* 
import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  console.log(props);
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part1 = (props) => {
  console.log(props);
  return (
    <div>
      <p>
        {props.part1.name} {props.part1.exercises}
      </p>
    </div>
  )
}

const Part2 = (props) => {
  console.log(props);
  return (
    <div>
      <p>
        {props.part2.name} {props.part2.exercises}
      </p>
    </div>
  )
}

const Part3 = (props) => {
  console.log(props);
  return (
    <div>
      <p>
        {props.part3.name} {props.part3.exercises}
      </p>
    </div>
  )
}

const Content = (props) => {
  console.log(props);
  return (
    <div>
      <Part1 part1={props.part1} />
      <Part2 part2={props.part2} />
      <Part3 part3={props.part3} />
    </div>
  )
}

const Total = (props) => {
  console.log(props);
  return (
    <div>
      <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3} </p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content part1={part1}
               part2={part2}
               part3={part3}
      />
      <Total exercises1={part1.exercises} 
             exercises2={part2.exercises} 
             exercises3={part3.exercises} 
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root')) 
*/

//////////////////////////////////////////////////
//////   1.2: course information, step2
//////////////////////////////////////////////////

/*
Exercise 1.2 task information

Refactor the Content component so that it does not render any names of parts or their number of exercises by itself. Instead it only renders three Part components of which each renders the name and number of exercises of one part.

const Content = ... {
  return (
    <div>
      <Part .../>
      <Part .../>
      <Part .../>
    </div>
  )
}
*/
//////////////////////////////// End 1.2 task information ex. 1.2 below
/* 
import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  console.log(props);
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part1 = (props) => {
  console.log(props);
  return (
    <div>
      <p>
        {props.part1} {props.exercises1}
      </p>
    </div>
  )
}

const Part2 = (props) => {
  console.log(props);
  return (
    <div>
      <p>
        {props.part2} {props.exercises2}
      </p>
    </div>
  )
}

const Part3 = (props) => {
  console.log(props);
  return (
    <div>
      <p>
        {props.part3} {props.exercises3}
      </p>
    </div>
  )
}

const Content = (props) => {
  console.log(props);
  return (
    <div>
      <Part1 part1={props.part1} exercises1={props.exercises1} />
      <Part2 part2={props.part2} exercises2={props.exercises2} />
      <Part3 part3={props.part3} exercises3={props.exercises3} />
    </div>
  )
}

const Total = (props) => {
  console.log(props);
  return (
    <div>
      <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3} </p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} exercises1={exercises1}
               part2={part2} exercises2={exercises2}
               part3={part3} exercises3={exercises3}
      />
      <Total exercises1={exercises1} 
             exercises2={exercises2} 
             exercises3={exercises3} 
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
*/

//////////////////////////////////////////////////
//////   1.1: course information, step1
//////////////////////////////////////////////////

/* 
Exercise 1.1 task information
Unfortunately, the entire application is in the same component. Refactor the code so that it consists of three new components: Header, Content, and Total. All data still resides in the App component, which passes the necessary data to each component using props. Header takes care of rendering the name of the course, Content renders the parts and their number of exercises and Total renders the total number of exercises.

The App component's body will approximately be as follows:

const App = () => {
  // const-definitions

  return (
    <div>
      <Header course={course} />
      <Content ... />
      <Total ... />
    </div>
  )
}
*/
//////////////////////////////// End 1.1 task information ex. 1.1 below
/*  
import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  console.log(props);
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  console.log(props);
  return (
    <div>
      <p>
        {props.part1} {props.exercises1}
      </p>
      <p>
        {props.part2} {props.exercises2}
      </p>
      <p>
        {props.part3} {props.exercises3}
      </p>
    </div>
  )
}

const Total = (props) => {
  console.log(props);
  return (
    <div>
      <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3} </p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} exercises1={exercises1}
               part2={part2} exercises2={exercises2}
               part3={part3} exercises3={exercises3}
      />
      <Total exercises1={exercises1} 
             exercises2={exercises2} 
             exercises3={exercises3} 
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
*/ 



//////////////////////////////////////////////////
//////   Part 1 Lessons
//////////////////////////////////////////////////
/* 
import React from 'react'
import ReactDOM from 'react-dom'

const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old.</p>
    </div>
  )
}

const App = () => {
  const name = 'Peter'
  const age = 10
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name='Maya' age={26 + 10} />
      <Hello name={name} age={age} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root')) 
 */
/*
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

const Display = ({ counter }) => <div>{counter}</div>

const App = () => {
  const [ counter, setCounter ] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter - 1)
  const setToZero = () => setCounter(0)

  return (
    <div>
      <Display counter={counter}/>
      <Button
        handleClick={increaseByOne}
        text='plus'
      />
      <Button
        handleClick={setToZero}
        text='zero'
      />     
      <Button
        handleClick={decreaseByOne}
        text='minus'
      />           
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root'))
*/

