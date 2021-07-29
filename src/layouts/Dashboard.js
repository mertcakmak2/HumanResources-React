import React from 'react'
import { Route, Switch } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import { Suspense } from 'react';
import { Spin } from 'antd';
import PrivateRoute from '../privateRoute/PrivateRoute';

const EmployerList = React.lazy(() => import("../pages/EmployerList"))
const JobList = React.lazy(() => import("../pages/JobAnnounce/JobAnnounceList/JobAnnounceList"))
const JobPositionList = React.lazy(() => import("../pages/JobPositionList"))
const JobSeekerList = React.lazy(() => import("../pages/JobSeekerList"))
const Login = React.lazy(() => import("../pages/Login/Login"))
const Register = React.lazy(() => import("../pages/Register/Register"))
const JobAdd = React.lazy(() => import("../pages/JobAnnounce/JobAnnounceAdd/JobAnnounceAdd"))
const Resume = React.lazy(() => import("../pages/Resume/Resume"))
const SystemUserInfo = React.lazy(() => import("../pages/SystemUser/SystemUserInfo"))
const NotFound = React.lazy(() => import('../pages/NotFound/NotFound'))
const Account = React.lazy(() => import('../pages/Account/Account'))
const EmployerInfo = React.lazy(() => import('../pages/Employer/EmployerInfo/EmployerInfo'));

export default function Dashboard() {
    return (
        <div>
            <Suspense fallback={<Spin spinning={true} delay={500}> </Spin>} >
                <Switch>
                    
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/account" component={Account} />

                    {/* Authenticate Required */}
                    <PrivateRoute exact path="/">
                        <HomePage />
                    </PrivateRoute>

                    <PrivateRoute path="/employer-list">
                        <EmployerList />
                    </PrivateRoute>

                    <PrivateRoute path="/employer/:id">
                        <EmployerInfo />
                    </PrivateRoute>

                    <PrivateRoute path="/job-add">
                        <JobAdd />
                    </PrivateRoute>

                    <PrivateRoute path="/job-list">
                        <JobList />
                    </PrivateRoute>

                    <PrivateRoute path="/job-position-list">
                        <JobPositionList />
                    </PrivateRoute>

                    <PrivateRoute path="/job-seeker-list">
                        <JobSeekerList />
                    </PrivateRoute>

                    <PrivateRoute path="/job-seeker/:id/resume">
                        <Resume />
                    </PrivateRoute>

                    <PrivateRoute path="/system-user/:id">
                        <SystemUserInfo />
                    </PrivateRoute>

                    <Route path="*">
                        <NotFound />
                    </Route>

                </Switch>

            </Suspense>
        </div>
    )
}
