import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'

import Timer from '../Timer'

export default class Task extends Component {
  timeLeft = () => {
    const { dateCreate } = this.props
    this.setState({
      date: formatDistanceToNow(dateCreate, { includeSeconds: true }),
    })
  }

  render() {
    const { onDeleted, onCompleted, done, onEdited, title, id, dateCreate, seconds, minutes } = this.props
    setInterval(this.timeLeft, 5000)
    return (
      <div className='view'>
        <input type='checkbox' className='toggle' onChange={onCompleted} checked={done} />
        <label htmlFor={id}>
          <span className='title'>{`${title}`}</span>
          <div className='description'>
            <Timer seconds={seconds} minutes={minutes}>
              {`${minutes}:${seconds}`}
            </Timer>
          </div>
          <span className='description'>{`created ${formatDistanceToNow(dateCreate, {
            includeSeconds: true,
          })} ago`}</span>
        </label>
        <button className='icon icon-edit' onClick={onEdited}></button>
        <button className='icon icon-destroy' onClick={onDeleted}></button>
      </div>
    )
  }
}

Task.defaultProps = {
  onCompleted: () => {},
  onEdited: () => {},
  onDeleted: () => {},
  done: false,
  title: 'Empty task',
  seconds: 59,
  minutes: 59,
}

Task.propTypes = {
  onCompleted: PropTypes.func,
  onEdited: PropTypes.func,
  onDeleted: PropTypes.func,
  done: PropTypes.bool,
  title: PropTypes.string,
}
