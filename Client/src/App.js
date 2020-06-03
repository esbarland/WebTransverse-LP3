import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import './style/style.scss';

import HomePage from "./components/basic/HomePage";
import Navbar from "./components/basic/Navbar";
import ProjectList from "./components/project/ProjectList";
import ProjectDetail from "./components/project/ProjectDetail";
import TaskList from "./components/task/TaskList";
import TaskDetail from "./components/task/TaskDetail";
import UserPage from "./components/user/UserPage";

class App extends Component {

    render() {
      return (
        <div>
          <Navbar />

          <div className="container">
            <Switch>
              <Route path="/home">
                <HomePage />
              </Route>
              <Route path="/user/:id">
                <UserPage />
              </Route>
              <Route path="/tasks">
                <TaskList />
              </Route>
              <Route path="/task/:id">
                <TaskDetail />
              </Route>
              <Route path="/projects/">
                <ProjectList />
              </Route>
              <Route path="/project/:id">
                <ProjectDetail />
              </Route>
            </Switch> 
          </div>

        </div>

      );
    }
}

export default App;