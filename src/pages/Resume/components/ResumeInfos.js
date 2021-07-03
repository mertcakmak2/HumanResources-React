import React, { useState } from 'react'
import { Image, Button, Modal, Form, Input } from 'antd';
import { GithubOutlined, LinkedinOutlined, EditOutlined } from '@ant-design/icons';
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
    const [isModalVisible, setIsModalVisible] = useState(false);


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

    const handleUpdateInfos = () => {

    }

    const hideModal = () => {
        setIsModalVisible(false);
    }

    const showModal = () => {
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
                    style={{ minHeight: "18em", maxHeight: "22em" }}
                    width={270}
                    src={
                        resume.jobSeeker && resume.jobSeeker.profilePicture.picturePath
                            ? resume.jobSeeker.profilePicture.picturePath
                            : "https://www.shareicon.net/data/128x128/2016/05/24/770137_man_512x512.png"
                    }
                />
                {/* <UploadImage uploadButtonText="Fotoğraf Seç" actionButtonText="Fotoğrafı Yükle" uploadAction={uploadImage} /> */}
            </div>
            <div style={{ marginLeft: "3em" }}>
                {/* <TextArea rows={9} disabled={false} /> */}
                <div style={{ minHeight: "17em" }}>
                    <h2>Hakkımda</h2>
                    <p>Ben Mert Jaavasıkript developerım</p>
                </div>
                <div style={{ display: 'flex' }}>
                    <Button type="primary" onClick={() => navToSocialLink(resume.github)} icon={<GithubOutlined />}>
                        Github
                    </Button>
                    <Button style={{ marginLeft: "1em" }} onClick={() => navToSocialLink(resume.linkedin)} type="primary" danger icon={<LinkedinOutlined />}>
                        Linkedin
                    </Button>

                    <div style={{ marginLeft: "7em" }}>
                        <Button onClick={showModal} shape="circle" icon={<EditOutlined />}></Button>
                        <Modal centered title="Bilgileri Güncelle" visible={isModalVisible} onCancel={hideModal}
                            footer={[
                                <Button type="primary" danger onClick={hideModal}>
                                    İptal
                                </Button>,
                                <Button type="primary" icon={<EditOutlined />} style={{ marginLeft: "5px" }}> Kaydet </Button>
                            ]}>
                            <div>
                                <div></div>

                                <div>
                                    <Form {...layout}>
                                        <Form.Item label="Github">
                                            <Input />
                                        </Form.Item>
                                        <Form.Item label="Linkedin">
                                            <Input />
                                        </Form.Item>
                                        <Form.Item label="Hakkımda">
                                            <Input.TextArea />
                                        </Form.Item>
                                    </Form>
                                </div>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    )
}
