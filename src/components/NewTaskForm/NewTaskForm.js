import { Component } from 'react'
import PropTypes from 'prop-types'
import './NewTaskForm.css'

export default class NewTaskForm extends Component {
  state = {
    title: '',
    seconds: '',
    minutes: '',
  }

  onSecChange = (e) => {
    this.setState({
      seconds: e.target.value,
    })
  }

  onMinChange = (e) => {
    this.setState({
      minutes: e.target.value,
    })
  }

  onTextChange = (e) => {
    this.setState({
      title: e.target.value,
    })
  }

  onSubmit = (e) => {
    const { minutes, seconds, title } = this.state
    e.preventDefault()
    this.props.addItem(title, minutes, seconds)
    this.setState({
      title: '',
      minutes: '',
      seconds: '',
    })
  }

  render() {
    const { title, minutes, seconds } = this.state
    return (
      <form onSubmit={this.onSubmit} className='new-todo-form'>
        <button type={'submit'}></button>
        <input
          className='new-todo'
          placeholder='Task'
          autoFocus
          onChange={this.onTextChange}
          value={title}
          name='task'
          required
        />
        <input
          className='new-todo-form__timer'
          placeholder='Min'
          autoFocus
          type='number'
          min='0'
          onChange={this.onMinChange}
          value={minutes}
          name='minutes'
          required
        />
        <input
          className='new-todo-form__timer'
          placeholder='Sec'
          autoFocus
          type='number'
          min='0'
          max='60'
          onChange={this.onSecChange}
          value={seconds}
          name='seconds'
          required
        />
      </form>
    )
  }
}
NewTaskForm.defaultProps = {
  addItem: () => {},
}

NewTaskForm.propTypes = {
  addItem: PropTypes.func.isRequired,
  title: PropTypes.string,
  seconds: PropTypes.number,
  minutes: PropTypes.number,
}
