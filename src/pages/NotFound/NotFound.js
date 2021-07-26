import React from 'react'
import NoDataResult from '../../commonComponents/NoDataResult'

export default function NotFound() {
    return (
        <div>
            <NoDataResult title="Üzgünüz :(" status="404" description="Bu sayfa bulunamadı." />
        </div>
    )
}
