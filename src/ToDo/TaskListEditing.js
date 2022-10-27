import {Component} from "react";

export default class TaskListEditing extends Component{
    render() {

        let edTask = 'Editing task'
        return (
            <li className="editing">
                <div className="view">
                    <input className="toggle" type="checkbox" />
                    <label>
                        <span className="description"
                              onClick={() => console.log('done')}
                        >Editing task</span>
                        <span className="created">created 5 minutes ago</span>
                    </label>
                    <button className="icon icon-edit"></button>
                    <button className="icon icon-destroy"></button>
                </div>
                <input type="text" className="edit" value={edTask} />
            </li>
        )
    }


}

