import Task from "./Task";
import PropTypes from 'prop-types'

const TaskList = ({
                      todos,
                      onDeleted,
                      onToggleDone,

                  }) => {


    return (
        <ul className='todo-list'>
            {todos.map(todo => {
                return <Task
                    todo={todo}
                    key={todo.id}
                    onDeleted={() => onDeleted(todo.id)}
                    onToggleDone={() => onToggleDone(todo.id)}

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



