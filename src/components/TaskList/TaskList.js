import PropTypes from 'prop-types'
import './TaskList.css'
import { useState } from 'react'

import Task from '../Task'

const TaskList = ({ timeLeft, getPause, getStart, deleteItem, changeStatus, todos, renderStatus, editItem }) => {
  const [title, setTitle] = useState('')

  const editTask = (e) => {
    setTitle(e.target.value)
  }

  const submitEdit = (e, id, newTitle) => {
    e.preventDefault()
    editItem(id, title === '' ? newTitle : title)
    setTitle('')
  }

  const elements = (todos, status) => {
    if (status === 'active') {
      todos = todos.filter((el) => !el.done)
    }
    if (status === 'complete') {
      todos = todos.filter((el) => el.done)
    }

    return todos.map((el) => {
      const { title, id, edit, done, dateCreate, date, seconds, minutes, inter, isStarted } = el
      let classChange = ''
      if (edit) {
        classChange = 'editing'
      } else {
        classChange = done ? 'completed' : classChange
      }
      return (
        <li className={classChange} key={id}>
          <Task
            title={title || undefined}
            dateCreate={dateCreate}
            date={date}
            id={id}
            done={done}
            timeLeft={() => timeLeft(id)}
            inter={inter}
            getStart={() => getStart(id)}
            getPause={() => getPause(id)}
            seconds={seconds}
            minutes={minutes}
            isStarted={isStarted}
            onDeleted={() => deleteItem(id)}
            onCompleted={() => changeStatus(id, 'done')}
            onEdited={() => changeStatus(id, 'edit')}
          />
          {edit && (
            <form onSubmit={(e) => submitEdit(e, id, title)}>
              <input type='text' className='edit' autoFocus onChange={editTask} defaultValue={title} />
            </form>
          )}
        </li>
      )
    })
  }

  const itemsToDo = elements(todos, renderStatus)
  return <ul className='todo-list'>{itemsToDo}</ul>
}

TaskList.defaultProps = {
  editTodo: () => {},
  changeStatus: () => {},
}

TaskList.propTypes = {
  editTodo: PropTypes.func,
  changeStatus: PropTypes.func,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      id: PropTypes.number,
      edit: PropTypes.bool,
      done: PropTypes.bool,
    }),
  ).isRequired,
}
export default TaskList
