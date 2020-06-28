import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import './style/style.scss';

import HomePage from "./components/basic/HomePage";
import Navbar from "./components/basic/Navbar";
import ProjectList from "./components/project/ProjectList";
import ProjectDetail from "./components/project/ProjectDetail";
import ProjectForm from "./components/project/ProjectForm";
import TaskList from "./components/task/TaskList";
import TaskDetail from "./components/task/TaskDetail";
import TaskForm from "./components/task/TaskForm";
import UserPage from "./components/user/UserPage";
import UserForm from "./components/user/UserForm";
import UserLogin from "./components/user/UserLogin";

class App extends Component {

    render() {
      return (
        <div>
          <Navbar />

          <div className="container">
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route exact path="/user/:id">
                <UserPage />
              </Route>
              <Route exact path="/tasks">
                <TaskList />
              </Route>
              <Route path="/task/:id" component={TaskDetail}></Route>
              <Route path="/tasks/form">
                <TaskForm />
              </Route>
              <Route exact path="/projects/">
                <ProjectList />
              </Route>
              <Route path="/project/:id" component={ProjectDetail}></Route>
              <Route path="/projects/form">
                <ProjectForm />
              </Route>
              <Route path="/users/add">
                <UserForm />
              </Route>
              <Route path="/users/login">
                <UserLogin />
              </Route>
            </Switch> 
          </div>

        </div>

      );
    }
}

export default App;