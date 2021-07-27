import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import RegisterService from '../../../services/registerService';
import ResultComponent from '../../../commonComponents/ResultComponent';
import { useSelector } from 'react-redux';

export default function JobSeekerConfirm() {

    const isAuthenticate = useSelector(state => state.isAuthenticate)
    const history = useHistory();

    const [isConfirmed, setIsConfirmed] = useState({
        status: "error",
        title: "Aktivasyon işlemi sırasında bir hata oluştu.",
        subTitle: "Kayıt işlemini gerçekleştirdiğinizden emin olunuz.",
        firstButtonText: "",
        visible: false
    })

    const location = useLocation();

    useEffect(() => {

        if (isAuthenticate) {
            history.push("/")
            return;
        }
        
        var token = location.search.split("=")[1]
        let registerService = new RegisterService();
        registerService.confirmJobSeekerTokenWithEmail(token).then(response => {
            if (response.status === 200) {
                setIsConfirmed({
                    ...isConfirmed,
                    status: "success",
                    title: "Kayıt işlemi başarı ile gerçekleştirildi.",
                    subTitle: "Artık insan kaynakları yönetim sistemine giriş yapabilirsiniz",
                    firstButtonText: "Giriş Yap",
                    visible: true
                })
            } else {
                setIsConfirmed({
                    ...isConfirmed,
                    status: "error",
                    title: "Aktivasyon işlemi sırasında bir hata oluştu.",
                    subTitle: "Kayıt işlemini gerçekleştirdiğinizden emin olunuz.",
                    visible: true
                })
            }
        })
    }, [])

    const redirectToLogin = () => {
        alert("giriş yap")
    }

    return (
        <div>
            {
                isConfirmed.visible
                    ?
                    <ResultComponent
                        status={isConfirmed?.status}
                        title={isConfirmed?.title}
                        subTitle={isConfirmed?.subTitle}
                        firstButtonText={isConfirmed?.firstButtonText}
                        firstButtonAction={redirectToLogin} />
                    : null
            }
        </div>
    )
}
