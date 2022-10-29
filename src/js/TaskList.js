import Task from "./Task";
import PropTypes from 'prop-types'
import "../css/TaskList.css"

const TaskList = ({todos, onDeleted, onToggleDone, editItem, done}) => {

    return (
        <ul className='todo-list'>

            {todos.map(todo => {
                return <Task
                    todo={todo}
                    done={todo.done}
                    key={todo.id}
                    onDeleted={() => onDeleted(todo.id)}
                    onToggleDone={() => onToggleDone(todo.id)}
                    editItem={() => editItem(todo.id)}

                />

            })
            }
        </ul>
    )

}
TaskList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object.isRequired),

}

export default TaskList;



