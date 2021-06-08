import React, { useState, useEffect } from 'react'
import JobService from '../services/jobService';
import NoData from '../commonComponents/NoDataComponent';
import { Table} from 'antd';

export default function JobList() {

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

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        let jobService = new JobService();
        jobService.findAllActiveJobsBySortingDate().then(response => {
            if (response.status === 200 && response.data.success)
                setJobs(response.data.data)
        })
    }, [])

    return (
        <div>
           <h2>Job List</h2>
            { jobs.length 
                ? <Table columns={columns} dataSource={jobs} /> 
                : <NoData/>    
            }
        </div>
    )
}
