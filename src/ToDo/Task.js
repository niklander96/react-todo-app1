import PropTypes from "prop-types";
import {Component} from "react";

export default class Task extends Component {

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


                ></button>
                <button className='icon icon-destroy'
                        onClick={onDeleted}
                ></button>
            </div>
            <input type="text"
                   className="edit"
                   onClick={editItem}
                   />
        </li>
    )
}
}

Task.propTypes = {
    todo: PropTypes.object.isRequired,
}

