import React, { useEffect, useState } from 'react'
import EmployerService from '../services/employerService'
import { Header, Image, Table } from 'semantic-ui-react'

export default function EmployerList() {

    const [employers, setEmployers] = useState([])

    useEffect(() => {
        let employerService = new EmployerService();
        employerService.findAllEmployers().then(response => {
            console.log(response);
            if(response.status === 200 && response.data.success) 
                setEmployers(response.data.data)
        })
    }, [])

    return (
        <div>
            <Table basic='very' celled collapsing>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>İş Veren</Table.HeaderCell>
                        <Table.HeaderCell>Şirket</Table.HeaderCell>
                        <Table.HeaderCell>Şirket Web Sitesi</Table.HeaderCell>
                        <Table.HeaderCell>Telefon Numarası</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {employers.map(employer =>(
                        <Table.Row key={employer.id}>
                        <Table.Cell>
                            <Header as='h4' image>
                                <Image src='https://react.semantic-ui.com/images/avatar/small/lena.png' rounded size='mini' />
                                <Header.Content>
                                    {employer.email}
                                <Header.Subheader>{employer.firstName + " " + employer.lastName}</Header.Subheader>
                                </Header.Content>
                            </Header>
                        </Table.Cell>

                        <Table.Cell>{employer.companyName}</Table.Cell>

                        <Table.Cell>{employer.companyWebSite}</Table.Cell>

                        <Table.Cell>{employer.mobilePhone}</Table.Cell>
                    </Table.Row>
                    ))}
                    
                </Table.Body>
            </Table>
        </div>
    )
}
