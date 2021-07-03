import React from 'react'
import { Route } from 'react-router';
import HomePage from '../pages/HomePage';
import EmployerList from '../pages/EmployerList';
import JobList from '../pages/JobAnnounce/JobAnnounceList/JobAnnounceList';
import JobPositionList from '../pages/JobPositionList';
import JobSeekerList from '../pages/JobSeekerList';
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register';
import JobAdd from '../pages/JobAnnounce/JobAnnounceAdd/JobAnnounceAdd';
import Resume from '../pages/Resume/Resume';

export default function Dashboard() {
    return (
        <div>
            <Route exact path="/" component={HomePage} />

            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />

            <Route path="/employer-list" component={EmployerList} />
            <Route path="/job-list" component={JobList} />
            <Route path="/job-position-list" component={JobPositionList} />
            <Route path="/job-seeker-list" component={JobSeekerList} />
            <Route path="/job-add" component={JobAdd} />
            <Route path="/job-seeker/:id/resume" component={Resume} />
           
        </div>
    )
}
