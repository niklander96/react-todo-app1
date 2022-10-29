import {Component} from "react";
import PropTypes from "prop-types";
import "../css/NewTaskForm.css"

export default class NewTaskForm extends Component {

    state = {
        title: ''
    };


onTextChange = (e) => {
    this.setState({
       title: e.target.value
    })
}

onSubmit = (e) => {
    e.preventDefault()
    this.props.addItem(this.state.title);
    this.setState({
        title: ''
    })
}
render() {
    return (
        <header className="header">
            <h1>todos</h1>
            <form onSubmit={this.onSubmit}>
                <input className="new-todo"
                       placeholder="What needs to be done?"
                       autoFocus
                       onChange={this.onTextChange}
                       value={this.state.title}
                />
            </form>
        </header>

    )
}



}

NewTaskForm.propTypes = {
    addItem: PropTypes.func.isRequired
}

