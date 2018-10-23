import React, { Component } from 'react';
import './App.css';
import App from './App';

class TodoTable extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
        <table>
            <tbody>
                <tr><th>Name  </th><th>Description</th></tr>
                {this.props.todos.map((opgaves, index) =>
                    <tr key={index}>
                        <td>{opgaves.description}</td>
                        <td>{opgaves.date}</td>
                        <td><button id={index} onClick={this.props.delete} value={index}>Delete</button></td>
                    </tr>)}
            </tbody>
        </table>
        )}

}

//JE HEBT NU DELETE MEEGEKREGEN IN DE PROPS DUS JE KAN ZEGGEN, this.props.delete

export default TodoTable
