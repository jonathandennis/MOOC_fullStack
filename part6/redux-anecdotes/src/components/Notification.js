import React from "react"
import {useSelector} from "react-redux"
import {useDispatch} from "react-redux"

import {clearNotification} from "../reducers/notificationReducer"

const Notification = () => {
  const dispatch = useDispatch()

  const {notification} = useSelector((s) => s)

  useClearNotificationHook(notification, dispatch, 3)
  /* Custom Hook for manging dispatch call for clearing message. */
  /* Signature => notificationMessage, dispatch, timeInSeconds */
  if (notification === null) {
    return null
  }

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1
  };
  return <div style={style}>{notification.message}</div>
} /* End of Notification Component here. */

export default Notification

const useClearNotificationHook = (notificationMessage, dispatch, timeInSeconds) => {
  console.log = () => {} /* COMMENT this line to activate all the console.logs inside this hook. */
  let timeIdRef = React.useRef()
  React.useEffect(() => {
    if (notificationMessage) {
      timeIdRef.current = setTimeout(() => {
        dispatch(clearNotification())
        /* LOG1 */ console.log("::useeffect::DISPATCH successful for clearing notification.")
        timeIdRef.current = null /* This will prevent un-necessary execution of clearUp function. */
      }, timeInSeconds * 1000)
      /* LOG2 */ console.log("::useeffect::SCHEDULED async dispatch call for id => ", timeIdRef.current)
      return () => {
        if (timeIdRef.current) {
          clearTimeout(timeIdRef.current)
          /* LOG3 */ console.log("::cleanUpFunction:: CLEARED async dispatch call for id => ", timeIdRef.current)
        }
      }
    }
  }, [notificationMessage, dispatch, timeInSeconds])
}