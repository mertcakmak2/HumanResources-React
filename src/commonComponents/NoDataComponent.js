import React from 'react'
import { Empty, Button } from 'antd';


export default function NoDataComponent() {
    return (
        <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{
                height: 60,
            }}
            description={ <span>  Kayıt bulunamadı..  </span> }>
            <Button type="primary">Hemen Oluştur</Button>
        </Empty>
    )
}
