import React from 'react'
import { Image } from 'antd';
import { Button, Icon } from 'semantic-ui-react'
import UploadImage from '../../../commonComponents/UploadFile';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import JobSeekerService from '../../../services/jobSeekerService';
import ResumeService from '../../../services/resumeService';
import { setResume } from '../../../store/actions/resumeActions';

export default function JobSeekerInfo() {

    var { id } = useParams();
    const dispatch = useDispatch();
    const resume = useSelector(state => state.resume)


    const navToSocialLink = (url) => {
        window.open(url)
    }

    const uploadImage = (file) => {
        let jobSeekerService = new JobSeekerService();
        var jobSeekerId = resume.jobSeeker.id;
        jobSeekerService.setProfilePicture(file, jobSeekerId).then(res => {
            findResumeByJobSeekerId();
        })
    }

    const findResumeByJobSeekerId = () => {
        let resumeService = new ResumeService();
        resumeService.findByJobSeekerId(id).then(response => {
            if (response.data && response.data.success && response.status === 200) {
                dispatch(setResume(response.data.data));
            }
        })
    }

    return (
        <div style={{ display: "flex" }}>
            <div style={{ display: "grid" }}>
                <Image
                    style={{ minHeight: "14em", maxHeight: "17em" }}
                    width={250}
                    src={
                        resume.jobSeeker && resume.jobSeeker.profilePicture.picturePath
                            ? resume.jobSeeker.profilePicture.picturePath
                            : "https://www.shareicon.net/data/128x128/2016/05/24/770137_man_512x512.png"
                    }
                />
                <UploadImage uploadButtonText="Fotoğraf Seç" actionButtonText="Fotoğrafı Yükle" uploadAction={uploadImage} />
            </div>
            <div style={{ marginLeft: "3em" }}>
                {/* <TextArea rows={9} disabled={false} /> */}
                <div style={{ minHeight: "17em" }}>
                    <h2>Hakkımda</h2>
                    <p>Ben Mert Jaavasıkript developerım</p>
                </div>
                <Button color='github' onClick={() => navToSocialLink(resume.github)}>
                    <Icon name='github' /> Github
                </Button>
                <Button color='linkedin' onClick={() => navToSocialLink(resume.linkedin)}>
                    <Icon name='linkedin' /> Linkedin
                </Button>

            </div>
        </div>
    )
}
