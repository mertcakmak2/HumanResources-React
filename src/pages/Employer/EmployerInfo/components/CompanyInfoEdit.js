import React, { useState, useEffect } from 'react';
import { Drawer, Form, Button, Col, Row, Input } from 'antd';

export default function CompanyInfoEdit({ visible, setVisible, employerCompany, updateEmployerCompany }) {

    const [employer, setEmployer] = useState({});

    useEffect(() => {
        setEmployer(employerCompany)
    }, [employerCompany])

    const updateCompanyInfo = () => updateEmployerCompany(employer)

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
                            <Input value={employer.companyWebSite} onChange={(e) => setEmployer({...employer, companyWebSite:e.target.value})} placeholder="Web sitesini giriniz.." />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={24}>
                        <Form.Item
                            label="Email Adresi">
                            <Input value={employer.email} onChange={(e) => setEmployer({...employer, email:e.target.value})} placeholder="Email adresini giriniz.." />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Drawer>
    )
}
