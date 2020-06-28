import React, { Component } from 'react';
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const ADD_TASK = gql`
  mutation addTask($name: String! ,$description: String!, $duration: String!, $status: Int!) {
    createTask(name: $name, description: $description, duration: $duration, status: $status){
      name
    }
  }
`;

function AddTask() {
  let name;
  let description;
  let duration;
  let status;
  const [addTask] = useMutation(ADD_TASK);
  var history = useHistory();

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          addTask({ variables: { name: name.value, description: description.value, duration: duration.value, status: parseInt(status.value, 10) } });
          name.value = '';
          description.value = '';
          description.duration = '';
          description.value = '';
          history.push('/tasks');
        }}
      >
        <div className="form-group">          
          <label>Nom:</label>
          <input className="form-control" ref={node => { name = node; }} />
        </div>

        <div className="form-group">          
          <label>Description:</label>
          <input className="form-control" ref={node => { description = node; }} />
        </div>

        <div className="form-group">          
          <label>Durée:</label>
          <input className="form-control" ref={node => { duration = node; }} />
        </div>

        <div className="form-group">          
          <label>Status:</label>
          <input type="number" className="form-control" ref={node => { status = node; }} />
        </div>
        
        <div>
            <Link className="btn btn-danger text-white mr-2" to="/tasks">Retour</Link>
          <button type="submit" className="btn btn-success">Créer une tâche</button>
        </div>
      </form>
    </div>
  );
}

class TaskForm extends Component {
    render() {
      return (
        <div>
          <AddTask />
        </div>
      );
    }
}

export default TaskForm;