import React from 'react'
import { Dropdown, Menu, Image } from 'semantic-ui-react'
import { useSelector } from 'react-redux';
import Notifications from './Notifications';
import { useHistory } from 'react-router-dom';

export default function SignedIn({ signOut }) {

    const history = useHistory();
    const user = useSelector(state => state.user)

    const redirectToProfile = () => {
        var redirectLink = user.userType == "jobSeeker" ? "/job-seeker/"+user.id+"/resume" : "/employer/"+user.id
        history.push(redirectLink);
    }

    return (
        <div style={{ display: "flex" }}>
            <Notifications />
            <Menu.Item style={{ marginTop: '3px' }}>
                <Image avatar spaced="right" src={user?.profilePicture?.picturePath} />
                <Dropdown pointing="top left" text={user.firstName}>
                    <Dropdown.Menu>
                        <Dropdown.Item text="Profil" onClick={ redirectToProfile } icon="user" />
                        <Dropdown.Item onClick={signOut} text="Çıkış Yap" icon="sign-out" />
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
        </div>
    )
}
