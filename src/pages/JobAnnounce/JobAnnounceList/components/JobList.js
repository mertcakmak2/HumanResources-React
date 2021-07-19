import React from 'react'
import { List, Avatar, Button } from 'antd';

export default function JobAnnounceList({ jobList }) {

    const onSelectJob = (job) => {
        alert(JSON.stringify(job))
    }

    return (
        <List
            itemLayout="horizontal"
            dataSource={jobList}
            renderItem={job => (
                <List.Item actions={[<Button onClick={() => onSelectJob(job)} danger>Görüntüle</Button>]}>
                    <List.Item.Meta
                        avatar={<Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbfvty6OkyuZ4caDe2Gn4uQ8p3OWpT0wLtrQ&usqp=CAU" />}
                        title={job.jobPosition}
                        description={job.jobDescription}
                    />
                </List.Item>
            )}
        />
    )
}
