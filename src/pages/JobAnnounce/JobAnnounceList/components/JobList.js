import React from 'react'
import { List, Avatar, Button } from 'antd';

export default function JobAnnounceList({ jobList }) {

    return (
        <List
            itemLayout="horizontal"
            dataSource={jobList}
            renderItem={item => (
                <List.Item actions={[<Button onClick={() => alert(item.jobPosition)} danger>Görüntüle</Button>]}>
                    <List.Item.Meta
                        avatar={<Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbfvty6OkyuZ4caDe2Gn4uQ8p3OWpT0wLtrQ&usqp=CAU" />}
                        title={item.jobPosition}
                        description={item.jobDescription}
                    />
                </List.Item>
            )}
        />
    )
}
