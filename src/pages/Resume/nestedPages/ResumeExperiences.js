import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Table, Button, Modal, DatePicker, Checkbox, Input } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined, RedoOutlined } from '@ant-design/icons';
import NoDataResult from '../../../commonComponents/NoDataResult';
import Notification from '../../../commonComponents/Notification';
import ExperienceService from "../../../services/jobExperienceService";
import moment from 'moment';


let experienceService = new ExperienceService();

export default function ResumeExperiences() {

    const resume = useSelector(state => state.resume)

    const [experienceList, setExperienceList] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalProperties, setModalProperties] = useState({ title: "Tecrübe Ekle", saveOperation: true })
    const [experience, setExperience] = useState({
        beginDate: null, endDate: null, companyName: "", position: "", workingStatu: false, resumeId: ""
    })

    useEffect(() => {
        if (resume.id) findAllJobExperiencesByResumeId(resume.id);
    }, [resume])

    const findAllJobExperiencesByResumeId = (resumeId) => {
        experienceService.findAllJobExperiencesByResumeId(resumeId).then(response => {
            if (response.data && response.data.success && response.status === 200) {
                response.data.data.map(x => x.key = x.id)
                setExperienceList(response.data.data)
            }
        })
    }

    const handleSaveExperience = () => {
        setModalProperties({ title: "Tecrübe Ekle", saveOperation: true })
        setExperience({ beginDate: null, endDate: null, companyName: "", position: "", workingStatu: false, resumeId: "" })
        showModal();
    }

    const saveExperience = () => {
        experience.resumeId = resume.id
        experienceService.saveJobExperience(experience).then(response => {
            if (response.data && response.data.success && response.status === 201) {
                findAllJobExperiencesByResumeId(resume.id)
                Notification.showNotification("success", "Tecrübe", "Ekleme işlemi başarılı.");
                hideModal();
            }
        })
    }

    const handleUpdateExperience = (jobExperience) => {
        setModalProperties({ title: "Tecrübe Ekle", saveOperation: false })
        setExperience(jobExperience);
        showModal();
    }

    const updateExperience = () => {
        experienceService.updateJobExperience(experience).then(response => {
            if (response.data && response.data.success && response.status === 200) {
                findAllJobExperiencesByResumeId(resume.id)
                Notification.showNotification("success", "Tecrübe", "Düzenleme işlemi başarılı.");
                hideModal();
            }
        })
    }

    const handleDeleteExperience = (experience) => {
        deleteExperience(experience.id);
    }

    const deleteExperience = (jobExperienceId) => {
        experienceService.deleteJobExperience(jobExperienceId).then(response => {
            if (response.data && response.data.success && response.status === 200) {
                findAllJobExperiencesByResumeId(resume.id)
                Notification.showNotification("success", "Tecrübe", "Silme işlemi başarılı.");
            }
        })
    }

    const onChangeDateInput = (date, inputKey) => {
        if(!date) setExperience(Object.assign({}, experience, { [inputKey]: null }))
        else setExperience(Object.assign({}, experience, { [inputKey]: moment(date._d).format("YYYY-MM-DD") }))
    }

    const onChangeInput = (e, inputKey) => {
        setExperience(Object.assign({}, experience, { [inputKey]: e.target.value }))
    }

    const onChangeWorkingStatu = (e) => {
        setExperience(Object.assign({}, experience, { workingStatu: e.target.checked }))
    }

    const hideModal = () => {
        setIsModalVisible(false);
    };

    const showModal = () => {
        setIsModalVisible(true);
    };


    const columns = [
        {
            title: 'Şirket Adı',
            key: 'companyName',
            dataIndex: 'companyName'
        },
        {
            title: "Pozisyon",
            key: "position",
            dataIndex: "position"
        },
        {
            title: "Başlangıç Tarihi",
            key: "beginDate",
            dataIndex: "beginDate"
        },
        {
            title: "Bitiş Tarihi",
            key: "endDate",
            dataIndex: "endDate"
        },
        {
            title: "Çalışma Durumu",
            key: "workingStatu",
            dataIndex: "workingStatu"
        },
        {
            title: '',
            key: 'İşlemler',
            render: (experience) => (
                <div>
                    <Button type="primary" onClick={() => handleDeleteExperience(experience)} danger shape="circle" icon={<DeleteOutlined />} />
                    <Button type="primary" onClick={() => handleUpdateExperience(experience)}shape="circle" icon={<EditOutlined />} style={{ marginLeft: "5px" }} />
                </div>
            ),
        },
    ];

    const dateFormat = 'YYYY-MM-DD';

    return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleSaveExperience} >
                    Tecrübe Ekle
                </Button>
            </div>
            {experienceList.length
                ? <Table columns={columns} dataSource={experienceList} pagination={false} scroll={{ x: 400, y: 220 }} />
                : <NoDataResult title="404" status="404" buttonText="Tecrübe Ekle" description="Tecrübe Bulunamadı" onAction={showModal} />
            }

            <Modal centered title={modalProperties.saveOperation ? "Tecrübe Ekle" : "Tecrübe Güncelle"} visible={isModalVisible} onCancel={hideModal}
                footer={[
                    <Button type="primary" danger onClick={hideModal}>
                        İptal
                    </Button>,
                    modalProperties.saveOperation
                        ? <Button type="primary" onClick={saveExperience} icon={<PlusOutlined />} style={{ marginLeft: "5px" }}> Kaydet </Button>
                        : <Button type="primary" onClick={updateExperience} icon={<RedoOutlined />} style={{ marginLeft: "5px" }}> Güncelle </Button>
                ]}>
                <Input value={experience.companyName} onChange={(e) => onChangeInput(e, "companyName")} placeholder="İş yeri adını giriniz..." />
                <Input value={experience.position} onChange={(e) => onChangeInput(e, "position")} placeholder="Pozisyonunuzu giriniz..." style={{ marginTop: "1em" }} />
                <DatePicker value={ experience.beginDate ? moment(experience.beginDate, dateFormat) : null} format={dateFormat} onChange={(e) => onChangeDateInput(e, "beginDate")} placeholder="Başlangıç tarihini giriniz..." style={{ marginTop: "1em" }} />
                { !experience.workingStatu 
                    ? <DatePicker value={experience.endDate ? moment(experience.endDate, dateFormat) : null} format={dateFormat} onChange={(e) => onChangeDateInput(e, "endDate")} placeholder="Ayrılış tarihini giriniz..." style={{ marginLeft: "1em" }} />
                    : null
                }
                <Checkbox checked={experience.workingStatu} onChange={onChangeWorkingStatu} style={{ marginLeft: "1em" }} >Devam Ediyor</Checkbox>
            </Modal>
        </div>
    )
}
