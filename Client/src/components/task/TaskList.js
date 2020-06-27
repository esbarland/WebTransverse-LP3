import React, { Component } from 'react';
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Link } from "react-router-dom";

const GET_TASKS = gql`
  {
    tasks{
      _id 
      name 
      description 
      duration 
      status
    }
  }
`;

function Tasks() {
  const { loading, error, data } = useQuery(GET_TASKS);

  if (loading) return "Chargement...";
  if (error) 
    return (
      <div class="alert alert-danger" role="alert">
        Erreur ! {error.message}
      </div>
    );

  return (
      <div>
        {data.tasks.map(item =>
          <div key={item._id} className="card m-3 border-warning">
            <div className="card-header">
              {item.name}
            </div>
            <div className="card-body">
              <p className="card-text">Id: {item._id}</p>
              <p className="card-text">Durée: {item.duration}</p>
              <p className="card-text">Status: {item.status}</p>
              <p className="card-text">Description: {item.description}</p>
              <Link className="btn btn-primary" to={("/task/" + item._id.toString())}>Détails</Link>
            </div>
            <div className="card-footer text-muted">
              2 jours restants
            </div>
          </div>
        )}
      </div>
  );
}

class TaskList extends Component {
    render() {
      return (
        <div>
        <div className="text-right">
          <Link className="btn btn-success text-white" to="/tasks/form">Ajouter une tâche</Link>
        </div>

          <h1 className="text-center">Liste des tâches</h1>

          <Tasks />
        </div>
      );
    }
}

export default TaskList;