import React, { useState } from 'react'
import { Container, Menu, Input } from "semantic-ui-react";
import SignedIn from './SignedIn';
import SignedOut from './SignedOut';

export default function NavigationBar() {

    const [isAuthenticated, setIsAuthenticated] = useState(true)

    function handleSignOut() {
        setIsAuthenticated(false);
    }

    function handleSignIn() {
        setIsAuthenticated(true);
    }

    return (
        <div>
            <Menu pointing secondary>
                <Container>
                    <Menu.Menu position="left">
                        <Menu.Item>
                            <Input style={{marginBottom:'1px'}} icon='search' iconPosition='left' placeholder='Kullanıcı ara...' />
                        </Menu.Item>
                    </Menu.Menu>

                    <Menu.Item active={true} name="Ana Sayfa" />
                    <Menu.Item name="İş İlanları" />
                    <Menu.Item name="İş Verenler" />
                    <Menu.Item name="İş Arayanlar" />
                    <Menu.Item name="İş İlanı Yayınla" />

                    <Menu.Menu position="right">

                        {isAuthenticated ? <SignedIn signOut={handleSignOut}/> : <SignedOut signIn={handleSignIn}/>}

                    </Menu.Menu>
                </Container>
            </Menu>
        </div>
    )
}
