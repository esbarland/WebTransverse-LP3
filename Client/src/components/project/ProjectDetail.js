import React, { Component } from 'react';
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Link } from "react-router-dom";

const GET_PROJECT = gql`
  query Projects($id: ID!) {
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

function Project({ arg, id }) {
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id }
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const project = data.project;

  if(project.tasks == null){
    project.tasks = [];
  }

  return (
    <div>
      <h3>{project.name}</h3>
      <p>{project.description}</p>

      
      {project.tasks.map(item =>
          <div key={item._id} className="card text-center m-3 border-dark">
            <div className="card-header">
              {item.name}
            </div>
            <div className="card-body">
              <p className="card-text">{item.description}</p>
            </div>
            <div className="card-footer text-muted">
              {item.duration}
            </div>
          </div>
        )}

      {project.tasks.length === 0 &&
        <div className="alert alert-danger" role="alert">
          Ce projet ne contient pas de tâches
        </div>
      }

    </div>
  );
}

class ProjectDetail extends Component {
    render() {
      
    console.log("projectdetail: ", this);
      return (
        <div>
          <Link className="btn btn-danger text-white" to="/projects">Retour</Link>
          <Project arg={this.props} id={this.props.match.params.id} />
        </div>
      );
    }
}

export default ProjectDetail;