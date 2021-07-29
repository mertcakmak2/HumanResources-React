import React from 'react'
import { Table, Space, Button } from 'antd';

export default function CompanyJobList({jobs}) {

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'İlan Açıklaması',
            dataIndex: 'jobDescription',
            key: 'jobDescription',
        },
        {
            title: 'İlan Açıklaması',
            dataIndex: 'jobDescription',
            key: 'jobDescription',
        },
        {
            title: 'Pozisyon',
            dataIndex: 'jobPosition',
            key: 'jobPosition',
        },
        {
            title: 'İlan Tarihi',
            dataIndex: 'announceDate',
            key: 'announceDate',
        }, 
        {
            title: 'Son Başvuru Tarihi',
            dataIndex: 'lastDateOfAppeal',
            key: 'lastDateOfAppeal',
        },    
        {
            title: 'Aksiyon',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="link">Düzenle</Button>
                </Space>
            ),
        },
    ];
    return (
        <div>
            <Table columns={columns} dataSource={jobs} />
        </div>
    )
}
