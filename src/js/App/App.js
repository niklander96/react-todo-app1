import React from "react";
import NewTaskForm from "../NewTaskForm";
import Footer from "../Footer";
import TaskList from "../TaskList";
import {Component} from "react";
import "./App.css"

export default class App extends Component {

    maxId = 0;

    state = {
        todos: [this.createTodoItem('Create first task')],
        currentItems: [],
        renderStatus: 'all',
    }

    createTodoItem(text) {
        return {
            title: text,
            id: this.maxId++,
            edit: false,
            done: false,

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

    editItem = (id, title) => {
        this.setState(({todos}) => {
            todos.map(el => {
                const newEl = {...el};
                if (newEl.id === id) {
                    newEl.isEditing = false;
                    newEl.title = title;
                }
                return newEl;
            })

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

    ChangeStatus = (id, statusFlag) => {
        this.setState(({ todos }) => ({
            todos: todos.map((el) => {
                const newEl = { ...el}
                if (newEl.id === id) newEl[statusFlag] = !el[statusFlag];
                return newEl
            })

        }))
    }

    changeRenderStatus = (status) => {
        this.setState({
            renderStatus: status,
        })
    }

    clearCompleted = () => {
        this.setState(({todos}) => ({
            todos: todos.filter((el) => !el.done)
        }))
    }



    render() {
        const { todos, renderStatus } = this.state;
        let doneCount = this.state.todos.filter((el) => el.done).length;
        let todoCount = this.state.todos.length - doneCount;
        return (
            <section className='todoapp'>
                <header className="header">
                    <h1>todos</h1>
                <NewTaskForm addItem={this.addItem}/>
                    </header>
                <section className='main'>
                    <TaskList
                        todos={todos}
                        deleteItem={this.deleteItem}
                        onToggleDone={this.onToggleDone}
                        addItem={this.addItem}
                        editItem={this.editItem}
                        renderStatus={renderStatus}
                    />
                    <Footer
                        toDo={todoCount}
                        todos={todos}
                        clearCompleted={this.clearCompleted}
                        ChangeRenderStatus={this.changeRenderStatus}
                    />
                </section>
            </section>
        )
    }
}