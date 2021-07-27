import { notification } from "antd";

export default function showNotification(type = "success", title, description) {
    notification[type]({
        message: title,
        description: description
    });
}