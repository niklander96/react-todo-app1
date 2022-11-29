import { Component } from 'react'
import './TaskFilter.css'
import PropTypes from 'prop-types'

export default class TasksFilter extends Component {
  filterTasks = (e, status) => {
    const { changeRenderStatus } = this.props
    changeRenderStatus(status)
  }
  render() {
    const { renderStatus } = this.props
    const btnAll = renderStatus === 'all' ? 'selected' : ''
    const btnActive = renderStatus === 'active' ? 'selected' : ''
    const btnComplete = renderStatus === 'complete' ? 'selected' : ''
    // const btnAll = styleButFilter === 1 ? 'selected' : '';
    // const btnActive = styleButFilter === 2 ? 'selected' : '';
    // const btnComplete = styleButFilter === 3 ? 'selected' : '';
    return (
      <ul className='filters'>
        <li>
          <button onClick={(e) => this.filterTasks(e, 'all')} className={btnAll}>
            All
          </button>
        </li>
        <li>
          <button onClick={(e) => this.filterTasks(e, 'active')} className={btnActive}>
            Active
          </button>
        </li>
        <li>
          <button onClick={(e) => this.filterTasks(e, 'complete')} className={btnComplete}>
            Completed
          </button>
        </li>
      </ul>
    )
  }
}
TasksFilter.defaultProps = {
  changeRenderStatus: () => {},
}

TasksFilter.propTypes = {
  changeRenderStatus: PropTypes.func,
}
