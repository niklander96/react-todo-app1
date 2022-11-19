import { Component } from 'react'
import PropTypes from 'prop-types'
import './NewTaskForm.css'

export default class NewTaskForm extends Component {
  state = {
    title: '',
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
    e.preventDefault()
    this.props.addItem(this.state.title)
    this.setState({
      title: '',
    })
  }

  render() {
    const { title } = this.state
    const { minutes, seconds } = this.props
    return (
      <form onSubmit={this.onSubmit} className='new-todo-form'>
        <button type={'submit'}></button>
        <input className='new-todo' placeholder='Task' autoFocus onChange={this.onTextChange} value={title} />
        <input
          className='new-todo-form__timer'
          placeholder='Min'
          autoFocus
          onChange={this.onMinChange}
          value={minutes}
        />
        <input
          className='new-todo-form__timer'
          placeholder='Sec'
          autoFocus
          onChange={this.onSecChange}
          value={seconds}
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
