import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Checkbox, Select, Alert } from 'antd';
import { Card, Grid } from 'semantic-ui-react'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import AuthService from '../../services/authService';
import EmployerService from '../../services/employerService';
import JobSeekerService from '../../services/jobSeekerService';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthenticate } from "../../store/actions/authenticateActions";
import { setUser } from "../../store/actions/userActions";
import { useHistory } from 'react-router-dom';
const { Option } = Select;

export default function Login() {

    let authService = new AuthService();
    let employerService = new EmployerService();
    let jobSeekerService = new JobSeekerService();

    const isAuthenticate = useSelector(state => state.isAuthenticate)
    const dispatch = useDispatch();
    const history = useHistory();

    const [loginInfo, setLoginInfo] = useState({ email: "", password: "", type: "" })
    const [loginError, setLoginError] = useState(false);

    useEffect(() => {
        if (isAuthenticate) history.push("/")
    })

    const handleUserTypeChange = (type) => {
        setLoginInfo({ ...loginInfo, type })
    }

    const login = () => {

        if( !loginInfo.type ){
            alert("Kullanıcı tipi zorunludur..")
            return
        }
         

        authService.login(loginInfo).then(response => {
            if (response.data && response.status === 200) {
                localStorage.setItem("jwt", response.data)
                var getUser = loginInfo.type === "employer"
                    ? employerService.findEmployerByEmail(loginInfo.email)
                    : jobSeekerService.findJobSeekerByEmail(loginInfo.email);
                getUser.then(userResponse => {
                    if (userResponse.data.success && userResponse.status === 200) {
                        dispatch(setAuthenticate(true))
                        dispatch(setUser({...userResponse.data.data, userType: loginInfo.type}))
                        localStorage.setItem("user", JSON.stringify({ ...userResponse.data.data, userType: loginInfo.type }))
                        history.push(localStorage.getItem("hash") ? localStorage.getItem("hash") : "/")
                        localStorage.removeItem("hash")
                    } else {
                        localStorage.removeItem("jwt")
                        setLoginError(true)
                    }
                })
            } else setLoginError(true);
        })
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
                                rules={[{
                                    required: true,
                                    message: 'Please input your Username!',
                                }]}>

                                <Input value={loginInfo.email} onChange={(e) => setLoginInfo({ ...loginInfo, email: e.target.value })} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[{
                                    required: true,
                                    message: 'Please input your Password!',
                                }]}>
                                <Input.Password value={loginInfo.password} onChange={(e) => setLoginInfo({ ...loginInfo, password: e.target.value })} prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Şifre" />

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
                                <Button onClick={login} style={{ marginRight: "3px" }} type="primary" className="login-form-button"> Giriş Yap </Button>
                                veya <a href="">Hemen kaydol!</a>
                            </Form.Item>
                        </Form>
                        {loginError ? <Alert
                            message="Hata"
                            description="Kullanıcı adı, şifre yada kullanıcı tipi hatalı."
                            type="error"
                            showIcon
                        /> : null
                        }
                    </Card.Content>
                </Card>
            </Grid.Column>
        </Grid>


    );
}
