import React from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos: [],
    error: ''
  }

  fetchTodos = () => {
    axios.get(URL)
      .then(res => {
        this.setState({ ...this.state, todos: res.data.data})
      })
      .catch(err => {
        this.setState({ ...this.state, error: err.response.data.message})
      })
  }

  componentDidMount() {
    this.fetchTodos()
  }

  render() {
    return (
      <div>
        {/* good idea for displaying the error, shame that it was not mine :/ */}
        <div id='error' >Error: {this.state.error ? this.state.error : 'No error'}</div> 
        <div id='todos' >
          <h2>Todos</h2>
          {
            this.state.todos.map(td => {
              return <div key={td.id} >{td.name}</div>
            })
          }
        </div>
        <form id='todoForm' >
          <input type='text' placeholder='type a todo'></input>
          <input type='submit'></input>
          <button>Clear Completed</button>
        </form>
      </div>
    )
  }
}
