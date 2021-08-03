import axiosProvider from './axiosProvider';

const NOTIFICATION_URL = "http://localhost:5002/api/notification";

export default class NotificationService {

    sendNotification(notification) {
        return new Promise(resolve => {

            var url = NOTIFICATION_URL;

            axiosProvider.postMethod(url, notification).then(response => {
                resolve(response);
            })
        })
    }

    seenNotifications(notificationList) {
        return new Promise(resolve => {

            var url = NOTIFICATION_URL+"/seenNotifications";

            axiosProvider.postMethod(url, notificationList).then(response => {
                resolve(response);
            })
        })
    }

    findNotificationsByUserId({userId, page, size}) {
        return new Promise(resolve => {

            var url = NOTIFICATION_URL+"/"+userId;

            axiosProvider.postMethod(url, {page, size}).then(response => {
                resolve(response);
            })
        })
    }

}