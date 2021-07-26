import React from 'react'
import { Result, Button } from 'antd';

/**
 * @param {string} status 'success | error | info | warning'
 * @param {string} title
 * @param {string} subTitle
 * @param {string} firstButtonText
 * @param {string} firstButtonToPath
 * @param {string} secondButtonText
 * @param {string} secondButtonToPath
 */
export default function ResultComponent(
    { status, title, subTitle, firstButtonText, firstButtonAction, secondButtonText, secondButtonAction }) {
    return (
        <div>
            <Result
                status={status}
                title={title}
                subTitle={subTitle}
                extra={[
                    <Button type="primary" key="first" onClick={firstButtonAction}>
                        {firstButtonText}
                    </Button>,
                    <Button key="second">{secondButtonText}</Button>,
                ]}
            />
        </div>
    )
}
