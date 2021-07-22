import React from 'react'
import { Form, Input, Button, Checkbox, Select } from 'antd';
import { Card, Grid } from 'semantic-ui-react'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
const { Option } = Select;

export default function Login() {

    const handleUserTypeChange = (type) => {
        if(type) alert(type)
    }

    return (
        <Grid centered columns={3}>
            <Grid.Column>
                <Card fluid color='red' header='Giriş Yap'>
                    <Card.Content>
                        <Card.Header>Giriş Yap</Card.Header>
                    </Card.Content>
                    <Card.Content>
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}>

                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Username!',
                                    },
                                ]}
                            >

                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Password!',
                                    },
                                ]}
                            >
                                <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Şifre" />

                            </Form.Item>

                            <Form.Item>
                                <Select onChange={handleUserTypeChange} style={{ width: 120 }} allowClear>
                                    <Option value="jobSeeker">İş Arayan</Option>
                                    <Option value="employer">İş Veren</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>Beni hatırla</Checkbox>
                                </Form.Item>

                                <a className="login-form-forgot">Şifremi Unuttum</a>
                            </Form.Item>

                            <Form.Item>
                                <Button style={{marginRight:"3px"}} type="primary" className="login-form-button"> Giriş Yap </Button>
                                veya <a href="">Hemen kaydol!</a>
                            </Form.Item>
                        </Form>
                    </Card.Content>
                </Card>
            </Grid.Column>
        </Grid>


    );
}
