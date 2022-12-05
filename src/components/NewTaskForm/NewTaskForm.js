import {Component, useState} from 'react'
import PropTypes from 'prop-types'
import './NewTaskForm.css'

const NewTaskForm = ({addItem}) => {
  const [title, setTitle] = useState('')
  const [seconds, setSeconds] = useState('')
  const [minutes, setMinutes] = useState('')

  const onSecChange = (e) => {
    setSeconds(e.target.value)
  }

 const onMinChange = (e) => {
    setMinutes(e.target.value)
  }

 const onTextChange = (e) => {
    setTitle(e.target.value)
  }

 const onSubmit = (e) => {
    e.preventDefault()
        addItem(title, minutes, seconds)
    setTitle('')
   setMinutes('')
   setSeconds('')
  }

    return (
      <form onSubmit={onSubmit} className='new-todo-form'>
        <button type={'submit'}></button>
        <input
          className='new-todo'
          placeholder='Task'
          autoFocus
          onChange={onTextChange}
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
          onChange={onMinChange}
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
          onChange={onSecChange}
          value={seconds}
          name='seconds'
          required
        />
      </form>
    )

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

export default NewTaskForm