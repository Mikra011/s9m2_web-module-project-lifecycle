import React from 'react'

export default class Form extends React.Component {
  render() {
    return (
      <>
        <form id='todoForm' onSubmit={this.props.onFormSubmit} >
          <input
            type='text'
            placeholder='type a todo'
            value={this.props.nameInput} // Access nameInput directly from props
            onChange={this.props.onNameInputChange}
          ></input>
          <input type='submit'></input>
        </form>
        <button onClick={this.props.toggleShowCompleted} >
          {this.props.showCompleted ? 'Hide' : 'Show'} Completed
        </button>
      </>
    )
  }
}
