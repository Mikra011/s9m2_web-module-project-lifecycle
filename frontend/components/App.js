import React from 'react'
import axios from 'axios'

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

  // clearCompleted = () => {
  //   const completedTodos = this.state.todos.filter(todo => todo.completed);
  //   completedTodos.forEach(todo => {
  //     axios.delete(`${URL}/${todo.id}`)
  //       .then(() => {
  //         this.fetchTodos();
  //       })
  //       .catch(this.displayAxiosError);
  //   });
  // }

  toggleShowCompleted = () => {
    this.setState({ ...this.state, showCompleted: !this.state.showCompleted })
  }

  render() {
    return (
      <div>
        {/* good idea for displaying the error, shame that it was not mine :/ */}
        <div id='error' >Error: {this.state.error ? this.state.error : 'No error'}</div>
        <div id='todos' >
          <h2>Todos</h2>
          {
            this.state.todos
            .filter(td => this.state.showCompleted || !td.completed) 
            .map(td => (
              <div key={td.id} onClick={this.toggleCompleted(td.id)}>
                {td.name} {td.completed ? '✔️' : ''}
              </div>
            ))
          }
        </div>
        <form id='todoForm' onSubmit={this.onFormSubmit} >
          <input
            type='text'
            placeholder='type a todo'
            value={this.state.nameInput}
            onChange={this.onNameInputChange}
          ></input>
          <input type='submit'></input>
        </form>
        <button onClick={this.toggleShowCompleted} >{this.state.showCompleted ? 'Hide' : 'Show'} Completed</button>
      </div>
    )
  }
}
