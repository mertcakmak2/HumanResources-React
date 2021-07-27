import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Table, DatePicker, Button, Modal, Input, Checkbox } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined, RedoOutlined } from '@ant-design/icons';
import NoDataResult from '../../../commonComponents/NoDataResult';
import showNotification from '../../../commonComponents/Notification';
import SchoolService from '../../../services/schoolService';
import moment from 'moment';

let schoolService = new SchoolService();

export default function ResumeSchools() {

    const resume = useSelector(state => state.resume)

    const [schoolList, setSchoolList] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalProperties, setModalProperties] = useState({ title: "Eğitim Bilgisi Ekle", saveOperation: true })
    const [school, setSchool] = useState({
        schoolName: "", department: "", beginDate: null, graduationDate: null, graduate: false, resumeId: ""
    });

    const columns = [
        {
            title: 'Başlangıç T.',
            key: 'beginDate',
            dataIndex: 'beginDate'
        }, {
            title: 'Mezuniyet T.',
            key: 'graduationDate',
            dataIndex: 'graduationDate'
        }, {
            title: 'Okul Adı',
            key: 'schoolName',
            dataIndex: 'schoolName'
        }, {
            title: 'Bölüm',
            key: 'department',
            dataIndex: 'department'
        }, {
            title: 'Mezuniyet Durumu',
            key: 'graduate',
            dataIndex: 'graduate'
        }, {
            title: '',
            key: 'İşlemler',
            render: (data) => (
                <div>
                    <Button type="primary" onClick={() => handleDeleteSchool(data)} danger shape="circle" icon={<DeleteOutlined />} />
                    <Button type="primary" onClick={() => handleUpdateSchool(data)} shape="circle" icon={<EditOutlined />} style={{ marginLeft: "5px" }} />
                </div>
            ),
        },
    ];

    useEffect(() => {
        if(resume.id) findAllSchoolByResumeId(resume.id);
    }, [resume])

    const findAllSchoolByResumeId = (resumeId) => {
        schoolService.findAllSchoolByResumeId(resumeId).then(response => {
            if (response.data && response.data.success && response.status === 200) {
                response.data.data.map(x => x.key = x.id)
                setSchoolList(response.data.data)
            }
        })
    }

    const handleSaveSchool = () => {
        setSchool({
            schoolName: "", department: "", beginDate: null, graduationDate: null, graduate: false, resumeId: ""
        });
        setModalProperties({ title: "Eğitim Bilgisi Ekle", saveOperation: true });
        showModal();
    }

    const saveSchool = () => {
        var newSchool = school
        newSchool.resumeId = resume.id
        schoolService.saveSchool(newSchool).then(response => {
            if (response.data && response.data.success && response.status === 201) {
                showNotification("success", "Eğitim Bilgisi", "Ekleme işlemi başarılı.");
                findAllSchoolByResumeId(resume.id);
                hideModal();
            }
        })
    }

    const handleDeleteSchool = (school) => {
        deleteSchool(school.id)
    }

    const deleteSchool = (schoolId) => {
        schoolService.deleteSchool(schoolId).then(response => {
            if (response.data && response.data.success && response.status === 200) {
                showNotification("success", "Eğitim Bilgisi", "Silme işlemi başarılı.");
                findAllSchoolByResumeId(resume.id);
                hideModal();
            }
        })
    }

    const handleUpdateSchool = (school) => {
        setModalProperties({ title: "Eğitim Bilgisini Düzenle", saveOperation: false })
        setSchool(school);
        showModal();
    }

    const updateSchool = () => {
        schoolService.updateSchool(school).then(response => {
            if (response.data && response.data.success && response.status === 200) {
                showNotification("success", "Eğitim Bilgisi", "Düzenleme işlemi başarılı.");
                findAllSchoolByResumeId(resume.id);
                hideModal();
            }
        })
    }

    const onChangeDateInput = (date, inputKey) => {
        if(!date) setSchool(Object.assign({}, school, { [inputKey]: null }))
        else setSchool(Object.assign({}, school, { [inputKey]: moment(date._d).format("YYYY-MM-DD") }))
    }

    const onChangeInput = (e, inputKey) => {
        setSchool(Object.assign({}, school, { [inputKey]: e.target.value }))
    }

    const onChangeGraduate = (e) => {
        setSchool(Object.assign({}, school, { graduate: e.target.checked }))
    }

    const hideModal = () => {
        setIsModalVisible(false);
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const dateFormat = 'YYYY-MM-DD';

    return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleSaveSchool} >
                    Eğitim Bilgisi Ekle
                </Button>
            </div>
            {schoolList.length
                ? <Table columns={columns} dataSource={schoolList} pagination={false} scroll={{ x: 400, y: 220 }} />
                : <NoDataResult title="404" status="404" buttonText="Eğitim Bilgisi Ekle" description="Eğitim Bilgisi Bulunamadı" onAction={showModal} />
            }

            <Modal centered title={modalProperties.saveOperation ? "Eğitim Bilgisi Ekle" : "Eğitim Bilgisi Güncelle"} visible={isModalVisible} onCancel={hideModal}
                footer={[
                    <Button type="primary" danger onClick={hideModal}>
                        İptal
                    </Button>,
                    modalProperties.saveOperation
                        ? <Button type="primary" onClick={saveSchool} icon={<PlusOutlined />} style={{ marginLeft: "5px" }}> Kaydet </Button>
                        : <Button type="primary" onClick={updateSchool} icon={<RedoOutlined />} style={{ marginLeft: "5px" }}> Güncelle </Button>
                ]}>
                <Input value={school.schoolName} onChange={(e) => onChangeInput(e, "schoolName")} placeholder="Okul adını giriniz..." />
                <Input value={school.department} onChange={(e) => onChangeInput(e, "department")} placeholder="Bölüm adını giriniz..." style={{ marginTop: "1em" }} />
                <DatePicker value={ school.beginDate ? moment(school.beginDate, dateFormat) : null} format={dateFormat} onChange={(e) => onChangeDateInput(e, "beginDate")} placeholder="Başlangıç tarihini giriniz..." style={{ marginTop: "1em" }} />
                { school.graduate 
                    ? <DatePicker value={school.graduationDate ? moment(school.graduationDate, dateFormat) : null} format={dateFormat} onChange={(e) => onChangeDateInput(e, "graduationDate")} placeholder="Mezuniyet tarihini giriniz..." style={{ marginLeft: "1em" }} />
                    : null
                }
                <Checkbox checked={school.graduate} onChange={onChangeGraduate} style={{ marginLeft: "1em" }} >Mezun</Checkbox>
            </Modal>
        </div>
    )
}
