import './Footer.css'
import { Component } from 'react'
import PropTypes from 'prop-types'

import TasksFilter from '../TaskFilter/TasksFilter'

export default class Footer extends Component {
  render() {
    const { toDo, clearCompleted, changeRenderStatus, renderStatus } = this.props
    return (
      <footer className='footer'>
        <span className='todo-count'>{`${toDo} items left`}</span>
        <TasksFilter changeRenderStatus={changeRenderStatus} renderStatus={renderStatus} />
        <button className='clear-completed' onClick={clearCompleted}>
          Clear completed
        </button>
      </footer>
    )
  }
}

Footer.defaultProps = {
  toDo: 0,
  changeRenderStatus: () => {},
  clearCompleted: () => {},
}

Footer.propTypes = {
  toDo: PropTypes.number,
  changeRenderStatus: PropTypes.func,
  clearCompleted: PropTypes.func,
}
