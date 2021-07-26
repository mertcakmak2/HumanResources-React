import { notification } from "antd";

function showNotification(type = "success", title, description) {
    notification[type]({
        message: title,
        description: description
    });
}

export default showNotification
