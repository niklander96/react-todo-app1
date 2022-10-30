import Task from "../Task";
import PropTypes from 'prop-types'
import "./TaskList.css"
import {Component} from "react";

export default class TaskList extends Component {
    state = {
        title: ''
    }
    elements = (todos, status) => {
        const {onDeleted, onChangeStatus} = this.props;
        if (status === 'active') {
            todos: todos.filter(el => !el.done)
        }
        if (status === 'complete') {
            todos: todos.filter(el => el.done)
        }
        return todos.map(el => {
            const { title, id, edit, done} = el;
            let classChange = '';
            if (edit) {
                classChange = 'editing'
            } else {
                classChange = done ? 'completed' : classChange
            }
            return (
                <ul className='todo-list'>
                    <li className={classChange} key={id}>
                        <Task
                            title={title || undefined}
                            done={done}
                            key={todo.id}
                            onDeleted={() => onDeleted(id)}
                            onToggleDone={() => onToggleDone(id)}
                            editItem={() => editItem(todo.id)}
                            onChangeStatus={() => onChangeStatus()}
                            />
                            </li>
                </ul>
            )

        })

    }
    render() {
    const {todos, onDeleted, onToggleDone, editItem, onChangeStatus} = this.props;
        let classes = '';
        if (todos.done) {
            classes += ' completed';
        }
        return (

            <ul className='todo-list'>
                <li className={classes}
                >
                    {todos.map(todo => {
                        return <Task
                            todo={todo}
                            done={todo.done}
                            key={todo.id}
                            onDeleted={() => onDeleted(todo.id)}
                            onToggleDone={() => onToggleDone(todo.id)}
                            editItem={() => editItem(todo.id)}
                            onChangeStatus={() => onChangeStatus()}
                        />
                    })
                    }
                    {/*{isEditing ? (*/}
                    {/*    <form onSubmit={(e) => this.onSubmit}>*/}
                    {/*        <input type="text"*/}
                    {/*               className="edit"*/}
                    {/*               onChange={this.editItem}*/}
                    {/*               defaultValue={this.state.title}*/}

                    {/*        />*/}
                    {/*    </form>*/}
                    {/*) : null}*/}
                </li>
            </ul>
        )
    }


}
TaskList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object.isRequired),

}





