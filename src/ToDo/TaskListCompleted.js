import { formatDistanceToNow } from 'date-fns';
import {Component} from "react";
export default class TaskListCompleted extends Component {

    render() {
        let timeOut = formatDistanceToNow(new Date(Date.now()),  {includeSeconds: true})
        return (
            <li className='completed'>
                <div className='view'>
                    <input type="checkbox" className='toggle'/>
                    <label>
                        <span className='description'>Completed task</span>
                        <span className='created'>{timeOut}</span>
                    </label>
                    <button className='icon icon-edit'></button>
                    <button className='icon icon-destroy'></button>
                </div>
            </li>
        )
    }


}

