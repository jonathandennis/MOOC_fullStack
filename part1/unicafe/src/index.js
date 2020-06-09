/////////////////////////////////////////////////////
//////   EXERCISE 1.10: unicafe step5
/////////////////////////////////////////////////////

import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
)

const Buttons = (props) => {
  console.log(props);
  return (
    <div>
      <Button onClick={props.handleGoodClick} text='good' />
      <Button onClick={props.handleNeutralClick} text='neutral' />
      <Button onClick={props.handleBadClick} text='bad' />
    </div>
  )
}

const Statistic = ({ text, value }) => {
  return (
    <div>
      <p>{text} {value}</p>
    </div>
  )
}

const Statistics = (props) => {
  console.log(props);

  const all = props.good + props.neutral + props.bad;
  const scoreAvg = ((props.good * 1) + (props.neutral * 0) + (props.bad * -1)) / all;
  const positiveAvg = (props.good * 100) / all;

  if (all === 0) {
    return (
      <div>
        <p>No feedback given.</p>
      </div>
    )
  }

  return (
    <div>
      <Statistic text="good:" value={props.good} />
      <Statistic text="neutral:" value={props.neutral} />
      <Statistic text="bad:" value={props.bad} />
      <Statistic text="all:" value={all} />
      <Statistic text="scoreAvg:" value={scoreAvg} />
      <Statistic text="positiveAvg:" value={positiveAvg} />
    </div>
  )
}

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
      <Buttons  handleGoodClick={handleGoodClick} 
                handleNeutralClick={handleNeutralClick} 
                handleBadClick={handleBadClick} 
                />
      <h1>Statistics</h1>
      <Statistics good={good}      
                  neutral={neutral}
                  bad={bad}
                  />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)


/////////////////////////////////////////////////////
//////   EXERCISE 1.9: unicafe step4
/////////////////////////////////////////////////////
/* 
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
)

const Good = (props) => {
  console.log(props);
  return (
    <div>
      <p>
       {props.text} {props.good}
      </p>
    </div>
  )
}

const Neutral = (props) => {
  console.log(props);
  return (
    <div>
      <p>
       {props.text} {props.neutral}
      </p>
    </div>
  )
}

const Bad = (props) => {
  console.log(props);
  return (
    <div>
      <p>
       {props.text} {props.bad}
      </p>
    </div>
  )
}

const All = (props) => {
  console.log(props);
  return (
    <div>
      <p>
       {props.text} {props.all}
      </p>
    </div>
  )
}

const ScoreAvg = (props) => {
  console.log(props);
  return (
    <div>
      <p>
       {props.text} {props.scoreAvg}
      </p>
    </div>
  )
}

const PositiveAvg = (props) => {
  console.log(props);
  return (
    <div>
      <p>
       {props.text} {props.positiveAvg}
      </p>
    </div>
  )
}

const Statistics = (props) => {
  console.log(props);
  if (props.all === 0) {
    return (
      <div>
        <p>No feedback given.</p>
      </div>
    )
  }

  return (
    <div>
      <Good good={props.good} text="good:" />
      <Neutral neutral={props.neutral} text="neutral:" />
      <Bad bad={props.bad} text="bad:" />
      <All all={props.all} text="all:" />
      <ScoreAvg scoreAvg={props.scoreAvg} text="average:" />
      <PositiveAvg positiveAvg={props.positiveAvg} text="positive:" />
    </div>
  )
}

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
      <Statistics good={good}      
                  neutral={neutral}
                  bad={bad}
                  all={all}
                  scoreAvg={scoreAvg}
                  positiveAvg={positiveAvg}
                   />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
 */

/////////////////////////////////////////////////////
//////   EXERCISE 1.8: unicafe step3
/////////////////////////////////////////////////////

/* 
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
)

const Good = (props) => {
  console.log(props);
  return (
    <div>
      <p>
       {props.text} {props.good}
      </p>
    </div>
  )
}

const Neutral = (props) => {
  console.log(props);
  return (
    <div>
      <p>
       {props.text} {props.neutral}
      </p>
    </div>
  )
}

const Bad = (props) => {
  console.log(props);
  return (
    <div>
      <p>
       {props.text} {props.bad}
      </p>
    </div>
  )
}

const All = (props) => {
  console.log(props);
  return (
    <div>
      <p>
       {props.text} {props.all}
      </p>
    </div>
  )
}

const ScoreAvg = (props) => {
  console.log(props);
  return (
    <div>
      <p>
       {props.text} {props.scoreAvg}
      </p>
    </div>
  )
}

const PositiveAvg = (props) => {
  console.log(props);
  return (
    <div>
      <p>
       {props.text} {props.positiveAvg}
      </p>
    </div>
  )
}

const Statistics = (props) => {
  console.log(props);

  return (
    <div>
      <h1>Statistics</h1>
      <Good good={props.good} text="good:" />
      <Neutral neutral={props.neutral} text="neutral:" />
      <Bad bad={props.bad} text="bad:" />
      <All all={props.all} text="all:" />
      <ScoreAvg scoreAvg={props.scoreAvg} text="average:" />
      <PositiveAvg positiveAvg={props.positiveAvg} text="positive:" />
    </div>
  )
}

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
      <Statistics good={good}      
                  neutral={neutral}
                  bad={bad}
                  all={all}
                  scoreAvg={scoreAvg}
                  positiveAvg={positiveAvg}
                   />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
 */

/////////////////////////////////////////////////////
//////   EXERCISE 1.7: unicafe step2
/////////////////////////////////////////////////////

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
  */

/////////////////////////////////////////////////////
//////   EXERCISE 1.6: unicafe step1
/////////////////////////////////////////////////////
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