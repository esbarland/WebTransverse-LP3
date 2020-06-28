import React, { Component } from 'react';
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Link } from "react-router-dom";

const GET_PROJECTS = gql`
  {
    projects{
      _id 
      name
      description 
      tasks{
        name
      }
    }
  }
`;

function Projects() {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return "Chargement...";
  if (error) 
    return (
      <div className="alert alert-danger" role="alert">
        Erreur ! {error.message}
      </div>
    );

  return (
      <div className="list-projects">
        {data.projects.map(item =>
          <div key={item._id} className="card text-center m-3 border-dark">
            <div className="card-header">
              {item.name}
            </div>
            <div className="card-body">
              <h5 className="card-title">Ce projet contient {item.tasks ? item.tasks.lenght : 0} tâches.</h5>
              <p className="card-text">{item.description}</p>
              <Link className="btn btn-primary" to={("/project/" + item._id.toString())}>Détails</Link>
            </div>
          </div>
        )}
      </div>
  );
}

class ProjectList extends Component {

  render() {
    return (
      <div>
        <div className="text-right">
          <Link className="btn btn-success text-white" to="/projects/form">Ajouter un projet</Link>
        </div>
        <h1 className="text-center">Liste des projets</h1>
        <Projects />
      </div>
    );
  }
}

export default ProjectList;