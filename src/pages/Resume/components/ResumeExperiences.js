import React from 'react'
import { Table, Tag, Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const columns = [
    {
        title: 'Şirket Adı',
        key: 'companyName',
        dataIndex: 'companyName',
        render: companyNames => (
            <>
                {companyNames.map(companyName => {
                    let color = companyName.length > 6 ? 'geekblue' : 'green';
                    if (companyName === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={companyName}>
                            {companyName.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title:"Pozisyon",
        key:"position",
        dataIndex:"position"
    },
    {
        title:"Başlangıç Tarihi",
        key:"beginDate",
        dataIndex:"beginDate"
    },
    {
        title:"Bitiş Tarihi",
        key:"endDate",
        dataIndex:"endDate"
    },
    {
        title: '',
        key: 'İşlemler',
        render: (text, record) => (
            <div>
                <Button type="primary" danger shape="circle" icon={<DeleteOutlined />} />
                <Button type="primary" shape="circle" icon={<EditOutlined />} style={{marginLeft:"5px"}} />
            </div>
        ),
    },
];

const data = [
    {
        key: '1',
        companyName: ['Detaysoft'],
        position:"developer",
        beginDate:"2020-02-15",
        endDate:"Devam ediyor"
    },
    {
        key: '2',
        companyName: ['Trendyol'],
        position:"developer2",
        beginDate:"2020-02-15",
        endDate:"2020-02-15"
    },
    {
        key: '3',
        companyName: ['Ziraat Bankası'],
        position:"developer3",
        beginDate:"2020-02-15",
        endDate:"2020-02-15"
    },
];

export default function ResumeExperiences() {
    return (
        <div>
            <Table columns={columns} dataSource={data} pagination={false} scroll={{ x: 400, y: 220 }} />

        </div>
    )
}
