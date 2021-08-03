import React, { useEffect, useState } from 'react'
import EmployerService from '../services/employerService'
import NoData from '../commonComponents/NoDataComponent';
import { Table, Space, Button, Spin } from 'antd';
import { Link } from 'react-router-dom';

export default function EmployerList() {

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
            render: (employer) => (
                <Space size="middle">
                    <Link to={"/employer/"+employer.id}><Button type="link">İletişim</Button></Link>
                </Space>
            ),
        },
    ];

    const [employers, setEmployers] = useState([])

    useEffect(() => {
        let employerService = new EmployerService();
        employerService.findAllEmployers().then(response => {
            if (response.status === 200 && response.data.success){
                response.data.data.map(x => x.key = x.id)
                setEmployers(response.data.data)
            }
        })
    }, [])

    return (
        <div style={{ textAlign: 'center' }}>
            <h2>Employer List</h2>

            <Spin tip="Loading..." spinning={!employers.length}>
                {employers.length
                    ? <Table columns={columns} dataSource={employers} />
                    : <NoData />
                }
            </Spin>
        </div>
    )
}
