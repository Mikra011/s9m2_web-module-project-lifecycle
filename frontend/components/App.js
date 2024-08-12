import React from 'react'
import axios from 'axios'
import Form from './Form'
import TodoList from './TodoList'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos: [],
    error: '',
    nameInput: '',
    showCompleted: true
  }

  displayAxiosError = (err) => {
    this.setState({ ...this.state, error: err.response.data.message });
  }

  onNameInputChange = (e) => {
    const { value } = e.target
    this.setState({ ...this.state, nameInput: value })
  }

  postTodos = () => {
    axios.post(URL, { name: this.state.nameInput })
      .then(
        this.fetchTodos(),
        this.setState({ ...this.state, nameInput: '' })
      )
      .catch(this.displayAxiosError)
  }

  fetchTodos = () => {
    axios.get(URL)
      .then(res => {
        this.setState({ ...this.state, todos: res.data.data })
        this.setState({ ...this.state, nameInput: '' })
      })
      .catch(this.displayAxiosError)
  }

  componentDidMount() {
    this.fetchTodos()
  }

  onFormSubmit = (e) => {
    e.preventDefault()
    this.postTodos()
  }

  toggleCompleted = id => (e) => {
    axios.patch(`${URL}/${id}`)
      .then(res => {
        this.fetchTodos()
      })
      .catch(this.displayAxiosError)
  }

  // would be nice to have an endpoint to try this. I could not set it up for now :////
  // I have tried several times, and it makes me super angry that I could not do it 🤯🤯🤯 
  // I think I have missed some trivial stuff.


  clearCompleted = () => {
    const completedTodos = this.state.todos.filter(todo => todo.completed);
    completedTodos.forEach(todo => {
      axios.delete(`${URL}/${todo.id}`)
        .then(() => {
          this.fetchTodos()
        })
        .catch(this.displayAxiosError)
    })
  }

  toggleShowCompleted = () => {
    this.setState({ ...this.state, showCompleted: !this.state.showCompleted })
  }

  render() {
    return (
      <div className='extra'>
        {/* good idea for displaying the error, shame that it was not mine :/ */}
        <div id='error' >Error: {this.state.error ? this.state.error : 'No error'}</div>
        <TodoList
          todos={this.state.todos} 
          toggleCompleted={this.toggleCompleted} 
          showCompleted={this.state.showCompleted}
        />
        <Form
          onFormSubmit={this.onFormSubmit}
          nameInput={this.state.nameInput}
          onNameInputChange={this.onNameInputChange}
          toggleShowCompleted={this.toggleShowCompleted}
          showCompleted={this.state.showCompleted}
          clearCompleted={this.clearCompleted}
        />
      </div>
    )
  }
}
