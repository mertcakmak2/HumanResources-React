import React, { useEffect, useState } from 'react'
import moment from 'moment';
import NotificationService from '../services/notificationService';
import { Badge } from 'antd';
import { Button, List, Image, Modal, Menu, Icon, Pagination } from 'semantic-ui-react'
import { useSelector } from 'react-redux';

let notificationService = new NotificationService();

export default function Notifications() {

    const user = useSelector(state => state.user)

    const [open, setOpen] = useState(false)
    const [notifications, setNotifications] = useState([]);
    const [totalData, setTotalData] = useState(0);
    const [pagination, setPagination] = useState({ "userId": "", "page": 0, "size": 10 })

    useEffect(() => {
        findNotificationsByUserId(user.id)
    }, [user])

    const handleOpenModal = () => {
        var unSeenNotifications = notifications.filter(n => n.seen == false)
        if (unSeenNotifications.length) {
            notificationService.seenNotifications(unSeenNotifications).then(response => {
                findNotificationsByUserId(user.id);
                setOpen(true)
            })
        } else setOpen(true)
    }

    const findNotificationsByUserId = (userId) => {
        var paginationRequest = {...pagination, userId: userId}
        notificationService.findNotificationsByUserId(paginationRequest).then(response => {
            if (response.status === 200 && response.data.success) {
                setNotifications(response.data.data)
                setTotalData(response.data.totalData)
            }
        })
    }

    return (
        <div style={{ marginTop: "1em" }}>
            <Badge dot={notifications.filter(n => n.seen == false).length}>
                <Menu.Item onClick={() => handleOpenModal()} >
                    <Icon name='bell' />
                    Bildirimler
                </Menu.Item>
            </Badge>
            <Modal open={open} >
                <Modal.Header>Bildirimler</Modal.Header>
                <Modal.Content image>
                    <div>
                        <List divided relaxed>
                            {notifications.map(notification => (
                                <List.Item key={notification.id}>
                                    <Image avatar src={notification?.from?.profilePicture?.picturePath} />
                                    <List.Content>
                                        <List.Header as='a'>{notification?.from?.firstName}</List.Header>
                                        <List.Description>
                                            {moment(notification.createdAt).format("DD.MM.YYYY HH:mm") + ' '} tarihinde {' '}
                                            <a> <b> profilini görüntüledi </b> </a>
                                        </List.Description>
                                    </List.Content>
                                </List.Item>
                            ))}
                        </List>
                        <br />
                        {totalData > 10 ? <Pagination size='mini' totalPages={totalData / 10} /> : null}
                    </div>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        content="Kapat"
                        labelPosition='right'
                        icon='close'
                        onClick={() => setOpen(false)}
                        negative
                    />
                </Modal.Actions>
            </Modal>
        </div>
    )
}
