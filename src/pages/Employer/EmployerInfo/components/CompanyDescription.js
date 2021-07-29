import React from 'react'
import { Descriptions } from 'antd';


export default function CompanyDescription({employer}) {
    return (
        <Descriptions
            bordered>

            <Descriptions.Item label="Şirket Adı" span={3}>{employer.companyName}</Descriptions.Item>
            <Descriptions.Item label="Web Sitesi" span={3}>{employer.companyWebSite}</Descriptions.Item>
            <Descriptions.Item label="Email Adresi" span={3}>{employer.email}</Descriptions.Item>
            <Descriptions.Item label="Gsm" span={3}>{employer.mobilePhone}</Descriptions.Item>

        </Descriptions>
    )
}
