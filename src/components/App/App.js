import React, { useState, useRef } from 'react'
import { formatDistanceToNow } from 'date-fns'

import NewTaskForm from '../NewTaskForm'
import Footer from '../Footer'
import TaskList from '../TaskList'

import './App.css'

const App = () => {
  const maxId = useRef(0)
  const createTodoItem = (text, min, sec) => {
    return {
      title: text,
      id: maxId.current++,
      edit: false,
      done: false,
      dateCreate: new Date(),
      date: 'less then 5 seconds',
      isStarted: false,
      seconds: sec,
      minutes: min,
    }
  }

  const [todos, setTodos] = useState([createTodoItem('Create first task', 30, 59)])
  const [renderStatus, setRenderStatus] = useState('all')

  const deleteItem = (id) => {
    const idx = todos.findIndex((el) => el.id === id)
    setTodos([...todos.slice(0, idx), ...todos.slice(idx + 1)])
  }

  const editItem = (id, title) => {
    setTodos(
      todos.map((el) => {
        const newEl = { ...el }
        if (newEl.id === id) {
          newEl.edit = false
          newEl.title = title
        }
        return newEl
      }),
    )
  }

  const addItem = (text, min, sec) => {
    const newItem = createTodoItem(text, min, sec)
    setTodos([...todos, newItem])
  }

  const changeStatus = (id, statusFlag) => {
    setTodos(
      [...todos].map((el) => {
        if (el.id === id) {
          el[statusFlag] = !el[statusFlag]
        }
        return el
      }),
    )
  }

  const changeRenderStatus = (status) => {
    setRenderStatus(status)
  }

  const clearCompleted = () => {
    this.setState(todos.filter((el) => !el.done))
  }

  const timeLeft = (id) => {
    setTodos(
      todos.map((el) => {
        if (el.id === id) {
          el.date = formatDistanceToNow(el.dateCreate, { includeSeconds: true })
        }
        return el
      }),
    )
  }

  const getStart = (id) => {
    clearInterval(setInterval(getStart, 1000))
    setTodos(
      todos.map((el) => {
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
      })
    )
  }

  const getPause = (id) => {
    clearInterval(setInterval(getStart, 1000))
    setTodos(
      todos.map((el) => {
        if (el.id === id) {
          el.isStarted = !el.isStarted
        }
        return el
      })
    )
  }

  let doneCount = todos.filter((el) => el.done).length
  let todoCount = todos.length - doneCount
  return (
    <section className='todoapp'>
      <header className='header'>
        <h1>todos</h1>
        <NewTaskForm addItem={addItem} />
      </header>
      <section className='main'>
        <TaskList
          todos={todos}
          timeLeft={timeLeft}
          getStart={getStart}
          getPause={getPause}
          deleteItem={deleteItem}
          changeStatus={changeStatus}
          editItem={editItem}
          renderStatus={renderStatus}
        />
        <Footer
          renderStatus={renderStatus}
          toDo={todoCount}
          clearCompleted={clearCompleted}
          changeRenderStatus={changeRenderStatus}
        />
      </section>
    </section>
  )
}

export default App
