import React, { Component } from 'react';
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Status from "../task/Status";

const GET_PROJECT = gql`
  query Project($id: ID!) {
    project(_id: $id) {
      _id
      name
      description
      tasks {
        _id
        name
        description
        duration
        status
      }
    }
  }
`;

const REMOVE_PROJECT = gql`
  mutation deleteProjet($id: ID!){
    deleteProject(_id: $id){
      name
    }
  }
`;

function Project({ arg, id }) {
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id }
  });
  const [removeProject] = useMutation(REMOVE_PROJECT);
  var history = useHistory();

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const project = data.project;

  if(project.tasks == null){
    project.tasks = [];
  }

  return (
    <div>
      <h5>Nom: {project.name}</h5>
      <h6>Nom: {project._id}</h6>
      <h6>Desription: {project.description}</h6>

      <hr />
      
      {project.tasks.map(item =>
          <div key={item._id} className="card text-center m-3 border-dark">
            <div className="card-header">
              Identifiant de la tâche: {item._id}
            </div>
          </div>
        )}

      {project.tasks.length === 0 &&
        <div className="alert alert-danger" role="alert">
          Ce projet ne contient pas de tâches
        </div>
      }
      
      <button className="btn btn-danger" onClick={() => callMutationDeleteProject(removeProject, history, project._id)}>Supprimer ce projet</button>

    </div>
  );
}

function callMutationDeleteProject(removeProject, history, id) {
  removeProject({ variables: { id } });
  history.push('/projects');
}

class ProjectDetail extends Component {
    render() {
      
      return (
        <div>
          <Link className="btn btn-danger text-white" to="/projects">Retour</Link>
          <Project arg={this.props} id={this.props.match.params.id} />
        </div>
      );
    }
}

export default ProjectDetail;