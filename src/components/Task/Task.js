import PropTypes from 'prop-types'
import React, {useEffect, useRef, useState} from 'react'
import { formatDistanceToNow } from 'date-fns'

const Task = ({
  onDeleted,
  onCompleted,
  done,
  onEdited,
  title,
  id,
  seconds,
  minutes,
  dateCreate,
  getStart,
  isStarted,
    date,
  getPause,
  timeLeft,
}) => {


  const [inter, setInter] = useState()

  const [isCounting, setIsCounting] = useState(isStarted)

  const onStart = () => {
   setIsCounting(true)
  }

  const getPadTime = (time) => time.toString().padStart(2, '0')

  const onPause = () => {
    setIsCounting(false)
  }

  useEffect(() => {
    const timer = setInterval(timeLeft, 5000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
     isCounting && getStart()
      console.log(date)
    }, 1000)
    return () => clearInterval(interval)
      }, [isCounting])
  // componentDidMount() {
  //   const { getStart } = this.props
  //   this.interval = setInterval(getStart, 1000)
  //   const { timeLeft } = this.props
  //   setInterval(timeLeft, 5000)
  // }
  //
  // componentDidUpdate(prevProps) {
  //   if (this.props.getPause === prevProps.getPause) {
  //     clearInterval(this.interval)
  //   }
  // }
  //
  // componentWillUnmount() {
  //   const { timeLeft } = this.props
  //   clearInterval(this.interval)
  //   clearInterval(setInterval(timeLeft, 5000))
  // }

  // render() {
  //   const { onDeleted, onCompleted, done, onEdited, title, id, seconds, minutes, date } = this.props
    const sec = getPadTime(seconds)
    const min = getPadTime(minutes)

  return (
    <div className='view'>
      <input type='checkbox' className='toggle' onChange={() => onCompleted()} checked={done} />
      <label htmlFor={id}>
        <span className='title'>{`${title}`}</span>
        <div className='description'>
          <button className='icon icon-play' onClick={onStart}></button>
          <button className='icon icon-pause' onClick={onPause}></button>
          <div>{`${min}:${sec}`}</div>
        </div>
        <span className='description'>{`created ${(formatDistanceToNow(dateCreate, {
          includeSeconds: true,
        }))} ago`}</span>
      </label>
      <button className='icon icon-edit' onClick={() => onEdited()}></button>
      <button className='icon icon-destroy' onClick={() => onDeleted()}></button>
    </div>
  )
  // }
}

Task.defaultProps = {
  onCompleted: () => {},
  onEdited: () => {},
  onDeleted: () => {},
  done: false,
}

Task.propTypes = {
  onCompleted: PropTypes.func,
  onEdited: PropTypes.func,
  onDeleted: PropTypes.func,
  done: PropTypes.bool,
  title: PropTypes.string,
}

export default Task
