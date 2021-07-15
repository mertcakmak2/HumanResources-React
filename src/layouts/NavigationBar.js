import React, { useState } from 'react'
import { Container, Menu } from "semantic-ui-react";
import SignedIn from './SignedIn';
import SignedOut from './SignedOut';
import { useHistory } from 'react-router-dom';

export default function NavigationBar() {

    const history = useHistory();

    const [isAuthenticated, setIsAuthenticated] = useState(true)

    function handleSignOut() {
        setIsAuthenticated(false);
    }

    function handleSignIn() {
        setIsAuthenticated(true);
    }

    function onNavigate(route){
        history.push(route);
    }

    return (
        <div style={{background:"white"}}>
            <Menu pointing secondary>
                <Container>
                    <Menu.Item onClick={() => onNavigate("/")} name="Anasayfa" ></Menu.Item>
                    <Menu.Item onClick={() => onNavigate("/job-list")} name="İş İlanları" ></Menu.Item>
                    <Menu.Item onClick={() => onNavigate("/employer-list")} name="İş Verenler" ></Menu.Item>
                    <Menu.Item onClick={() => onNavigate("/job-seeker-list")} name="İş Arayanlar" ></Menu.Item>
                    <Menu.Item onClick={() => onNavigate("/job-add")} name="İş İlanı Yayınla" ></Menu.Item>

                    <Menu.Menu position="right">

                        {isAuthenticated ? <SignedIn signOut={handleSignOut}/> : <SignedOut signIn={handleSignIn}/>}

                    </Menu.Menu>
                </Container>
            </Menu>
        </div>
    )
}
