import PropTypes from "prop-types";
import {Component} from "react";

export default class Task extends Component {

    state = {
        title: ''
    }
    onSubmit = (e) => {
        e.preventDefault()
        this.props.addItem(this.state.title);
        this.setState({
            title: ''
        })
    }
    onTextChange = (e) => {
        this.setState({
            title: e.target.value
        })
    }
render() {
   const {todo, onDeleted, onToggleDone, done, editItem} = this.props;
    let classes = '';
    if (done) {
        classes += ' completed';
    }

    return (
        <li className={classes}>

            <div className='view'>
                <input type="checkbox"
                       className='toggle'
                       onChange={onToggleDone}
                />
                <label>
                    <span className='description'>{todo.title}</span>
                    <span className='created'>created 5 minutes ago</span>
                </label>
                <button className='icon icon-edit'
                        onClick={editItem}
                ></button>
                <button className='icon icon-destroy'
                        onClick={onDeleted}
                ></button>
            </div>
            <form onSubmit={this.onSubmit}>
                <input type="text"
                       className="edit"
                       onChange={this.onTextChange}
                       value={this.state.title}
                />
            </form>

        </li>
    )
}
}

Task.propTypes = {
    todo: PropTypes.object.isRequired,
}

