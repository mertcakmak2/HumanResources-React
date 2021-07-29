import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Image, Alert, Tabs, Button } from 'antd';
import { Segment, Icon } from 'semantic-ui-react';
import CompanyDescription from './components/CompanyDescription';
import CompanyJobList from './components/CompanyJobList';
import CompanyInfoEdit from './components/CompanyInfoEdit';
import EmployerService from '../../../services/employerService';
import JobService from '../../../services/jobService';

const { TabPane } = Tabs;

export default function EmployerInfo() {

    const { id } = useParams();

    const [employer, setEmployer] = useState({})
    const [jobs, setJobs] = useState([])
    const [drawerVisible, setDrawerVisible] = useState(false)

    useEffect(() => {
        let employerService = new EmployerService();
        let jobService = new JobService();
        employerService.findEmployerById(id).then(response => {
            if (response.data.success && response.status === 200) {
                var employer = response.data.data
                jobService.findAllActiveJobByCompanyName(employer.companyName).then(jobsResponse => {
                    if (jobsResponse.data.success && jobsResponse.status === 200) {
                        setJobs(jobsResponse.data.data);
                        setEmployer(response.data.data);
                    }
                })
            }
        })
    }, [])

    const handleVisibleChange = (value) => {
        setDrawerVisible(value);
    }

    return (
        <div>
            <Segment>
                <Alert
                    message="Bilgi"
                    description="Henüz güncelleme isteğiniz sistem personeli tarafından onaylanmadı."
                    type="info"
                    showIcon />

                <div style={{ display: "flex" }}>
                    <Image
                        preview={false}
                        width={200}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbfvty6OkyuZ4caDe2Gn4uQ8p3OWpT0wLtrQ&usqp=CAU" />

                    <Button onClick={() => setDrawerVisible(true)} style={{ marginTop: "2em" }} type="primary">Bilgileri Düzenle</Button>
                </div>

                <Tabs defaultActiveKey="1">
                    <TabPane
                        tab={<span><Icon disabled name='factory' /> Şirket Bilgileri </span>}
                        key="1">

                        <CompanyDescription employer={employer} />

                    </TabPane>
                    <TabPane
                        tab={<span> <Icon disabled name='announcement' /> İş İlanları </span>}
                        key="2" >

                        <CompanyJobList jobs={jobs} />

                    </TabPane>

                </Tabs>

            </Segment>

            {/* {employer.id
                ? <CompanyInfoEdit visible={drawerVisible} setVisible={handleVisibleChange} oldEmployer={employer} />
                : null
            } */}

            <CompanyInfoEdit visible={drawerVisible} setVisible={handleVisibleChange} oldEmployer={employer} />

        </div>
    )
}
