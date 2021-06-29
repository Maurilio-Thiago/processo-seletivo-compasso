import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import MainPage from '../pages/MainPage/MainPage';

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route>
            <ErrorPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default Router;