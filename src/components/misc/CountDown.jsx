import React from "react"
import Countdown from "react-countdown" // https://www.npmjs.com/package/react-countdown


const CountDown = ({ date }) => {
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {

    } else {
      // Render a countdown
      return (
        <span className={(hours < 1 && minutes < 10) ? "fs-5 text-danger" : "fs-5 text-secondary"}>
          {hours}:{minutes}:{seconds}
        </span>
      )
    }
  };

  return <Countdown date={date} renderer={renderer} />
}

export default CountDown