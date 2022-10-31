import {Component} from "react";
import PropTypes from "prop-types";
import "./NewTaskForm.css"

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
        const { title } = this.state;
        return (
                <form onSubmit={this.onSubmit}>
                    <input className="new-todo"
                           placeholder="What needs to be done?"
                           autoFocus
                           onChange={this.onTextChange}
                           value={title}
                    />
                </form>

        )
    }



}
NewTaskForm.defaultProps = {
    addItem: () => {},
}

NewTaskForm.propTypes = {
    addItem: PropTypes.func.isRequired,
}
