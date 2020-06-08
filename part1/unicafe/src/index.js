//////////////////////////////////////////////////////////////////
//////   EXERCISE 1.7: unicafe step2
//////////////////////////////////////////////////////////////////

import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
)

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad;
  const scoreAvg = ((good * 1) + (neutral * 0) + (bad * -1)) / all;
  const positiveAvg = (good * 100) / all;
  

  const handleGoodClick = () => {
    setGood(good + 1)
  }  

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)  
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad' />
      <h1>Statistics</h1>
      good: {good} <br />
      neutral: {neutral} <br />
      bad: {bad} <br />
      all: {all} <br />
      average: {scoreAvg} <br />
      positive average {positiveAvg} <br />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)


//////////////////////////////////////////////////////////////////
//////   EXERCISE 1.6: unicafe step1
//////////////////////////////////////////////////////////////////
/* 
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
)

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad' />
      <h1>Statistics</h1>
      good {good} <br />
      neutral {neutral} <br />
      bad {bad}
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
 */