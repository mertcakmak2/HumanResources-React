import React from 'react'
import { Button, Menu } from "semantic-ui-react";

export default function SignedOut({signIn, register}) {
    return (
        <div>
            <Menu.Item>
                <Button.Group>
                    <Button onClick={signIn}>Login</Button>
                    <Button.Or />
                    <Button onClick={register} positive>Sign Up</Button>
                </Button.Group>
            </Menu.Item>
        </div>
    )
}
