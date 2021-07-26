import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import RegisterService from '../../../services/registerService';

export default function JobSeekerConfirm() {

    const location = useLocation();

    useEffect(() => {
        var token = location.search.split("=")[1]
        let registerService = new RegisterService();
        registerService.confirmJobSeekerTokenWithEmail(token).then(response => {
            // if(response.status === 200)
            console.log(response);
        })
    }, [])

    return (
        <div>
            job seeker confirm js
        </div>
    )
}
