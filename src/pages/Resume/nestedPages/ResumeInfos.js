import React, { useState } from 'react'
import { Image, Button, Modal, Form, Input } from 'antd';
import { GithubOutlined, LinkedinOutlined, EditOutlined } from '@ant-design/icons';
import UploadImage from '../../../commonComponents/UploadFile';
import showNotification from '../../../commonComponents/Notification';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import JobSeekerService from '../../../services/jobSeekerService';
import ResumeService from '../../../services/resumeService';
import { setResume } from '../../../store/actions/resumeActions';

let resumeService = new ResumeService();

export default function JobSeekerInfo() {

    var { id } = useParams();
    const dispatch = useDispatch();
    const resume = useSelector(state => state.resume)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editResumeModel, setEditResumeModel] = useState({ github: "", linkedin: "", coverLetter: "" })
    const [previewImage, setPreviewImage] = useState("");
    const [newProfilePicture, setNewProfilePicture] = useState("");

    const navToSocialLink = (url, socialMedia) => {
        if(!url) {
            showNotification("error", socialMedia, "Üzgünüz "+socialMedia+" adresi bulunamadı")
            return;
        }
        window.open(url)
    }

    const handleUpdateResume = () => {
        var request = []
        if (newProfilePicture) request = [updateResume(), updateProfilePicture()]
        else request = [updateResume()]
        Promise.all(request).then(response => {
            findResumeByJobSeekerId();
            hideModal();
        })
    }

    const updateResume = () => {
        return new Promise((resolve) => {
            var updateResume = {
                id: resume.id,
                github: editResumeModel.github,
                linkedin: editResumeModel.linkedin,
                coverLetter: editResumeModel.coverLetter
            }
            resumeService.updateResume(updateResume).then(response => {
                resolve(response);
            })
        })
    }

    const updateProfilePicture = () => {
        return new Promise((resolve) => {
            let jobSeekerService = new JobSeekerService();
            var jobSeekerId = resume.jobSeeker.id;
            jobSeekerService.setProfilePicture(newProfilePicture, jobSeekerId).then(response => {
                resolve(response)
            })
        })
    }

    const findResumeByJobSeekerId = () => {
        resumeService.findByJobSeekerId(id).then(response => {
            if (response.data && response.data.success && response.status === 200) {
                dispatch(setResume(response.data.data));
            }
        })
    }

    const onChange = (value, field) => {
        setEditResumeModel(Object.assign({}, editResumeModel, { [field]: value }))
    }

    const previewAction = (base64, file) => {
        if (!file) alert("fotoğraf yüklenirken bir hata oluştu.")
        setPreviewImage(base64);
        setNewProfilePicture(file);
    }

    const hideModal = () => {
        setIsModalVisible(false);
    }

    const showModal = () => {
        setEditResumeModel({ github: resume.github, linkedin: resume.linkedin, coverLetter: resume.coverLetter });
        setNewProfilePicture("");
        setPreviewImage(
            resume?.jobSeeker?.profilePicture?.picturePath
                ? resume.jobSeeker.profilePicture.picturePath : null);
        setIsModalVisible(true);
    }

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    return (
        <div style={{ display: "flex" }}>
            <div style={{ display: "grid" }}>
                <Image
                    width={270}
                    src={
                        resume.jobSeeker && resume.jobSeeker.profilePicture && resume.jobSeeker.profilePicture.picturePath
                            ? resume.jobSeeker.profilePicture.picturePath
                            : "https://www.shareicon.net/data/128x128/2016/05/24/770137_man_512x512.png"
                    }
                />
            </div>
            <div style={{ marginLeft: "3em" }}>
                <div style={{ minHeight: "17em" }}>
                    <h2>Hakkımda</h2>
                    <p>{resume.coverLetter}</p>
                </div>
                <div style={{ display: 'flex' }}>
                    <Button type="primary" onClick={() => navToSocialLink(resume.github, "Github")} icon={<GithubOutlined />}>
                        Github
                    </Button>
                    <Button style={{ marginLeft: "1em" }} onClick={() => navToSocialLink(resume.linkedin, "Linkedin")} type="primary" danger icon={<LinkedinOutlined />}>
                        Linkedin
                    </Button>

                    <div style={{ marginLeft: "7em" }}>
                        <Button onClick={showModal} shape="circle" icon={<EditOutlined />}></Button>

                        <Modal centered title="Bilgileri Düzenle" width="55%" visible={isModalVisible} onCancel={hideModal}
                            footer={[
                                <Button type="primary" danger onClick={hideModal}>
                                    İptal
                                </Button>,
                                <Button type="primary" onClick={handleUpdateResume} icon={<EditOutlined />} style={{ marginLeft: "5px" }}> Kaydet </Button>
                            ]}>
                            <div style={{ display: 'flex' }}>
                                <div>
                                    <Image
                                        width={270}
                                        src={
                                            previewImage
                                                ? previewImage
                                                : "https://www.shareicon.net/data/128x128/2016/05/24/770137_man_512x512.png"
                                        }
                                    />
                                </div>

                                <div>
                                    <Form {...layout}>
                                        <Form.Item label="Github">
                                            <Input value={editResumeModel.github}
                                                onChange={(e) => onChange(e.target.value, "github")} />
                                        </Form.Item>
                                        <Form.Item label="Linkedin">
                                            <Input value={editResumeModel.linkedin}
                                                onChange={(e) => onChange(e.target.value, "linkedin")} />
                                        </Form.Item>
                                        <Form.Item label="Hakkımda">
                                            <Input.TextArea value={editResumeModel.coverLetter}
                                                onChange={(e) => onChange(e.target.value, "coverLetter")} />
                                        </Form.Item>
                                    </Form>
                                    <div style={{ marginTop: "4.3em", marginLeft: "1em" }}>
                                        <UploadImage
                                            actionButtonText="Fotoğrafı Yükle"
                                            previewAction={previewAction} />
                                    </div>


                                </div>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    )
}
