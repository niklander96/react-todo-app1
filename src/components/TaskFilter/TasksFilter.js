import './TaskFilter.css'
import PropTypes from 'prop-types'

const TasksFilter = ({ changeRenderStatus, renderStatus }) => {
  const filterTasks = (status) => {
    changeRenderStatus(status)
  }

  const btnAll = renderStatus === 'all' ? 'selected' : ''
  const btnActive = renderStatus === 'active' ? 'selected' : ''
  const btnComplete = renderStatus === 'complete' ? 'selected' : ''
  return (
    <ul className='filters'>
      <li>
        <button onClick={() => filterTasks('all')} className={btnAll}>
          All
        </button>
      </li>
      <li>
        <button onClick={() => filterTasks('active')} className={btnActive}>
          Active
        </button>
      </li>
      <li>
        <button onClick={() => filterTasks('complete')} className={btnComplete}>
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
