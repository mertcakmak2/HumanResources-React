import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import EmployerConfirm from './nestedPages/EmployerConfirm';
import JobSeekerConfirm from './nestedPages/JobSeekerConfirm';

export default function Account() {

    let { path } = useRouteMatch();

    return (
        <div>
            <Switch>
                <Route exact path={path}>
                    account js
                </Route>

                <Route path={path + "/employer/confirm"} component={EmployerConfirm} />
                <Route path={path + "/job-seeker/confirm"} component={JobSeekerConfirm} />
            </Switch>
        </div>
    )
}
