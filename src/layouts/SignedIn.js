import React from 'react'
import { Dropdown, Menu, Image } from 'semantic-ui-react'
import { Badge } from 'antd';

export default function SignedIn({ signOut }) {
    return (
        <div>
            <Menu.Item style={{ marginTop: '3px' }}>
                <Badge dot>
                    <Image avatar spaced="right" src="https://media-exp3.licdn.com/dms/image/C5603AQGNAsvOJNKEuA/profile-displayphoto-shrink_200_200/0/1567248725734?e=1628726400&v=beta&t=Xdw-ufseLPwz1ClCFUScYgVHHwNS8m9Ys-o6r6SnCZE" />
                </Badge>
                <Dropdown pointing="top left" text="Mert">
                    <Dropdown.Menu>
                        <Dropdown.Item text="Profil" icon="user" />
                        <Dropdown.Item text="Bildirimler" icon="bell" />
                        <Dropdown.Item onClick={signOut} text="Çıkış Yap" icon="sign-out" />
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
        </div>
    )
}
