import PropTypes from "prop-types";
import {Component} from "react";
import {formatDistanceToNow} from "date-fns";


export default class Task extends Component {

    state = {
        title: '',
        dateCreate: new Date(),
        date: 'less than 5 seconds ago',
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

    timeLeft = () => {
        this.setState(({dateCreate}) => ({
            dateCreate,
            date: formatDistanceToNow(dateCreate, {includeSeconds: true, addSuffix: true})
        }))
    }

    render() {
        const { date } = this.state;
        const {todo, onDeleted, onToggleDone, done, editItem} = this.props;
        setInterval(this.timeLeft, 5000)

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
                        <span className='created'>{`created ${date}`}</span>
                    </label>
                    <button className='icon icon-edit'
                            onClick={editItem}
                    ></button>
                    <button className='icon icon-destroy'
                            onClick={onDeleted}
                    ></button>
                </div>

                {/*<form onSubmit={this.onSubmit}>*/}
                {/*    <input type="text"*/}
                {/*           className="edit"*/}
                {/*           onChange={this.onTextChange}*/}
                {/*           value={this.state.title}*/}
                {/*    />*/}
                {/*</form>*/}

            </li>
        )
    }
}

Task.propTypes = {
    todo: PropTypes.object.isRequired,
}