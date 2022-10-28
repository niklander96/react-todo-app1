import React from "react";
import NewTaskForm from "./ToDo/NewTaskForm";
import Footer from "./ToDo/Footer";
import TaskList from "./ToDo/TaskList";
import {Component} from "react";

export default class App extends Component {

    maxId = 1;

    state = {
        todos: [
            this.createTodoItem('Complete task'),
            this.createTodoItem('Editing task'),
            this.createTodoItem('Active task'),
        ]
    }

    createTodoItem(text) {
        return {
            title: text,
            completed: false,
            done: false,
            id: this.maxId++
        }
    }

    deleteItem = (id) => {
        this.setState(({todos}) => {
            const idx = todos.findIndex(el => el.id === id);

            const newTodos = [
                ...todos.slice(0, idx),
                ...todos.slice(idx + 1)
            ];
            return {
                todos: newTodos
            }
        })
    }

    onToggleDone = (id) => {
        this.setState(({todos}) => {
            const idx = todos.findIndex(el => el.id === id);
            const oldItem = todos[idx];
            const newItem = {...oldItem, done: !oldItem.done};
            const newTodos = [
                ...todos.slice(0, idx),
                newItem,
                ...todos.slice(idx + 1)
            ];
            return {
                todos: newTodos
            };
        });
    };
    editItem = (text) => {
        this.setState(({todos}) => {
        return todos.map(el => el.title === text);

        })
    }

    addItem = (text) => {
        const newItem = this.createTodoItem(text);
        this.setState(({todos}) => {
            const newTodos = [
                ...todos,
                newItem
            ];
            return {
                todos: newTodos
            };
        });
    };

    render() {
        let doneCount = this.state.todos.filter((el) => el.done).length;
        let todoCount = this.state.todos.length - doneCount;
        return (
            <section className='todoapp'>
                <NewTaskForm onCreate={this.addItem}/>
                <section className='main'>
                    <TaskList
                        todos={this.state.todos}
                        onDeleted={this.deleteItem}
                        onToggleDone={this.onToggleDone}
                        addItem={this.addItem}
                        editItem={this.editItem}
                    />
                    <Footer toDo={todoCount}/>

                </section>
            </section>
        )
    }
}




