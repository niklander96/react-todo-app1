import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class Task extends Component {
  state = {
    minutes: this.props.minutes,
    seconds: this.props.seconds,
    isStarted: this.props.isStarted,
    timer: 0,
  }

  onStart = () => {
    const { getStart } = this.props
    const { timer } = this.state
    clearInterval(timer)
    const interval = setInterval(() => getStart(), 1000)
    this.setState({
      timer: interval,
    })
  }

  onPause = () => {
    const { timer } = this.state
    clearInterval(timer)
    this.setState({
      timer: 0,
    })
  }

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   const {timer} = this.state
  //   if (prevState.timer === timer) {
  //     this.onPause()
  //   }
  // }

  componentDidMount() {
    const { timeLeft } = this.props
    const { timer } = this.state
    clearInterval(timer)
    setInterval(timeLeft, 5000)
    clearInterval(timer)
  }

  componentWillUnmount() {
    // const { timer } = this.state
    // clearInterval(timer)
    const { timeLeft } = this.props
    clearInterval(setInterval(timeLeft, 5000))
  }

  render() {
    const { onDeleted, onCompleted, done, onEdited, title, id, seconds, minutes, date } = this.props
    const sec = seconds.toString().padStart(2, '0')
    const min = minutes.toString().padStart(2, '0')
    console.log(minutes, seconds)

    return (
      <div className='view'>
        <input type='checkbox' className='toggle' onChange={onCompleted} checked={done} />
        <label htmlFor={id}>
          <span className='title'>{`${title}`}</span>
          <div className='description'>
            <button className='icon icon-play' onClick={this.onStart}></button>
            <button className='icon icon-pause' onClick={this.onPause}></button>
            <div>
              {min}:{sec}
            </div>
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
