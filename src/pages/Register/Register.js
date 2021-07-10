import React from 'react'
import ResultComponent from '../../commonComponents/ResultComponent'

export default function Register() {

    //const [registerSuccess, setRegisterSuccess] = useState(false)
    
    return (
        <div>
            Register
            <ResultComponent 
                status="success" 
                title="Kayıt işlemi başarı ile gerçekleştirildi."
                subTitle="Artık insan kaynakları yönetim sistemine giriş yapabilirsiniz" 
                firstButtonText="Giriş Yap"/>
        </div>
    )
}
