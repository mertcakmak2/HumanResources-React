import React from 'react'
import { Result, Button } from 'antd';


export default function NoDataResult({buttonText, description, status, title, onAction }) {
    return (
        <Result
            status={status}
            title={title}
            subTitle={description}
            extra={<Button type="primary" onClick={onAction}>{buttonText}</Button>}
        />
    )
}
