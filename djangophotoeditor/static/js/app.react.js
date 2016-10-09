import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { render } from 'react-dom';

import FolderDashboard from './components/folderdashboard.jsx';
import PhotoDashboard from './components/photodashboard.jsx';
import Home from './components/home.jsx';
import Main from './components/main.jsx';
import SingleFolder from './components/singlefolder.jsx';
import SinglePhoto from './components/singlephoto.jsx';
const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
        <IndexRoute component={Home} history={browserHistory}/>
        <Route path="dashboard/folders" component={FolderDashboard}/>
        <Route path="dashboard/photos" component={PhotoDashboard}/>
        <Route path="folder/:folderId" component={SingleFolder}/>
        <Route path="/photo/:photoId" component={SinglePhoto}/>
    </Route>
  </Router>);

render(routes, document.getElementById('app'));
