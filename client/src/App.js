import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

const App = () => (
  <BrowserRouter>
    <Container maxWidth="xl">
      <Navbar />
      <Switch>
        {/* CALLBACK FUNCTION TO REDIRECT USER WHEN HE GOES TO / */}
        <Route path="/" exact component={() => <Redirect to="/posts"/>} />
        <Route path="/posts" exact component={Home} />
        {/* WHEN USER SEARCHES  */}
        <Route path="/posts/search" exact component={Home} />
        {/* POSTS DETAILS USING ID */}
        <Route path="/posts/:id" component={PostDetails} />
        <Route path="/auth" exact component={Auth} />
      </Switch>
    </Container>
  </BrowserRouter>
);

export default App;
