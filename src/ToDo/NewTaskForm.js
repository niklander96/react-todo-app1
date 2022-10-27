import {Component} from "react";
import PropTypes from "prop-types";

export default class NewTaskForm extends Component {

render() {

    return (
        <header className="header">
            <h1>todos</h1>
            <input className="new-todo"
                   placeholder="What needs to be done?"
                   autoFocus

            />
        </header>

    )
}



}

NewTaskForm.propTypes = {
    onCreate: PropTypes.func.isRequired
}

