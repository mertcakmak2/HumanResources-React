import React from 'react'
import { Grid } from "semantic-ui-react";
import EmployerList from '../pages/EmployerList';
import JobSeekerList from '../pages/JobSeekerList';


export default function Dashboard() {
    return (
        <div>
            <Grid>
                
                <Grid.Row>
                    <Grid.Column width={16}>
                        <EmployerList></EmployerList>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={16}>
                        <JobSeekerList></JobSeekerList>
                    </Grid.Column>
                </Grid.Row>
                
            </Grid>
        </div>
    )
}
