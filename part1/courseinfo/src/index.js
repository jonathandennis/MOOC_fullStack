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
  console.log(props.parts[0].name);
  return (
    <div>
      <p>
        {props.parts[0].name} {props.parts[0].exercises}
      </p>
    </div>
  )
}

const Part2 = (props) => {
  console.log(props.parts[1].name);
  return (
    <div>
      <p>
        {props.parts[1].name} {props.parts[1].exercises}
      </p>
    </div>
  )
}

const Part3 = (props) => {
  console.log(props.parts[2].name);
  return (
    <div>
      <p>
        {props.parts[2].name} {props.parts[2].exercises}
      </p>
    </div>
  )
}

const Content = (props) => {
  console.log(props);
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
      <Part1 parts={parts} />
      <Part2 parts={parts} />
      <Part3 parts={parts} />
    </div>
  )
}

const Total = (props) => {
  console.log(props.parts[0].exercises);
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

/*
Create the components needed

const Header = () => {
  return (
    <div>
      <h1>{course}</h1>
    </div>
  )
}

const Content = () => {
  return (
    <div>
      <p>
        {part1} {exercises1}
      </p>
      <p>
        {part2} {exercises2}
      </p>
      <p>
        {part3} {exercises3}
      </p>
    </div>
  )
}

const Total = () => {
  return (
    <div>
      <p>Number of exercises {exercises1 + exercises2 + exercises  </p>
    </div>
  )
}
*/