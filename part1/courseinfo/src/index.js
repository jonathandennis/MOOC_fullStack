
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
  console.log(props.course);
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  console.log(props.part1);
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
  console.log(props.exercises1);
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