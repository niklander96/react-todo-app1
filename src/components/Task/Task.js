import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
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
  timeLeft,
}) => {
  let interval

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
  })

  useEffect(() => {
    console.log('render')
    interval = setInterval(() => {
      isCounting && getStart()
    }, 1000)
    return () => clearInterval(interval)
  }, [isCounting])

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
        <span className='description'>{`created ${formatDistanceToNow(dateCreate, {
          includeSeconds: true,
        })} ago`}</span>
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
