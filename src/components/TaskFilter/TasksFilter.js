import './TaskFilter.css'
import PropTypes from 'prop-types'

const TasksFilter =({changeRenderStatus, renderStatus}) => {

    const filterTasks = (e, status) => {
    changeRenderStatus(status)
  }

    const btnAll = renderStatus === 'all' ? 'selected' : ''
    const btnActive = renderStatus === 'active' ? 'selected' : ''
    const btnComplete = renderStatus === 'complete' ? 'selected' : ''
    return (
      <ul className='filters'>
        <li>
          <button onClick={(e) => filterTasks(e, 'all')} className={btnAll}>
            All
          </button>
        </li>
        <li>
          <button onClick={(e) => filterTasks(e, 'active')} className={btnActive}>
            Active
          </button>
        </li>
        <li>
          <button onClick={(e) => filterTasks(e, 'complete')} className={btnComplete}>
            Completed
          </button>
        </li>
      </ul>
    )
}
TasksFilter.defaultProps = {
  changeRenderStatus: () => {},
}

TasksFilter.propTypes = {
  changeRenderStatus: PropTypes.func,
}

export default TasksFilter