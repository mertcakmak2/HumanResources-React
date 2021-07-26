import React from 'react'
import { Route, Switch } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import { Suspense } from 'react';
import { Spin } from 'antd';

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

export default function Dashboard() {
    return (
        <div>
            <Suspense fallback={<Spin spinning={true} delay={500}> </Spin>} >
                <Switch>
                    <Route exact path="/" component={HomePage} />

                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />

                    <Route path="/account" component={Account} />

                    <Route path="/employer-list" component={EmployerList} />

                    <Route path="/job-add" component={JobAdd} />
                    <Route path="/job-list" component={JobList} />

                    <Route path="/job-position-list" component={JobPositionList} />

                    <Route path="/job-seeker-list" component={JobSeekerList} />
                    <Route path="/job-seeker/:id/resume" component={Resume} />

                    <Route path="/system-user/:id" component={SystemUserInfo} />

                    <Route path="*">
                        <NotFound />
                    </Route>
                </Switch>

            </Suspense>
        </div>
    )
}
