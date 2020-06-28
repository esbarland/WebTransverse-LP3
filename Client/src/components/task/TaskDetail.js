import React, { Component } from 'react';
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import Status from "./Status";
import { useHistory } from "react-router-dom";

const GET_TASK = gql`
  query Task($id: ID!) {
    task(_id: $id) {
      _id
      name
      description
      duration
      status
    }
  }
`;

const REMOVE_TASK = gql`
  mutation deleteTask($id: ID!){
    deleteTask(_id: $id){
      name
    }
  }
`;

const ADD_TASK_TO_PROJECT = gql`
  mutation addTaskToProject($idProject: ID!, $idTask: ID!){
    addTaskToProject(_idProjet: $idProject, _idTask: $idTask){
      name
    }
  }
`;

function Task({ arg, id }) {
  const { loading, error, data } = useQuery(GET_TASK, {
    variables: { id }
  });
  const [removeTask] = useMutation(REMOVE_TASK);
  const [addProjectToTask] = useMutation(ADD_TASK_TO_PROJECT);
  var history = useHistory();

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  
  const task = data.task;
  let projectId;

  return (
    <div>
      <h5>Nom: {task.name}</h5>
      <h6>Description: {task.description}</h6>
      <h6>Durée: {task.duration}</h6>
      <Status status={task.status} />
      
      <button className="btn btn-danger mt-2" onClick={() => callMutationDeleteTask(removeTask, history, task._id)}>Supprimer cette tâche</button>

      <hr />

      <div>
        <div className="form-group">          
          <label>Id du projet:</label>
          <input className="form-control" ref={node => { projectId = node; }} />
        </div>
        <button className="btn btn-primary" onClick={() => callMutationAddTaskToProject(addProjectToTask, history, projectId.value, task._id)}>Ajouter cette tâche à un projet</button>
      </div>
    </div>
  );
}

function callMutationDeleteTask(removeProject, history, id) {
  removeProject({ variables: { id } });
  history.push('/tasks');
}

function callMutationAddTaskToProject(addTaskToProject, history, projectId, taskId) {
  addTaskToProject({ variables: { idProject: projectId, idTask: taskId } });
  history.push('/project/' + projectId.toString());
}

class TaskDetail extends Component {
    render() {
      return (
        <div>          
          <Link className="btn btn-danger text-white" to="/tasks">Retour</Link>
          <Task arg={this.props} id={this.props.match.params.id} />
        </div>
      );
    }
}

export default TaskDetail;