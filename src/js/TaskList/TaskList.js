import PropTypes from 'prop-types'
import './TaskList.css'
import { Component } from 'react'

import Task from '../Task'

export default class TaskList extends Component {
  state = {
    title: '',
  }

  editTask = (e) => {
    this.setState({
      title: e.target.value,
    })
  }

  submitEdit = (e, id, newTitle) => {
    const { editItem } = this.props
    const { title } = this.state
    e.preventDefault()
    editItem(id, title === '' ? newTitle : title)
    this.setState({
      title: '',
    })
  }

  elements = (todos, status) => {
    const { deleteItem, changeStatus } = this.props
    if (status === 'active') {
      todos = todos.filter((el) => !el.done)
    }
    if (status === 'complete') {
      todos = todos.filter((el) => el.done)
    }
    return todos.map((el) => {
      const { title, id, edit, done } = el
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
            id={id}
            done={done}
            onDeleted={() => deleteItem(id)}
            onCompleted={() => changeStatus(id, 'done')}
            onEdited={() => changeStatus(id, 'edit')}
            todo={todos}
          />
          {edit ? (
            <form onSubmit={(e) => this.submitEdit(e, id, title)}>
              <input type='text' className='edit' autoFocus onChange={this.editTask} defaultValue={title} />
            </form>
          ) : null}
        </li>
      )
    })
  }

  render() {
    const { todos, renderStatus } = this.props
    const elements = this.elements(todos, renderStatus)
    return <ul className='todo-list'>{elements}</ul>
  }
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
      label: PropTypes.string,
      id: PropTypes.number,
      edit: PropTypes.bool,
      done: PropTypes.bool,
    }),
  ).isRequired,
}
