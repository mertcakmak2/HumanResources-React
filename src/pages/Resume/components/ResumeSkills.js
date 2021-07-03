import React, { useEffect, useState } from 'react'
import { Table, Tag, Button, Modal, Input } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined, RedoOutlined } from '@ant-design/icons';
import SkillService from '../../../services/skillService';
import NoDataResult from '../../../commonComponents/NoDataResult';
import Notification from '../../../commonComponents/Notification';
import { useSelector } from 'react-redux';


let skillService = new SkillService();

export default function JobSeekerSkill() {

    const resume = useSelector(state => state.resume)

    const [skillList, setSkillList] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [skillName, setSkillName] = useState("");
    const [selectedSkill, setSelectedSkill] = useState({})
    const [modalProperties, setModalProperties] = useState({ title: "Yetenek Ekle", saveOperation: true })

    useEffect(() => {
        if(resume.id) findAllSkillByResumeId(resume.id);
    }, [resume])

    const columns = [
        {
            title: 'Yetenek',
            key: 'skillName',
            dataIndex: 'skillName',
            render: skillName => (
                <>
                    <Tag color="green" >
                        {skillName.toUpperCase()}
                    </Tag>
                </>
            ),
        },
        {
            title: '',
            key: 'İşlemler',
            render: (data) => (
                <div>
                    <Button type="primary" onClick={() => handleDeleteSkill(data)} danger shape="circle" icon={<DeleteOutlined />} />
                    <Button type="primary" onClick={() => handleUpdateSkill(data)} shape="circle" icon={<EditOutlined />} style={{ marginLeft: "5px" }} />
                </div>
            ),
        },
    ];

    const findAllSkillByResumeId = (resumeId) => {
        skillService.findAllSkillByResumeId(resumeId).then(response => {
            if (response.data && response.data.success && response.status === 200) {
                response.data.data.map(x => x.key = x.id)
                setSkillList(response.data.data)
            }
        })
    }

    const handleSaveSkill = () => {
        setSkillName("");
        setModalProperties({ title: "Yetenek Ekle", saveOperation: true });
        showModal();
    }

    const saveSkill = () => {
        var newSkill = {
            skillName: skillName,
            resumeId: resume.id
        }
        skillService.saveSkill(newSkill).then(response => {
            if (response.data.success && response.status === 201) {
                findAllSkillByResumeId(resume.id);
                Notification.showNotification("success", "Yetenek", "Ekleme işlemi başarılı.");
                setSkillName("");
                hideModal();
            }
        })
    }

    const handleDeleteSkill = (data) => {
        deleteSkill(data.id)
    }

    const deleteSkill = (skillId) => {
        skillService.deleteSkill(skillId).then(response => {
            if (response.data.success && response.status === 200) {
                findAllSkillByResumeId(resume.id);
                Notification.showNotification("success", "Yetenek", "Silme işlemi başarılı.");
            }
        })
    }

    const handleUpdateSkill = (data) => {
        setSkillName(data.skillName)
        setSelectedSkill(data)
        setModalProperties({ title: "Yetenek Düzenle", saveOperation: false })
        showModal();
    }

    const updateSkill = () => {
        var skill = Object.assign({}, selectedSkill, { skillName: skillName })
        skillService.updateSkill(skill).then(response => {
            if (response.data.success && response.status === 200) {
                Notification.showNotification("success", "Yetenek", "Düzenleme işlemi başarılı.");
                findAllSkillByResumeId(resume.id);
                hideModal();
            }
        })
    }

    const hideModal = () => {
        setIsModalVisible(false);
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleSaveSkill} >
                    Yetenek Ekle
                </Button>
            </div>
            {skillList.length
                ? <Table columns={columns} dataSource={skillList} pagination={false} scroll={{ x: 400, y: 220 }} />
                : <NoDataResult title="404" status="404" buttonText="Yetenek Ekle" description="Yetenek Bulunamadı" onAction={showModal} />
            }

            <Modal centered title={modalProperties.saveOperation ? "Yetenek Ekle" : "Yetenek Güncelle"} visible={isModalVisible} onCancel={hideModal}
                footer={[
                    <Button type="primary" danger onClick={hideModal}>
                        İptal
                    </Button>,
                    modalProperties.saveOperation
                        ? <Button onClick={saveSkill} type="primary" icon={<PlusOutlined />} style={{ marginLeft: "5px" }}> Kaydet </Button>
                        : <Button onClick={updateSkill} type="primary" icon={<RedoOutlined />} style={{ marginLeft: "5px" }}> Güncelle </Button>
                ]}>
                <Input value={skillName} onChange={(skillName) => setSkillName(skillName.target.value)} placeholder="Yetenek giriniz..." />
            </Modal>
        </div>
    )
}
