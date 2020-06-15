import React from 'react';


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

  export default Course