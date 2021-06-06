import React, { useEffect } from 'react'
import EmployerService from '../services/employerService'

export default function EmployerList() {

    useEffect(() => {
       let employerService = new EmployerService();
       employerService.findAllEmployers().then(employers => {
           console.log(employers);
       })
    }, [])

    return (
        <div>
            employer list
        </div>
    )
}
