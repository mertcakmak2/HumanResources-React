import React, { useEffect } from 'react'
import { Link, useParams, useRouteMatch, Switch, Route } from 'react-router-dom'
import ResumeInfos from './nestedPages/ResumeInfos';
import ResumeSkills from './nestedPages/ResumeSkills';
import ResumeLanguages from './nestedPages/ResumeLanguages';
import ResumeExperiences from './nestedPages/ResumeExperiences';
import ResumeSchools from './nestedPages/ResumeSchools';
import { Grid, Segment } from 'semantic-ui-react'
import { Card, Avatar, Typography } from 'antd';
import ResumeService from '../../services/resumeService';
import { useDispatch, useSelector } from 'react-redux';
import { setResume } from '../../store/actions/resumeActions';

let { Meta } = Card;
const { Title } = Typography;

let resumeService = new ResumeService();

export default function Resume() {

    const dispatch = useDispatch();

    const resume = useSelector(state => state.resume)

    let { id } = useParams();
    let { path } = useRouteMatch();

    var cardList = [
        {
            avatarSrc: "https://cdn3.iconfinder.com/data/icons/scenarium-vol-5/128/040_account_follow_profile_select-128.png",
            link: "/job-seeker/" + id + "/resume/info",
            title: "Temel Bilgiler"
        },
        {
            avatarSrc: "https://cdn4.iconfinder.com/data/icons/business-risks-2/512/TalentManagement-talent-skill-genius-organization-256.png",
            link: "/job-seeker/" + id + "/resume/skills",
            title: "Yetenekler"
        },
        {
            avatarSrc: "https://cdn2.iconfinder.com/data/icons/leto-blue-online-education/64/__language_courses_translate_speak-128.png",
            link: "/job-seeker/" + id + "/resume/languages",
            title: "Yabancı Diller"
        },
        {
            avatarSrc: "https://cdn2.iconfinder.com/data/icons/product-1/200/testimonial-1--testimonial-PRODUCT-FEEDBACK-REVIEW-SATISFIED-EXPERIENCE-CUSTOMER-COMMENT-SHARE-READ-256.png",
            link: "/job-seeker/" + id + "/resume/experiences",
            title: "Çalışma Geçmişi"
        },
        {
            avatarSrc: "https://cdn2.iconfinder.com/data/icons/leto-blue-online-education/64/__world_global_student_hat_education-512.png",
            link: "/job-seeker/" + id + "/resume/schools",
            title: "Eğitim Bilgileri"
        }
    ]

    useEffect(() => {
        resumeService.findByJobSeekerId(id).then(response => {
            if (response.data && response.data.success && response.status === 200) {
                dispatch(setResume(response.data.data));
            }
        })
        // var resume = { id:1,jobSeekerId:2, github:"github.com"}
        // dispatch(setResume(resume));
    }, [])

    return (
        <div>
            <Grid columns={2} >
                <Grid.Row >
                    <Grid.Column width={5}>

                        <Card size="small" style={{ width: 260 }} >
                            {
                                resume?.jobSeeker
                                    ? <>
                                        <Title level={2}>{resume?.jobSeeker?.firstName + " " + resume?.jobSeeker?.lastName}</Title>
                                        <Title level={5}>{resume?.jobSeeker?.email}</Title>
                                    </>
                                    : null
                            }
                        </Card>

                        {cardList.map((card) => (
                            <Link to={card.link} key={card.link}>
                                <Card size="small" hoverable={true} style={{ width: 260, marginTop: 16 }} >
                                    <Meta
                                        avatar={
                                            <Avatar src={card.avatarSrc} />
                                        }
                                        title={card.title}
                                    />
                                </Card>
                            </Link>
                        ))}

                    </Grid.Column>

                    <Grid.Column width={11} >
                        <Segment>
                            <Switch>
                                <Route exact path={path}>
                                    <ResumeInfos />
                                </Route>

                                <Route path={path + "/info"} component={ResumeInfos} />
                                <Route path={path + "/skills"} component={ResumeSkills} />
                                <Route path={path + "/languages"} component={ResumeLanguages} />
                                <Route path={path + "/experiences"} component={ResumeExperiences} />
                                <Route path={path + "/schools"} component={ResumeSchools} />
                            </Switch>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>

    )
}
