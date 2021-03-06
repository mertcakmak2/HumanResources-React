import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Image, Alert, Tabs, Button } from 'antd';
import { Segment, Icon } from 'semantic-ui-react';
import CompanyDescription from './components/CompanyDescription';
import CompanyJobList from './components/CompanyJobList';
import CompanyInfoEdit from './components/CompanyInfoEdit';
import EmployerService from '../../../services/employerService';
import JobService from '../../../services/jobService';
import { useSelector } from 'react-redux';

const { TabPane } = Tabs;

let employerService = new EmployerService();
let jobService = new JobService();

export default function EmployerInfo() {

    const { id } = useParams();
    const user = useSelector(state => state.user)

    const [employer, setEmployer] = useState({}) 
    const [jobs, setJobs] = useState([])
    const [drawerVisible, setDrawerVisible] = useState(false)

    useEffect(() => {
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

    const approveForUpdateEmployerCompany = ({companyName, companyWebSite, email}) => {
        var company = {
            companyName,
            companyWebSite,
            companyEmail: email
        }
        employerService.approveForUpdateEmployerCompany(company, id).then(response => {
            console.log(response);
        })
    }

    const handleVisibleChange = (value) => setDrawerVisible(value);

    return (
        <div>
            <Segment>
                <Alert
                    message="Bilgi"
                    description="Hen??z g??ncelleme iste??iniz sistem personeli taraf??ndan onaylanmad??."
                    type="info"
                    showIcon />

                <div style={{ display: "flex" }}>
                    <Image
                        preview={false}
                        width={200}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbfvty6OkyuZ4caDe2Gn4uQ8p3OWpT0wLtrQ&usqp=CAU" />

                    {user.id == id && user.userType == "employer" 
                        ? <Button onClick={() => setDrawerVisible(true)} style={{ marginTop: "2em" }} type="primary">Bilgileri D??zenle</Button>
                        : null
                    }
                </div>

                <Tabs defaultActiveKey="1">

                    <TabPane tab={<span><Icon disabled name='factory' /> ??irket Bilgileri </span>}
                        key="1">

                        <CompanyDescription employer={employer} />

                    </TabPane>

                    <TabPane tab={<span> <Icon disabled name='announcement' /> ???? ??lanlar?? </span>} key="2" >

                        <CompanyJobList jobs={jobs} />

                    </TabPane>

                </Tabs>

            </Segment>

            <CompanyInfoEdit 
                visible={drawerVisible} 
                setVisible={handleVisibleChange}
                employerCompany={employer} 
                updateEmployerCompany={approveForUpdateEmployerCompany} />

        </div>
    )
}
