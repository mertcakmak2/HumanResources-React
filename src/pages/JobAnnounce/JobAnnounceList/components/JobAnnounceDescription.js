import React from 'react'
import { PageHeader, Button, Tag, Typography, Row } from 'antd';
import { CheckOutlined, SaveOutlined } from '@ant-design/icons';

const { Paragraph } = Typography;


const content = (
    <>
        <Paragraph>
            Ant Design interprets the color system into two levels: a system-level color system and a
            product-level color system.
        </Paragraph>
        <Paragraph>
            Ant Design&#x27;s design team preferred to design with the HSB color model, which makes it
            easier for designers to have a clear psychological expectation of color when adjusting colors,
            as well as facilitate communication in teams.
        </Paragraph>
    </>
);

const Content = ({ children, extraContent }) => (
    <Row>
        <div style={{ flex: 1 }}>{children}</div>
        <div className="image">{extraContent}</div>
    </Row>
);

export default function JobAnnounceDescription() {
    return (
        <div>
            <PageHeader
                title="Title"
                className="site-page-header"
                subTitle="This is a subtitle"
                tags={<Tag color="blue">Running</Tag>}
                extra={[
                    <Button key="2" icon={<SaveOutlined />}>Kaydet</Button>,
                    <Button key="1" type="primary" icon={<CheckOutlined/>}>
                        Başvur
                    </Button>,
                ]}
                avatar={{ src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4' }}
            >
                <Content
                    extraContent={
                        <img
                            src="https://gw.alipayobjects.com/zos/antfincdn/K%24NnlsB%26hz/pageHeader.svg"
                            alt="content"
                            width="100%"
                        />
                    }
                >
                    {content}
                </Content>
            </PageHeader>
        </div>
    )
}
