import TasksFilter from "../TaskFilter/TasksFilter";
import "./Footer.css"
import {Component} from "react";

export default class Footer extends Component {
    render() {

        const {toDo, clearCompleted, onChangeRenderStatus, onActive} = this.props;
        return (
            <footer className="footer">
                <span className="todo-count">{toDo} items left</span>
                <TasksFilter
                    onChangeRenderStatus={onChangeRenderStatus}
                    onActive={onActive}
                    clearCompleted={clearCompleted}
                />
                <button className="clear-completed"
                        onClick={clearCompleted}
                >Clear completed
                </button>
            </footer>
        )
    }
}

