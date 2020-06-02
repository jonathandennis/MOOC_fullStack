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
  console.log(props.part1.name);
  return (
    <div>
      <p>
        {props.part1.name} {props.part1.exercises}
      </p>
    </div>
  )
}

const Part2 = (props) => {
  console.log(props.part2.name);
  return (
    <div>
      <p>
        {props.part2.name} {props.part2.exercises}
      </p>
    </div>
  )
}

const Part3 = (props) => {
  console.log(props.part3.name);
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
      <Part1 part1={part1} />
      <Part2 part2={part2} />
      <Part3 part3={part3} />
    </div>
  )
}

const Total = (props) => {
  console.log(props.part1.exercises);
  return (
    <div>
      <p>Number of exercises {props.part1.exercises + props.part2.exercises + props.part3.exercises}</p>
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
      <Total part1={part1}
             part2={part2}
             part3={part3}
      />
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