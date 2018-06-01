import React, { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';

import Header from './components/Header';
import Projects from './components/Projects';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      actions: [],
    }
  }

  getProjects = () => {
    return axios.get('http://localhost:5212/api/project')
  }
  getActions = () => {
    return axios.get('http://localhost:5212/api/action')
  }

  componentDidMount() {
    axios.all([this.getProjects(), this.getActions()])
      .then(axios.spread((projects, actions) => {
        this.setState(() => ({
          projects: projects.data,
          actions: actions.data
        }))
      }))
  }

  render() {
    return (
      <div className="App container">
        <Header />
        <p className="App-intro">
          Click one of the 2 links in the nav bar. / is not created yet.
        </p>
        <Route path="/projects" render={() => <Projects projects={this.state.projects}/>}/>
        <Route path="/actions" render={() => <Projects projects={this.state.actions} />}/>
      </div>
    );
  }
} 

export default App;
