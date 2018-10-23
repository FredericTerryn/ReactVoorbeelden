import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoTable2 from './TodoTable2';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      description: '',
      date: '',
      todos: []}
  }

  inputChanged = (event) => {
    this.setState({ description: event.target.value });
  }

  DateInputChanged = (event) => {
    this.setState({ date: event.target.value });
  }

  addTodo = (event) => {
    event.preventDefault();
    let t = this.state.todos.slice();
    t.push({ date: this.state.date, description: this.state.description });
    this.setState({ todos: t });

    //this.setState({
     // todos: [...this.state.todos, {date: this.state.date, description: this.state.description}]
   // })
  }

  delete = (event, id) => {
    event.preventDefault();
    let id2 = parseInt(event.target.id);
    this.setState({ todos: this.state.todos.filter((opgaves, index) => index !== id2) });

    }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Simple Todolist</h2>
        </div>
        <div>
          <form onSubmit={this.addTodo}>
            <input type="text" onChange={this.inputChanged} value={this.state.description} />
            <input type="date" onChange={this.DateInputChanged} value={this.state.date} />
            <input type="submit" value="Add" />
          </form>
        </div>
        <TodoTable2 todos={this.state.todos} delete={this.delete} />
      </div>
    );
  }
}

export default App;