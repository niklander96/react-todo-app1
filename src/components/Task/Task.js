import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class Task extends Component {
  interval
  state = {
    isStarted: this.props.isStarted,
  }

  onStart = () => {
    const { getStart } = this.props
    clearInterval(this.interval)
    this.interval = setInterval(getStart, 1000)
  }

  onPause = () => {
    const { getPause } = this.props
    getPause()
    clearInterval(this.interval)
  }

  componentDidMount() {
    const { getStart } = this.props
    this.interval = setInterval(getStart, 1000)
    const { timeLeft } = this.props
    setInterval(timeLeft, 5000)
  }

  componentDidUpdate(prevProps) {
    if (this.props.getPause === prevProps.getPause) {
      clearInterval(this.interval)
    }
  }

  componentWillUnmount() {
    const { timeLeft } = this.props
    clearInterval(this.interval)
    clearInterval(setInterval(timeLeft, 5000))
  }

  render() {
    const { onDeleted, onCompleted, done, onEdited, title, id, seconds, minutes, date } = this.props
    const sec = seconds.toString().padStart(2, '0')
    const min = minutes.toString().padStart(2, '0')

    return (
      <div className='view'>
        <input type='checkbox' className='toggle' onChange={onCompleted} checked={done} />
        <label htmlFor={id}>
          <span className='title'>{`${title}`}</span>
          <div className='description'>
            <button className='icon icon-play' onClick={this.onStart}></button>
            <button className='icon icon-pause' onClick={this.onPause}></button>
            <div>{`${min}:${sec}`}</div>
          </div>
          <span className='description'>{`created ${date} ago`}</span>
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
