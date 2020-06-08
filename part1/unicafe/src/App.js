//////////////////////////////////////////////////////////////////
//////   LESSON 1d LECTURE NOTES A more complex state, debugging React apps 
//////////////////////////////////////////////////////////////////



////////// IMPORTANT NOTES!!! //////////
// 
// it is forbidden in React to mutate state directly, since it can result in unexpected side effects. Changing state has to always be done by setting the state to a new object. If properties from the previous state object are not changed, they need to simply be copied, which is done by copying those properties into a new object, and setting that as the new state.

// the concat method does not mutate the existing array but rather returns a new copy of the array with the item added to it.

/////////////////////////////////
////// DEBUGGING NOTES
/////////////////////////////////
/* 
Old school, print-based debugging is always a good idea. If the component

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)
is not working as intended, it's useful to start printing its variables out to the console. In order to do this effectively, we must transform our function into the less compact form and receive the entire props object without destructuring it immediately:

const Button = (props) => { 
  console.log(props)
  const { onClick, text } = props
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}
This will immediately reveal if, for instance, one of the attributes has been misspelled when using the component.

Logging to the console is by no means the only way of debugging our applications. You can pause the execution of your application code in the Chrome developer console's debugger, by writing the command debugger anywhere in your code.

The execution will pause once it arrives at a point where the debugger command gets executed
*/
/* 
RULES OF HOOKS!!
There are a few limitations and rules we have to follow to ensure that our application uses hooks-based state functions correctly.

The useState function (as well as the useEffect function) must not be called from inside of a loop, a conditional expression, or any place that is not a function defining a component. This must be done to ensure that the hooks are always called in the same order, and if this isn't the case the application will behave erratically.
*/
/////////////////////////////////////////////////////////
///////////////////// FIRST EXAMPLE /////////////////////
/////////////////////////////////////////////////////////
/* 
import React, { useState } from 'react'
// uses two separate states
const App = (props) => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)

  return (
    <div>
      <div>
        {left}
        <button onClick={() => setLeft(left + 1)}>
          left
        </button>
        <button onClick={() => setRight(right + 1)}>
          right
        </button>
        {right}
      </div>
    </div>
  )
}

export default App;
*/
/////////////////////////////////////////////////////////
///////////////////// SECOND EXAMPLE ////////////////////
/////////////////////////////////////////////////////////

/// implement same functionality by saving the click count of both the left and right buttons into a single object
///////////////////////
/* 
/// Now component has 1 state and uses event handlers to change entire app state

import React, { useState } from 'react'

const App = (props) => {
  const [clicks, setClicks] = useState({
    left: 0, right: 0
  })

  // const handleLeftClick = () => {
  //   const newClicks = { 
  //     left: clicks.left + 1, 
  //     right: clicks.right 
  //   }
  //   setClicks(newClicks)
  // }
  //////  Cleaner to use new spread operator //////
  /// ... creates a new object that has copies of all of the properties of the clicks object ///
  // const handleLeftClick = () => {
  //   const newClicks = { 
  //     ...clicks, 
  //     left: clicks.left + 1 
  //   }
  //   setClicks(newClicks)
  // }
  //// thus assigning the object to a variable in the event handlers is not necessary//
  const handleLeftClick = () =>
  setClicks({ ...clicks, left: clicks.left + 1 })
  // const handleRightClick = () => {
  //   const newClicks = { 
  //     left: clicks.left, 
  //     right: clicks.right + 1 
  //   }
  //   setClicks(newClicks)
  // }
  //////  Cleaner to use new spread operator //////
  /// ... creates a new object that has copies of all of the properties of the clicks object ///
  // const handleRightClick = () => {
  //   const newClicks = { 
  //     ...clicks, 
  //     right: clicks.right + 1 
  //   }
  //   setClicks(newClicks)
  // }
  //// thus assigning the object to a variable in the event handlers is not necessary//
  const handleRightClick = () =>
  setClicks({ ...clicks, right: clicks.right + 1 })

  return (
    <div>
      <div>
        {clicks.left}
        <button onClick={handleLeftClick}>left</button>
        <button onClick={handleRightClick}>right</button>
        {clicks.right}
      </div>
    </div>
  )
}

export default App;
*/
/////////////////////////////////////////////////////////
///////////////////// THIRD EXAMPLE /////////////////////
/////////////////////////////////////////////////////////

/// Let's add a piece of state to our application containing an array allClicks that remembers every click that has occurred in the application.

/* 
import React, { useState } from 'react'

const App = (props) => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  return (
    // We call the join method on the allClicks array that joins all the items into a single string, separated by the string passed as the function parameter, which in our case is an empty space.
    <div>
      <div>
        {left}
        <button onClick={handleLeftClick}>left</button>
        <button onClick={handleRightClick}>right</button>
        {right}
        <p>{allClicks.join(' ')}</p>
      </div>
    </div>
  )
}

export default App;
*/
/////////////////////////////////////////////////////////
///////////////////// FOURTH EXAMPLE ////////////////////
/////////////////////////////////////////////////////////
/// CONDITIONAL RENDERING ///
//////  Let's modify our application so that the rendering of the clicking history is handled by a new History component //////
/* 
import React, { useState } from 'react'
  // The History component renders completely different React elements depending on the state of the application. This is called conditional rendering.
const History = (props) => {
  // Now the behavior of the component depends on whether or not any buttons have been clicked. If not, meaning that the allClicks array is empty, the component renders a div element with some instructions instead:
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  // And in all other cases, the component renders the clicking history:
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}
// Let's make one last modification to our application by refactoring it to use the Button component that we defined earlier on:
// const Button = ({ onClick, text }) => (
//   <button onClick={onClick}>
//     {text}
//   </button>
// )
////// USING DEBUGGING EXAMPLE //////
const Button = (props) => { 
  console.log(props)
  const { onClick, text } = props
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const App = (props) => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  return (
    <div>
      <div>
        {left}
        <Button onClick={handleLeftClick} text='left' />
        <Button onClick={handleRightClick} text='right' />
        {right}
        <History allClicks={allClicks} />
      </div>
    </div>
  )
}

export default App;
*/

/////////////////////////////////////////////////////////
//////////////// EVENT HANDLING REVISITED ///////////////
/////////////////////////////////////////////////////////
/* 
import React, { useState } from 'react'

const App = (props) => {
  const [value, setValue] = useState(10)
  // You will often see event handlers defined in a separate place. In this version of our app we define a function that then gets assigned to the handleClick variable in the body of the component function:
  const handleClick = () => {
    console.log('clicked the button')
    setValue(0)
  }

  return (
    //The handleClick variable is now assigned to a reference to the function. The reference is passed to the button as the onClick attribute:
    <div>
      {value}
      <button onClick={handleClick}>button</button>
    </div>
  )
}

export default App;
 */