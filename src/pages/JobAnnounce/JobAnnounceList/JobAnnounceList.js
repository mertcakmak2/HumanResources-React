import React, { useState, useEffect } from 'react'
import JobAnnounceDescription from './components/JobAnnounceDescription';
import { Grid, Segment } from 'semantic-ui-react'
import JobService from '../../../services/jobService';
import JobFilter from './components/JobFilter';
import JobList from './components/JobList';
import JobPagination from './components/JobPagination';
import NoDataResult from '../../../commonComponents/NoDataResult'
import { Divider } from 'antd';

let jobService = new JobService();

export default function JobAnnounceList() {

    const [filter, setFilter] = useState({ cityId: [], jobTypeId: [], page: 0, size: 10 })
    const [total, setTotal] = useState(0)
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        findByCityIdAndJobTypeIdWithPageable(filter).then(response => {
            if (response.status === 200 && response.data.success) {
                setJobs(response.data.data);
                setTotal(response.data.data.length)
            }
        })
    }, [filter])

    const findByCityIdAndJobTypeIdWithPageable = (filter) => {
        return new Promise((resolve) => {
            jobService.findByCityIdAndJobTypeIdWithPageable(filter).then(response => {
                resolve(response)
            })
        })
    }

    const onChangePageable = (page, size) => setFilter({ ...filter, page, size })

    const handleFilter = (selectedCities, selectedJobtypes) => setFilter({ ...filter, cityId: selectedCities, jobTypeId: selectedJobtypes })

    return (
        <div style={{ textAlign: 'center' }}>
            <Grid columns={2} divided>
                <Grid.Row stretched>
                    <Grid.Column width={16}>

                        <Segment>
                            <JobFilter handleFilter={handleFilter} />
                        </Segment>

                    </Grid.Column>
                </Grid.Row>
                <Grid.Row stretched>
                    <Grid.Column width={7}>

                        <Segment style={{ height: '40em', overflowY: 'scroll' }}>
                            {
                                jobs.length
                                    ? 
                                    <>
                                        <JobList jobList={jobs} />

                                        <Divider></Divider>

                                        <JobPagination onChangePageable={onChangePageable} total={total} />
                                    </>
                                    : <NoDataResult title="Malesef" status="404" description="İş İlanı Bulunamadı" />
                            }
                        </Segment>

                    </Grid.Column>
                    <Grid.Column width={9} >
                        <Segment>
                            <JobAnnounceDescription />
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}
