import PropTypes from "prop-types";
import {Component} from "react";

export default class Task extends Component {

    state = {
        done: false
    }
    onInput = () => {
        this.setState(({done}) => {
           return {
               done: !done
           };
        });
    };



render() {
   const {todo, onDeleted, onToggleDone} = this.props;
    const { done } = this.state;
    let classes = '';
    if (done) {
        classes += ' completed';
    }

    return (
        <li className={classes}>

            <div className='view'>
                <input type="checkbox"
                       className='toggle'
                       onChange={this.onInput}

                />
                <label>
                        <span className='description'
                              onClick={onToggleDone}

                        >{todo.title}</span>
                    <span className='created'>created 5 minutes ago</span>
                </label>
                <button className='icon icon-edit'
                        // onClick={onCreate}

                ></button>
                <button className='icon icon-destroy'
                        onClick={onDeleted}
                ></button>
            </div>
            <input type="text"
                   className="edit"
                   />
        </li>
    )
}
}

Task.propTypes = {
    todo: PropTypes.object.isRequired,
}

