import React from 'react'
import { Button, Menu } from "semantic-ui-react";

export default function SignedOut({signIn}) {
    return (
        <div>
            <Menu.Item>
                <Button.Group>
                    <Button onClick={signIn}>Login</Button>
                    <Button.Or />
                    <Button positive>Sign Up</Button>
                </Button.Group>
            </Menu.Item>
        </div>
    )
}
