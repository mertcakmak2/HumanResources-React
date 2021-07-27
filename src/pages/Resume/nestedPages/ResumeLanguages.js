import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Table, Button, Modal, Input, InputNumber } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined, RedoOutlined } from '@ant-design/icons';
import NoDataResult from '../../../commonComponents/NoDataResult';
import showNotification from '../../../commonComponents/Notification';
import LanguageService from '../../../services/languageService';

let languageService = new LanguageService();

export default function ResumeLanguages() {

    const resume = useSelector(state => state.resume)

    const [languageList, setLanguageList] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalProperties, setModalProperties] = useState({ title: "Eğitim Bilgisi Ekle", saveOperation: true })
    const [language, setLanguage] = useState({ languageName: "", languageLevel: "1" })

    useEffect(() => {
        if (resume.id) findAllLanguageByResumeId(resume.id);
    }, [resume])

    const findAllLanguageByResumeId = (resumeId) => {
        languageService.findAllLanguageByResumeId(resumeId).then(response => {
            if (response.data && response.data.success && response.status === 200) {
                response.data.data.map(x => x.key = x.id)
                setLanguageList(response.data.data)
            }
        })
    }

    const handleSaveLanguage = () => {
        setModalProperties({ title: "Eğitim Bilgisi Ekle", saveOperation: true })
        setLanguage({ languageName: "", languageLevel: "1" })
        showModal();
    }

    const saveLanguage = () => {
        language.resumeId = resume.id
        languageService.saveLanguage(language).then(response => {
            if (response.data && response.data.success && response.status === 201) {
                findAllLanguageByResumeId(resume.id)
                showNotification("success", "Yabancı Dil", "Ekleme işlemi başarılı.");
                hideModal();
            }
        })
    }

    const handleUpdateLanguage = (language) => {
        setModalProperties({ title: "Eğitim Bilgisi Ekle", saveOperation: false })
        setLanguage(language);
        showModal();
    }

    const updateLanguage = () => {
        languageService.updateLanguage(language).then(response => {
            if (response.data && response.data.success && response.status === 200) {
                findAllLanguageByResumeId(resume.id);
                showNotification("success", "Yabancı Dil", "Düzenleme işlemi başarılı.");
                hideModal();
            }
        })
    }

    const handleDeleteLanguage = (languageId) => {
        deleteLanguage(languageId);
    }

    const deleteLanguage = (languageId) => {
        languageService.deleteLanguage(languageId).then(response => {
            if (response.data && response.data.success && response.status === 200) {
                findAllLanguageByResumeId(resume.id)
                showNotification("success", "Yabancı Dil", "Silme işlemi başarılı.");
            }
        })
    }

    const onChangeLanguageName = (e) => {
        setLanguage(Object.assign({}, language, { "languageName": e.target.value }))
    }

    const onChangeLanguageLevel = (e) => {
        setLanguage(Object.assign({}, language, { "languageLevel": e }))
    }

    const hideModal = () => {
        setIsModalVisible(false);
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const columns = [
        {
            title: 'Dil',
            key: 'languageName',
            dataIndex: 'languageName',
        },
        {
            title: "Seviye",
            key: "languageLevel",
            dataIndex: "languageLevel"
        },
        {
            title: '',
            key: 'İşlemler',
            render: (language) => (
                <div>
                    <Button onClick={() => handleDeleteLanguage(language.id)} type="primary" danger shape="circle" icon={<DeleteOutlined />} />
                    <Button onClick={() => handleUpdateLanguage(language)} type="primary" shape="circle" icon={<EditOutlined />} style={{ marginLeft: "5px" }} />
                </div>
            ),
        },
    ];

    return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <Button type="primary" onClick={handleSaveLanguage} icon={<PlusOutlined />}  >
                    Yabancı Dil Ekle
                </Button>
            </div>
            {languageList.length
                ? <Table columns={columns} dataSource={languageList} pagination={false} scroll={{ x: 400, y: 220 }} />
                : <NoDataResult title="404" status="404" buttonText="Yabancı Dil Ekle" description="Yabancı Dil Bulunamadı" onAction={showModal} />
            }

            <Modal centered title={modalProperties.saveOperation ? "Yabancı Dil Ekle" : "Yabancı Dil Güncelle"} visible={isModalVisible} onCancel={hideModal}
                footer={[
                    <Button type="primary" danger onClick={hideModal}>
                        İptal
                    </Button>,
                    modalProperties.saveOperation
                        ? <Button type="primary" onClick={saveLanguage} icon={<PlusOutlined />} style={{ marginLeft: "5px" }}> Kaydet </Button>
                        : <Button type="primary" onClick={updateLanguage} icon={<RedoOutlined />} style={{ marginLeft: "5px" }}> Güncelle </Button>
                ]}>
                <Input value={language.languageName} placeholder="Yabancı dil adını giriniz..." onChange={onChangeLanguageName} />
                <InputNumber value={language.languageLevel} min={1} max={5} defaultValue={1} onChange={onChangeLanguageLevel} style={{ marginTop: "1em" }} />
            </Modal>

        </div>
    )
}
