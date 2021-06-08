import React from 'react'
import { Button, Container, Menu, Input } from "semantic-ui-react";

export default function NavigationBar() {
    return (
        <div>
            <Menu fixed="top">
                <Container>
                    
                    <Menu.Menu position="left">
                        <Menu.Item>
                            <Input icon='search' iconPosition='left' placeholder='Kullanıcı ara...' />
                        </Menu.Item>
                    </Menu.Menu>

                    <Menu.Item name="Ana Sayfa" />
                    <Menu.Item name="İş İlanları" />
                    <Menu.Item name="İş Verenler" />
                    <Menu.Item name="İş Arayanlar" />
                    <Menu.Item name="İş İlanı Yayınla" />

                    <Menu.Menu position="right">
                        <Menu.Item>
                            <Button.Group>
                                <Button>Login</Button>
                                <Button.Or />
                                <Button positive>Sign Up</Button>
                            </Button.Group>
                        </Menu.Item>

                    </Menu.Menu>
                </Container>
            </Menu>
        </div>
    )
}
