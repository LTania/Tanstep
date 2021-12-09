import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import TaskList from './components/taskList/taskList';
import StartingTest from './components/startingTest/StartingTest';
import RequirementsTask from './components/requirementsTask/RequirementsTask';
import Authorization from './components/account/Authorization';
import RequireAuth from './components/RequireAuth';
import PoorWords from './components/poorWords/poorWords';
import UserProfile from './components/userProfile/userProfile';

import './custom.css'

export default () => (
  <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/tasks' component={RequireAuth(TaskList) as any} />
    <Route path='/test' component={RequireAuth(StartingTest) as any} />
    <Route path='/requirements-task' component={RequireAuth(RequirementsTask) as any} />
    <Route path='/authorization' component={Authorization} />
    <Route path='/poorwords-task' component={RequireAuth(PoorWords)} />
    <Route path='/profile' component={RequireAuth(UserProfile)} />
  </Layout>
);
