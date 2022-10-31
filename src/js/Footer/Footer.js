import TasksFilter from "../TaskFilter/TasksFilter";
import "./Footer.css"
import {Component} from "react";
import PropTypes from "prop-types";

export default class Footer extends Component {

    render() {
        const { toDo, clearCompleted, changeRenderStatus } = this.props;
        return (
            <footer className="footer">
                <span className="todo-count">{`${toDo} items left`}</span>
                <TasksFilter changeRenderStatus={changeRenderStatus}/>
                <button className="clear-completed" onClick={clearCompleted}>
                    Clear completed
                </button>
            </footer>
        )
    }
}
Footer.defaultProps = {
    todo: 0,
    changeRenderStatus: () => {},
    clearCompleted: () => {},
}

Footer.propTypes = {
    toDo: PropTypes.number,
    changeRenderStatus: PropTypes.func,
    clearCompleted: PropTypes.func,
}