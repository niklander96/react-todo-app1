import {Component} from "react";
import "./TaskFilter.css"


export default class TasksFilter extends Component {

    filterTasks = (e, status) => {
        const { changeRenderStatus } = this.props
        const allBtn = document.querySelectorAll('.selected')
        allBtn.forEach((item) => item.classList.remove('selected'))
        e.target.classList.add('selected')
        changeRenderStatus(status);
    }

    render() {

        return (
            <ul className="filters">
                <li>
                    <button onClick={(e) => this.filterTasks(e, 'all')}
                    >All</button>
                </li>
                <li>
                    <button onClick={(e) => this.filterTasks(e, 'active')}>Active</button>
                </li>
                <li>
                    <button onClick={(e) => this.filterTasks(e, 'complete')}>Completed</button>
                </li>
            </ul>
        )
    }

}






