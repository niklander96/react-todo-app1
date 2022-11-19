import React, { useState, useEffect } from 'react'

const Timer = () => {
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const timerLeft = 'November, 20, 2022'
  const getTime = () => {
    const time = Date.parse(timerLeft) - Date.now()

    setMinutes(Math.floor((time / 1000 / 60) % 60))
    setSeconds(Math.floor((time / 1000) % 60))
  }

  useEffect(() => {
    const interval = setInterval(() => getTime(timerLeft), 1000)

    return () => clearInterval(interval)
  }, [])
  return (
    <div className='timer'>
      <div>
        {minutes}:{seconds}
      </div>
    </div>
  )
}

export default Timer

// export default class Timer extends Component {
//   state = {
//     minutes: 0,
//     seconds: 0,
//   }
//
//   setMinutes = (e) => {
//     this.setState({
//       minutes: e.target.value,
//     })
//     console.log(this.state.minutes)
//   }
//
//   setSeconds = (e) => {
//     this.setState({
//       seconds: e.target.value,
//     })
//     console.log(this.state.seconds)
//   }
//
//   getTime = () => {
//
//     const time = Date.parse(timerLeft) - Date.now()
//     //
//     //     setMinutes(Math.floor((time / 1000 / 60) % 60))
//     //     setSeconds(Math.floor((time / 1000) % 60))
//   }
// }
