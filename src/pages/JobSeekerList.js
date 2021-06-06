import React, { useState, useEffect } from 'react'
import JobSeekerService from "../services/jobSeekerService"
import { Header, Image, Table } from 'semantic-ui-react'

export default function JobSeekerList() {

    const [jobSeekers, setJobSeekers] = useState([])

    useEffect(() => {
        let jobSeekersService = new JobSeekerService();
        jobSeekersService.findAllJobSeekers().then(response => {
            console.log(response);
            if (response.status === 200 && response.data.success)
                setJobSeekers(response.data.data)
        })
    }, [])

    return (
        <div>
            <Table basic='very' celled collapsing>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>İş Arayan</Table.HeaderCell>
                        <Table.HeaderCell>Telefon Numarası</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {jobSeekers.map(jobSeeker => (
                        <Table.Row key={jobSeeker.id}>
                            <Table.Cell>
                                <Header as='h4' image>
                                    <Image src='https://react.semantic-ui.com/images/avatar/small/lena.png' rounded size='mini' />
                                    <Header.Content>
                                        {jobSeeker.email}
                                        <Header.Subheader>{jobSeeker.firstName + " " + jobSeeker.lastName}</Header.Subheader>
                                    </Header.Content>
                                </Header>
                            </Table.Cell>
                        
                            <Table.Cell>{jobSeeker.mobilePhone}</Table.Cell>
                        </Table.Row>
                    ))}

                </Table.Body>
            </Table>
        </div>
    )
}
