import React, { useEffect, useState } from 'react'
import { Container, Menu, Segment, Icon } from "semantic-ui-react";
import SignedIn from './SignedIn';
import SignedOut from './SignedOut';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthenticate } from '../store/actions/authenticateActions';
import { setUser } from '../store/actions/userActions';

export default function NavigationBar() {

    const history = useHistory();

    const isAuthenticated = useSelector(state => state.isAuthenticate)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch();

    const [activeMenuItem, setActiveMenuItem] = useState(history.location.pathname)
    const [isEmployer, setIsEmployer] = useState(false)

    useEffect(() => {
        setIsEmployer(user.userType == "employer" ? true : false)
    }, [user])

    function handleSignOut() {
        localStorage.removeItem("jwt")
        localStorage.removeItem("user")
        dispatch(setAuthenticate(false));
        dispatch(setUser({}))
        history.push("/login")
    }

    function handleSignIn() {
        history.push("/login")
    }

    function handleRegister() {
        history.push("/register")
    }

    function onNavigate(route) {
        setActiveMenuItem(route);
        if (!isAuthenticated) localStorage.setItem("hash", route);
        history.push(route);
    }

    return (
        <div style={{ background: "white" }}>
            <Segment inverted>
                <Menu inverted secondary>
                    <Container>
                        <Menu.Item active={activeMenuItem === "/"} key="/" onClick={() => onNavigate("/")} >
                            <Icon name='home' />
                            Anasayfa
                        </Menu.Item>
                        <Menu.Item active={activeMenuItem === "/job-list"} key="/job-list" onClick={() => onNavigate("/job-list")}>
                            <Icon name='list alternate' />
                            İş İlanları
                        </Menu.Item>
                        <Menu.Item active={activeMenuItem === "/employer-list"} key="/employer-list" onClick={() => onNavigate("/employer-list")} >
                            <Icon name='factory' />
                            İş Verenler
                        </Menu.Item>
                        <Menu.Item active={activeMenuItem === "/job-seeker-list"} key="/job-seeker-list" onClick={() => onNavigate("/job-seeker-list")} >
                            <Icon name='users' />
                            İş Arayanlar
                        </Menu.Item>
                        {isEmployer 
                            ? <Menu.Item active={activeMenuItem === "/job-add"} key="/job-add" onClick={() => onNavigate("/job-add")}>
                                <Icon name='announcement' />
                                İş İlanı Yayınla
                              </Menu.Item>
                            : null
                        }
                        <Menu.Menu position="right">

                            {isAuthenticated
                                ? <SignedIn signOut={handleSignOut} />
                                : <SignedOut signIn={handleSignIn} register={handleRegister} />}

                        </Menu.Menu>
                    </Container>
                </Menu>
            </Segment>

        </div>
    )
}
