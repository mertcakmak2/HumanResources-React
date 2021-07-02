import React from 'react'
import { Table, Tag, Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const columns = [
    {
        title: 'Dil',
        key: 'languages',
        dataIndex: 'languages',
        render: languages => (
            <>
                {languages.map(language => {
                    let color = language.length > 6 ? 'geekblue' : 'green';
                    if (language === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={language}>
                            {language.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title:"Seviye",
        key:"level",
        dataIndex:"level"
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
        languages: ['ingilizce'],
        level:3
    },
    {
        key: '2',
        languages: ['almanca'],
        level:1
    },
    {
        key: '3',
        languages: ['ispanyolca'],
        level:5
    },
];

export default function ResumeLanguages() {
    return (
        <div>
            <Table columns={columns} dataSource={data} pagination={false} scroll={{ x: 400, y: 220 }} />
        </div>
    )
}
