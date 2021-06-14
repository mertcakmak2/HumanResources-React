import React, { useState, useEffect } from 'react'
import JobService from '../../../services/jobService';
import JobAnnounceDescription from './components/JobAnnounceDescription';
import NoData from '../../../commonComponents/NoDataComponent';
import { Table, List, Avatar, Button, Skeleton } from 'antd';
import { Grid, Segment } from 'semantic-ui-react'

export default function JobAnnounceList() {

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            render: text => <a>{text}</a>,
        },
        {
            title: 'İş Açıklaması',
            dataIndex: 'jobDescription',
            key: 'jobDescription',
        },
        {
            title: 'Son Başvuru Tarihi',
            dataIndex: 'lastDateOfAppeal',
            key: 'lastDateOfAppeal',
        },
        {
            title: 'Şehir',
            dataIndex: 'city',
            key: 'city',
        },
        {
            title: 'Minumum Maaş',
            dataIndex: 'minSalary',
            key: 'minSalary',
        },
        {
            title: 'Maxiumum Maaş',
            dataIndex: 'maxSalary',
            key: 'maxSalary',
        },
        {
            title: 'Pozisyona Alınacak Kişi Sayısı',
            dataIndex: 'positionCount',
            key: 'positionCount',
        }
    ]
    const data = [
        {
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 2',
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
        },
        {
            title: 'Ant Design Title 4',
        },
        {
            title: 'Ant Design Title 4',
        },
        {
            title: 'Ant Design Title 4',
        },
        {
            title: 'Ant Design Title 4',
        },
    ];

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        let jobService = new JobService();
        jobService.findAllActiveJobsBySortingDate().then(response => {
            if (response.status === 200 && response.data.success)
                setJobs(response.data.data)
        })
    }, [])

    return (
        <div style={{ textAlign: 'center' }}>
            {/* <h2>Job List</h2> */}
            {/* {jobs.length
                ? <Table columns={columns} dataSource={jobs} />
                : <NoData />
            } */}
            <Grid columns={2} divided>
                <Grid.Row stretched>
                    <Grid.Column width={7}>
                        <Segment style={{ height: '40em', overflowY: 'scroll' }}>

                            <List
                                itemLayout="horizontal"
                                dataSource={data}
                                renderItem={item => (
                                    <List.Item actions={[<Button onClick={() => alert(item.title)} danger>Görüntüle</Button>]}>
                                        <List.Item.Meta
                                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                            title={<a href="https://ant.design">{item.title}</a>}
                                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                        />
                                    </List.Item>
                                )}
                            />
                        </Segment>

                    </Grid.Column>
                    <Grid.Column width={9} >
                        <Segment>
                            <JobAnnounceDescription />
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}
