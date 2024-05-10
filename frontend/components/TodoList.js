import React from 'react'
import Todo from './Todo'

export default class TodoList extends React.Component {
  render() {
    return (
      <div id='todos' >
        <h2>Todos</h2>
        {
          this.props.todos
            .filter(td => this.props.showCompleted || !td.completed)
            .map(td => (
              <Todo 
              key={td.id} 
              todo={td} 
              toggleCompleted={this.props.toggleCompleted} 
              />
            ))
        }
      </div>
    )
  }
}
