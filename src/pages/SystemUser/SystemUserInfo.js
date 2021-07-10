import React, { useState } from 'react'
import EditInfoModal from './components/EditInfoModal';

export default function SystemUserInfo() {

    const [editModalvisible, setEditModalVisible] = useState(true);

    return (
        <div>
            System User Info
            <EditInfoModal visible={editModalvisible} />
        </div>
    )
}