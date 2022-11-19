import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'

import Timer from '../Timer'

export default class Task extends Component {
  state = {
    timer: null,
    seconds: 0,
    minutes: 0,
  }

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
          <span className='description'>
            <button className='icon icon-play'></button>
            <button className='icon icon-pause'></button>
            <span>
              <Timer seconds={seconds} minutes={minutes} />
            </span>
          </span>
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
}

Task.propTypes = {
  onCompleted: PropTypes.func,
  onEdited: PropTypes.func,
  onDeleted: PropTypes.func,
  done: PropTypes.bool,
  title: PropTypes.string,
}
