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
        renderStatus: 'all'
    }

    createTodoItem(text) {
        return {
            title: text,
            edit: false,
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

    onChangeStatus = (id, statusFlag) => {
        this.setState(({ todos }) => ({
           todos: todos.map((el) => {
               const newEl = { ...el}
               if (newEl.id === id) newEl[statusFlag] = !el[statusFlag];
               return newEl
           })

        }))
    }

    onChangeRenderStatus = (status) => {
        this.setState({
            renderStatus: status,
        })
    }

    clearCompleted = () => {
        this.setState(({todos}) => ({
            todos: todos.filter((el) => !el.done)
        }))
    }

    // onActive = () => {
    //     this.setState(({ todos }) => ({
    //         todos: todos.filter((el) => ({
    //             el.done: false
    //         })
    //         }))
    // }

    render() {
        let doneCount = this.state.todos.filter((el) => el.done).length;
        let todoCount = this.state.todos.length - doneCount;
        return (
            <section className='todoapp'>
                <NewTaskForm addItem={this.addItem}/>
                <section className='main'>

                    <TaskList
                        todos={this.state.todos}
                        onDeleted={this.deleteItem}
                        onToggleDone={this.onToggleDone}
                        addItem={this.addItem}
                        editItem={this.editItem}
                        onChangeStatus={this.onChangeStatus}

                    />
                    <Footer
                        toDo={todoCount}
                        todos={this.state.todos}
                        clearCompleted={this.clearCompleted}
                        onChangeRenderStatus={this.onChangeRenderStatus}
                        onActive={this.onActive}
                    />
                </section>
            </section>
        )
    }
}




