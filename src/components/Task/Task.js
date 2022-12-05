import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
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
  getPause,
  isStarted,
  timeLeft,
}) => {
  let interval
  let timer
  // state = {
  //   isStarted: this.props.isStarted,
  // }

  // const [isStarted, setIsStarted] = useState('false')

  const onStart = () => {
    clearInterval(interval)
    interval = setInterval(getStart, 1000)
  }

  const onPause = () => {
    getPause()
    clearInterval(interval)
  }

  useEffect(() => {
    timer = setInterval(timeLeft, 5000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    interval = setInterval(getStart, 1000)
    return () => clearInterval(interval)
  }, [isStarted])

  // useEffect(() => {
  //   return ()=> {
  //     clearInterval(interval)
  //     clearInterval(timer)
  //   }
  // }, [])

  console.log(isStarted)
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
  //   const sec = seconds.toString().padStart(2, '0')
  //   const min = minutes.toString().padStart(2, '0')

  return (
    <div className='view'>
      <input type='checkbox' className='toggle' onChange={() => onCompleted()} checked={done} />
      <label htmlFor={id}>
        <span className='title'>{`${title}`}</span>
        <div className='description'>
          <button className='icon icon-play' onClick={onStart}></button>
          <button className='icon icon-pause' onClick={onPause}></button>
          <div>{`${minutes}:${seconds}`}</div>
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
