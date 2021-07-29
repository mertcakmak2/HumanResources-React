import React, { useState, useEffect } from 'react';
import { Drawer, Form, Button, Col, Row, Input } from 'antd';

export default function CompanyInfoEdit({ visible, setVisible, oldEmployer, displayInfoAlert }) {

    const [employer, setEmployer] = useState({});

    useEffect(() => {
        setEmployer(oldEmployer)
    }, [oldEmployer])

    const updateCompanyInfo = () => {
        console.log(employer);
        //requesti burda at

    }

    return (
        <Drawer
            title="Bilgileri Düzenle"
            width={520}
            onClose={() => setVisible(false)}
            visible={visible}
            bodyStyle={{ paddingBottom: 80 }}
            footer={
                <div style={{ textAlign: 'right' }}>
                    <Button onClick={() => setVisible(false)} style={{ marginRight: 8 }}>
                        İptal
                    </Button>
                    <Button onClick={updateCompanyInfo} type="primary">
                        Kaydet
                    </Button>
                </div>
            } >
            <Form layout="vertical" hideRequiredMark>
                <Row gutter={24}>
                    <Col span={24}>
                        <Form.Item
                            label="Şirket Adı">
                            <Input value={employer.companyName} onChange={(e) => setEmployer({...employer, companyName:e.target.value})} placeholder="Şirket adını giriniz.." />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={24}>
                    <Col span={24}>
                        <Form.Item
                            label="Web Adresi">
                            <Input value={employer.companyWebSite} placeholder="Web sitesini giriniz.." />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={24}>
                        <Form.Item
                            label="Email Adresi">
                            <Input value={employer.email} placeholder="Email adresini giriniz.." />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={24}>
                        <Form.Item
                            label="Telefon Numarası">
                            <Input value={employer.mobilePhone} placeholder="Telefon numarasını giriniz.." />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Drawer>
    )
}
