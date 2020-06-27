import React, { Component } from 'react';
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const ADD_TASK = gql`
  mutation addTask($name: String! ,$description: String!) {
    createTask(name: $name, description: $description){
      name
    }
  }
`;

function AddTask() {
  let name;
  let description;
  const [addTask] = useMutation(ADD_TASK);
  var history = useHistory();

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          addTask({ variables: { name: name.value, description: description.value } });
          name.value = '';
          description.value = '';
          history.push('/');
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
        
        <div>
            <Link className="btn btn-danger text-white mr-2" to="/">Retour</Link>
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