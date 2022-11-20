import React, { Component } from 'react'

export default class Timer extends Component {
  state = {
    seconds: this.props.seconds,
    minutes: this.props.minutes,
    isStarted: false,
  }

  tick = () => {
    const { seconds, minutes } = this.state
    if (seconds > 0) {
      this.setState({ seconds: seconds - 1 })
    } else if (minutes > 0) {
      this.setState({
        minutes: minutes - 1,
        seconds: seconds + 59,
      })
    } else if (Number(minutes) === 0 && Number(seconds) === 0) {
      this.getPause()
    }
  }

  getStart = () => {
    let interval = null
    clearInterval(interval)
    interval = setInterval(() => this.tick(), 1000)
    this.setState({
      inter: interval,
    })
  }

  getPause = () => {
    const { inter } = this.state
    clearInterval(inter)
    this.setState({
      inter: null,
    })
  }
  componentDidMount() {
    this.getPause()
    this.getStart()
  }

  render() {
    const { seconds, minutes, isStarted } = this.state
    const sec = seconds.toString().padStart(2, '0')
    const min = minutes.toString().padStart(2, '0')
    return (
      <div>
        <button className='icon icon-play' onClick={this.getStart}></button>
        <button className='icon icon-pause' onClick={this.getPause}></button>
        <span>{`${min}:${sec}`}</span>
      </div>
    )
  }
}
//
