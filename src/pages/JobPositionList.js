import React, { useEffect, useState } from 'react'
import JobPositionService from '../services/jobPositionService';
import NoData from '../commonComponents/NoDataComponent';
import { Table} from 'antd';

export default function JobPositionList() {

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            // render: text => <a>{text}</a>,
        },
        {
            title: 'Pozisyon',
            dataIndex: 'positionName',
            key: 'positionName',
        }
    ]

    const [jobPositions, setJobPositions] = useState([]);

    useEffect(() => {
        let jobPositionService = new JobPositionService();
        jobPositionService.findAllJobPositions().then(response => {
            if (response.status === 200 && response.data.success)
                setJobPositions(response.data.data);
        })
    },[])

    return (
        <div style={{textAlign:'center'}}>
            <h2>Job Position List</h2>
            { jobPositions.length 
                ? <Table columns={columns} dataSource={jobPositions} /> 
                : <NoData/>    
            }
        </div>
    )
}
