import React, { useEffect, useState } from 'react'
import EmployerService from '../services/employerService'
import NoData from '../commonComponents/NoDataComponent';
import { Table, Space, Button } from 'antd';

export default function EmployerList() {

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
        },
        {
            title: 'Aksiyon',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="link">İletişim</Button>
                </Space>
            ),
        },
    ];

    const [employers, setEmployers] = useState([])

    useEffect(() => {
        let employerService = new EmployerService();
        employerService.findAllEmployers().then(response => {
            console.log(response);
            if (response.status === 200 && response.data.success)
                setEmployers(response.data.data)
        })
    }, [])

    return (
        <div style={{ textAlign: 'center' }}>
            <h2>Employer List</h2>
            {employers.length
                ? <Table columns={columns} dataSource={employers} />
                : <NoData />
            }
        </div>
    )
}
