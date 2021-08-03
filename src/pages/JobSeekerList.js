import React, { useState, useEffect } from 'react'
import JobSeekerService from "../services/jobSeekerService"
import NoData from '../commonComponents/NoDataComponent';
import { Table, Space, Button, Spin } from 'antd';
import { useHistory } from 'react-router-dom';

export default function JobSeekerList() {

    const history = useHistory();

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            // render: text => <a>{text}</a>,
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
        },
        {
            title: 'Aksiyon',
            key: 'action',
            render: (jobSeeker) => (
                <Space size="middle">
                    <Button onClick={() => displayJobSeeker(jobSeeker.id)} type="link">İletişim</Button>
                </Space>
            ),
        },
    ]

    const [jobSeekers, setJobSeekers] = useState([])

    function displayJobSeeker(jobSeekerId) {
        history.push("/job-seeker/" + jobSeekerId + "/resume")
    }

    useEffect(() => {
        let jobSeekersService = new JobSeekerService();
        jobSeekersService.findAllJobSeekers().then(response => {
            if (response.status === 200 && response.data.success) {
                response.data.data.map(x => x.key = x.id)
                setJobSeekers(response.data.data)
            }
        })
    }, [])

    return (
        <div style={{ textAlign: 'center' }}>
            <h2>Job Seeker List</h2>
            <Spin tip="Loading..." spinning={!jobSeekers.length}>
                {jobSeekers.length
                    ? <Table columns={columns} dataSource={jobSeekers} />
                    : <NoData />
                }
            </Spin>
        </div>
    )
}
