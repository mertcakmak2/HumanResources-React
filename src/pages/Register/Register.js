import React, { useEffect } from 'react'
import ResultComponent from '../../commonComponents/ResultComponent'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function Register() {

    const history = useHistory();
    const isAuthenticate = useSelector(state => state.isAuthenticate)

    useEffect(() => {
        if(isAuthenticate) history.push("/");
    })
    
    return (
        <div>
            Register
            {/* <ResultComponent 
                status="success" 
                title="Kayıt işlemi başarı ile gerçekleştirildi."
                subTitle="Artık insan kaynakları yönetim sistemine giriş yapabilirsiniz" 
                firstButtonText="Giriş Yap"/> */}
        </div>
    )
}
