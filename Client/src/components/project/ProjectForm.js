import React, { Component } from 'react';
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Link } from "react-router-dom";

const ADD_PROJECT = gql`
  mutation addProject($name: String! ,$description: String!) {
    createProject(name: $name, description: $description)
  }
`;

function AddProject() {
  let name;
  let description;
  const [addProject, { data }] = useMutation(ADD_PROJECT);

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          addProject({ variables: { name: name.value, description: description.value } });
          name.value = '';
          description.value = '';
        }}
      >
        <div className="form-group">          
          <label>Title:</label>
          <input className="form-control" ref={node => { name = node; }} />
        </div>

        <div className="form-group">          
          <label>Description:</label>
          <input className="form-control" ref={node => { description = node; }} />
        </div>
        
        <div>
          <button type="submit" className="btn btn-success">Créer</button>
        </div>
      </form>
    </div>
  );
}

class ProjectForm extends Component {
    render() {
      return (
        <div>
          <Link className="btn btn-danger text-white" to="/projects">Retour</Link>
          <AddProject />
        </div>
      );
    }
}

export default ProjectForm;