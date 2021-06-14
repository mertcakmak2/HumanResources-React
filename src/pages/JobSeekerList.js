import React, { useState, useEffect } from 'react'
import JobSeekerService from "../services/jobSeekerService"
import NoData from '../commonComponents/NoDataComponent';
import { Table} from 'antd';

export default function JobSeekerList() {

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Ad',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Soyad',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Telefon',
            dataIndex: 'mobilePhone',
            key: 'mobilePhone',
        }
    ]

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
        <div style={{textAlign:'center'}}>
            <h2>Job Seeker List</h2>
            { jobSeekers.length 
                ? <Table columns={columns} dataSource={jobSeekers} /> 
                : <NoData/>    
            }
        </div>
    )
}
