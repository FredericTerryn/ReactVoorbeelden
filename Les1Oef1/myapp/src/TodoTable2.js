import React, { Component } from 'react';
import './App.css';
import App from './App';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class TodoTable2 extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const columns = [{
            Header: 'Date',
            accessor: 'date'
        }, {
            Header: 'Description',
            accessor: 'description'
        }]
        return (
            <div className="App">
                <ReactTable data={this.props.todos}
                    columns={[
                        {
                            Header: "Description",
                            accessor: "description"
                        },
                        {
                            Header: "Date",
                            accessor: "date",
                                   
                        }, 
                        {
                            Header: 'Action',
                            accessor: 'action',
                            Cell: row => 
                                <button id={row.index} onClick={this.props.delete} value={row.index}>Delete</button>
                            
                        }
                    ]} sortable='true'
                    defaultPageSize='5' indexKey='_index'
                    
                  />
            </div>
        )
    }

}

export default TodoTable2
//  SubComponent= {row => {
//    return <button id={indexKey} onClick={this.props.delete} value={indexKey}>Delete</button>}}/>