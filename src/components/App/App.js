import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'

import NewTaskForm from '../NewTaskForm'
import Footer from '../Footer'
import TaskList from '../TaskList'

import './App.css'

export default class App extends Component {
  maxId = 0

  state = {
    todos: [this.createTodoItem('Create first task', 30, 59)],
    renderStatus: 'all',
  }

  createTodoItem(text, min, sec) {
    return {
      title: text,
      id: this.maxId++,
      edit: false,
      done: false,
      dateCreate: new Date(),
      date: 'less then 5 seconds',
      isStarted: false,
      seconds: sec,
      minutes: min,
    }
  }

  deleteItem = (id) => {
    this.setState(({ todos }) => {
      const idx = todos.findIndex((el) => el.id === id)
      const newTodos = [...todos.slice(0, idx), ...todos.slice(idx + 1)]
      return {
        todos: newTodos,
      }
    })
  }

  editItem = (id, title) => {
    this.setState(({ todos }) => ({
      todos: todos.map((el) => {
        const newEl = { ...el }
        if (newEl.id === id) {
          newEl.edit = false
          newEl.title = title
        }
        return newEl
      }),
    }))
  }

  addItem = (text, min, sec) => {
    const newItem = this.createTodoItem(text, min, sec)
    this.setState(({ todos }) => {
      const newTodos = [...todos, newItem]
      return {
        todos: newTodos,
      }
    })
  }

  changeStatus = (id, statusFlag) => {
    this.setState(({ todos }) => ({
      todos: [...todos].map((el) => {
        if (el.id === id) {
          el[statusFlag] = !el[statusFlag]
        }
        return el
      }),
    }))
  }

  changeRenderStatus = (status) => {
    this.setState({
      renderStatus: status,
    })
  }

  clearCompleted = () => {
    this.setState(({ todos }) => ({
      todos: todos.filter((el) => !el.done),
    }))
  }

  timeLeft = (id) => {
    this.setState(({ todos }) => {
      return {
        todos: todos.map((el) => {
          if (el.id === id) {
            el.date = formatDistanceToNow(el.dateCreate, { includeSeconds: true })
          }
          return el
        }),
      }
    })
  }

  getStart = (id) => {
    clearInterval(setInterval(this.getStart, 1000))
    this.setState(({ todos }) => {
      return {
        todos: todos.map((el) => {
          if (el.id === id) {
            el.isStarted = true
            if (el.seconds > 0) {
              el.seconds = el.seconds - 1
            } else if (el.minutes > 0) {
              el.minutes = el.minutes - 1
              el.seconds = el.seconds + 59
            } else if (Number(el.minutes) === 0 && Number(el.seconds) === 0) {
              el.isStarted = false
            }
          }
          return el
        }),
      }
    })
  }

  getPause = (id) => {
    clearInterval(setInterval(this.getStart, 1000))
    this.setState(({ todos }) => {
      return {
        todos: todos.map((el) => {
          if (el.id === id) {
            el.isStarted = !el.isStarted
          }
          return el
        }),
      }
    })
  }

  render() {
    const { todos, renderStatus, date, dateCreate } = this.state
    let doneCount = todos.filter((el) => el.done).length
    let todoCount = todos.length - doneCount
    return (
      <section className='todoapp'>
        <header className='header'>
          <h1>todos</h1>
          <NewTaskForm addItem={this.addItem} />
        </header>
        <section className='main'>
          <TaskList
            todos={todos}
            date={date}
            timeLeft={this.timeLeft}
            getStart={this.getStart}
            getPause={this.getPause}
            dateCreate={dateCreate}
            deleteItem={this.deleteItem}
            changeStatus={this.changeStatus}
            editItem={this.editItem}
            renderStatus={renderStatus}
          />
          <Footer
            renderStatus={renderStatus}
            toDo={todoCount}
            clearCompleted={this.clearCompleted}
            changeRenderStatus={this.changeRenderStatus}
          />
        </section>
      </section>
    )
  }
}
