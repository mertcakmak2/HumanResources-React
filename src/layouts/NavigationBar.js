import React, { useState } from 'react'
import { Container, Menu, Segment, Icon } from "semantic-ui-react";
import SignedIn from './SignedIn';
import SignedOut from './SignedOut';
import { useHistory } from 'react-router-dom';

export default function NavigationBar() {

    const history = useHistory();

    const [isAuthenticated, setIsAuthenticated] = useState(true)
    const [activeMenuItem, setActiveMenuItem] = useState(history.location.pathname)

    function handleSignOut() {
        setIsAuthenticated(false);
    }

    function handleSignIn() {
        setIsAuthenticated(true);
    }

    function onNavigate(route) {
        setActiveMenuItem(route);
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
                        <Menu.Item active={activeMenuItem === "/job-add"} key="/job-add" onClick={() => onNavigate("/job-add")}>
                            <Icon name='announcement' />
                                İş İlanı Yayınla
                        </Menu.Item>

                        <Menu.Menu position="right">

                            {isAuthenticated ? <SignedIn signOut={handleSignOut} /> : <SignedOut signIn={handleSignIn} />}

                        </Menu.Menu>
                    </Container>
                </Menu>
            </Segment>

        </div>
    )
}
