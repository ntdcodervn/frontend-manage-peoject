import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import MemberManage from './pages/MemberManage';
import ProjectMember from './pages/ProjectManage';
import ProjectDetail from './pages/ProjectDetail';
import Page404 from './pages/404';
import Navbar from './components/Navbar';
import ReactNotification from 'react-notifications-component'

function App(props) {
    return (
        <Router>
             <ReactNotification />
            <Navbar></Navbar>
             <div>
            <Switch>
                
            
           
                    <Route exact path={["/",'/projectManage']}>
                        <ProjectMember />
                    </Route>
                    <Route path="/memberManage">
                        <MemberManage />
                    </Route>
                    <Route path="/projectDetail/:id">
                        <ProjectDetail />
                    </Route>
                    <Route path="*">
                        <Page404></Page404>
                    </Route>
            
            
            </Switch>
            </div>
        </Router>
    );
}

export default App;