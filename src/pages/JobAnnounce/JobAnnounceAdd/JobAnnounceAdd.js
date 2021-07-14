import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik';
import { Form, Input, Button, Select, DatePicker, InputNumber } from 'antd';
import JobTypeService from '../../../services/jobTypeService';
import JobPositionService from '../../../services/jobPositionService';
import CityService from '../../../services/cityService';
import WorkingConceptService from '../../../services/workingConceptService';
import JobService from '../../../services/jobService';
import Notification from '../../../commonComponents/Notification';
import Text from 'antd/lib/typography/Text';

const { Option } = Select;
const { TextArea } = Input;

const validate = values => {
    const errors = {};
    if (!values.jobPosition) errors.jobPosition = "Pozisyon alanı boş bırakılamaz";
    if (!values.jobType) errors.jobType = "Çalışma şekli alanı boş bırakılamaz"
    if (!values.workingConcept) errors.workingConcept = "Çalışma yeri alanı boş bırakılamaz"
    if (!values.city) errors.city = "Şehir alanı boş bırakılamaz"
    if (!values.jobDescription) errors.jobDescription = "AÇıklama alanı boş bırakılamaz"
    if (values.maxSalary < values.minSalary) errors.maxSalary = "Maximum maaş minimum maaştan düşük olamaz"

    return errors;
};

const formInitialValues = {
    jobPosition: null, lastDateOfAppeal: null, jobType: null, workingConcept: null, minSalary: "",
    maxSalary: "", positionCount: 1, city: null, jobDescription: ""
}

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
};

export default function JobAdd() {

    const [jobTypes, setJobTypes] = useState([])
    const [jobPositions, setjobPositions] = useState([])
    const [cities, setCities] = useState([])
    const [workingConcepts, setWorkingConcepts] = useState([])
    const [formInputs, setFormInputs] = useState(formInitialValues)

    useEffect(() => {
        let jobTypeService = new JobTypeService();
        let jobPositionService = new JobPositionService();
        let cityService = new CityService();
        let workingConceptService = new WorkingConceptService();

        Promise.all([
            jobTypeService.findAllJobTypes(),
            jobPositionService.findAllJobPositions(),
            cityService.findAllCities(),
            workingConceptService.findAllWorkingConcepts()
        ]).then(result => {
            if (result[0].status === 200 && result[1].status === 200 && result[2].status === 200 && result[3].status === 200) {
                setJobTypes(result[0].data.data);
                setjobPositions(result[1].data.data)
                setCities(result[2].data.data)
                setWorkingConcepts(result[3].data.data)
            }
        })
    }, [])

    const formik = useFormik({
        initialValues: formInitialValues,
        validate,
        onSubmit: (values) => {
            var jobAnnounce = {
                "announceDate": new Date(),
                "jobPosition": jobPositions.find(p => p.id === values.jobPosition),
                "jobType": jobTypes.find(t => t.id === values.jobType),
                "workingConcept": workingConcepts.find(c => c.id === values.workingConcept),
                "city": cities.find(c => c.id === values.city),
                "employer": {
                    "id": 2,
                    "email": "admin2@gmail.com",
                    "firstName": "admin",
                    "lastName": "admin",
                    "companyName": "admin2 company",
                    "companyWebSite": "admin company WebSite",
                    "mobilePhone": "56808651223"
                },
                "jobDescription": values.jobDescription,
                "lastDateOfAppeal": values.lastDateOfAppeal ? values.lastDateOfAppeal.format("YYYY-MM-DD") : null,
                "minSalary": values.minSalary,
                "maxSalary": values.maxSalary,
                "positionCount": values.positionCount
            }
            let jobService = new JobService();
            jobService.announceJob(jobAnnounce).then(response => {
                if (response?.data?.success && response.status === 201) {
                    Notification.showNotification("success", "İş İlanı", "Başarıyla eklendi.")
                    resetForm();
                } else Notification.showNotification("error", "İş İlanı", "İşlem sırasında bir hata oluştu.")
            })
        }
    });

    const resetForm = () => {
        setFormInputs({
            jobPosition: null, lastDateOfAppeal: null, jobType: null, workingConcept: null, minSalary: "",
            maxSalary: "", positionCount: 1, city: null, jobDescription: ""
        })
    }

    const onChange = (input, value) => {
        formik.values[input] = value
        var newFormInputs = { ...formInputs, [input]: value }
        setFormInputs(newFormInputs);
    }

    return (
        <form onSubmit={formik.handleSubmit}>

            <Form.Item
                {...formItemLayout}
                label="Pozisyon"
                validateStatus={formik.errors.jobPosition ? "error" : ""}>
                <Select onSelect={(position) => { onChange("jobPosition", position) }} value={formInputs.jobPosition} placeholder="Pozisyon seçiniz..">
                    {jobPositions.map(position => (<Option key={position.id} value={position.id}>{position.positionName}</Option>))}
                </Select>
                {formik.errors.jobPosition ? <Text type="danger">{formik.errors.jobPosition}</Text> : null}

            </Form.Item>

            <Form.Item
                {...formItemLayout}
                label="Çalışma Şekli"
                validateStatus={formik.errors.jobType ? "error" : ""}>
                <Select onSelect={(jobType) => { onChange("jobType", jobType) }} value={formInputs.jobType} placeholder="Çalışma şekli seçiniz..">
                    {jobTypes.map(jobType => (<Option key={jobType.id} value={jobType.id}>{jobType.type}</Option>))}
                </Select>
                {formik.errors.jobType ? <Text type="danger">{formik.errors.jobType}</Text> : null}
            </Form.Item>

            <Form.Item
                {...formItemLayout}
                label="Çalışma Yeri"
                validateStatus={formik.errors.workingConcept ? "error" : ""}>
                <Select onSelect={(workingConcept) => { onChange("workingConcept", workingConcept) }} value={formInputs.workingConcept} placeholder="Çalışma tipini seçiniz..">
                    {workingConcepts.map(concept => (<Option key={concept.id} value={concept.id}>{concept.place}</Option>))}
                </Select>
                {formik.errors.workingConcept ? <Text type="danger">{formik.errors.workingConcept}</Text> : null}
            </Form.Item>

            <Form.Item
                {...formItemLayout}
                label="Alınacak Kişi Sayısı">
                <InputNumber onChange={(jobPositionCount) => { onChange("jobPositionCount", jobPositionCount) }} value={formInputs.jobPositionCount} min={1} defaultValue={1} />
            </Form.Item>

            <Form.Item label="Maaş" {...formItemLayout} style={{ marginBottom: 0 }}>
                <Form.Item
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}>
                    <Input onChange={(event) => { onChange("minSalary", event.target.value) }} value={formInputs.minSalary} placeholder="Minimum Maaş" />
                </Form.Item>

                <Form.Item
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                    validateStatus={formik.errors.maxSalary ? "error" : ""}>
                    <Input onChange={(event) => { onChange("maxSalary", event.target.value) }} value={formInputs.maxSalary} placeholder="Maximum Maaş" />
                    {formik.errors.maxSalary ? <Text type="danger">{formik.errors.maxSalary}</Text> : null}
                </Form.Item>
            </Form.Item>

            <Form.Item label="Şehir / Son Başvuru Tarihi" {...formItemLayout} style={{ marginBottom: 0 }}>
                <Form.Item
                    rules={[{ required: true }]}
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                    validateStatus={formik.errors.city ? "error" : ""}>
                    <Select onSelect={(city) => { onChange("city", city) }} value={formInputs.city} placeholder="Şehir seçiniz..">
                        {cities.map(city => (<Option key={city.id} value={city.id}>{city.name}</Option>))}
                    </Select>
                    {formik.errors.city ? <Text type="danger">{formik.errors.city}</Text> : null}
                </Form.Item>
                <Form.Item
                    rules={[{ required: true }]}
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}>
                    <DatePicker onChange={(lastDateOfAppeal) => { onChange("lastDateOfAppeal", lastDateOfAppeal) }} value={formInputs.lastDateOfAppeal} placeholder="Tarih seçiniz.." />
                </Form.Item>
            </Form.Item>

            <Form.Item
                {...formItemLayout}
                label="İş Açıklaması"
                validateStatus={formik.errors.jobDescription ? "error" : ""}>
                <TextArea onChange={(event) => { onChange("jobDescription", event.target.value) }} value={formInputs.jobDescription} showCount maxLength={255} />
                {formik.errors.jobDescription ? <Text type="danger">{formik.errors.jobDescription}</Text> : null}
            </Form.Item>

            <Form.Item>
                <Button onClick={formik.handleSubmit} type="primary" className="login-form-button"> İlanı Ver </Button>
            </Form.Item>

            {/* <Form.Item
                {...formItemLayout}
                id="jobPosition"
                name="jobPosition"
                label="Pozisyon">
                <Select onSelect={(position) => { formik.values.jobPosition = position }} placeholder="Pozisyon seçiniz..">
                    {jobPositions.map(position => (<Option key={position.id} value={position.id}>{position.positionName}</Option>))}
                </Select>
                {formik.errors.jobPosition ? <Alert type="error" message={formik.errors.jobPosition} banner /> : null}

            </Form.Item>

            <Form.Item
                {...formItemLayout}
                name="jobType"
                label="Çalışma Şekli">
                <Select onChange={(jobType) => { formik.values.jobType = jobType }} placeholder="Çalışma şekli seçiniz..">
                    {jobTypes.map(jobType => (<Option key={jobType.id} value={jobType.id}>{jobType.type}</Option>))}
                </Select>
                {formik.errors.jobType ? <Alert type="error" message={formik.errors.jobType} banner /> : null}
            </Form.Item>

            <Form.Item
                {...formItemLayout}
                name="workingConcept"
                label="Çalışma Yeri">
                <Select onChange={(workingConcept) => { formik.values.workingConcept = workingConcept }} placeholder="Çalışma tipini seçiniz..">
                    {workingConcepts.map(concept => (<Option key={concept.id} value={concept.id}>{concept.place}</Option>))}
                </Select>
                {formik.errors.workingConcept ? <Alert type="error" message={formik.errors.workingConcept} banner /> : null}
            </Form.Item>

            <Form.Item
                {...formItemLayout}
                name="positionCount"
                label="Alınacak Kişi Sayısı">
                <InputNumber onChange={(count) => { formik.values.positionCount = count }} min={1} defaultValue={1} />
            </Form.Item>

            <Form.Item label="Maaş" {...formItemLayout} style={{ marginBottom: 0 }}>
                <Form.Item
                    name="minSalary"
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}>
                    <Input onChange={(event) => { formik.values.minSalary = event.target.value }} placeholder="Minimum Maaş" />
                </Form.Item>

                <Form.Item
                    name="maxSalary"
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }} >
                    <Input onChange={(event) => { formik.values.maxSalary = event.target.value }} placeholder="Maximum Maaş" />
                    {formik.errors.maxSalary ? <Alert type="error" message={formik.errors.maxSalary} banner /> : null}
                </Form.Item>
            </Form.Item>

            <Form.Item label="Şehir / Son Başvuru Tarihi" {...formItemLayout} style={{ marginBottom: 0 }}>
                <Form.Item
                    name="city"
                    rules={[{ required: true }]}
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)' }} >
                    <Select onChange={(city) => { formik.values.city = city }} placeholder="Şehir seçiniz..">
                        {cities.map(city => (<Option key={city.id} value={city.id}>{city.name}</Option>))}
                    </Select>
                    {formik.errors.city ? <Alert type="error" message={formik.errors.city} banner /> : null}
                </Form.Item>
                <Form.Item
                    name="lastDateOfAppeal"
                    rules={[{ required: true }]}
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}>
                    <DatePicker onChange={(date) => { formik.values.lastDateOfAppeal = date }} placeholder="Tarih seçiniz.." />
                </Form.Item>
            </Form.Item>

            <Form.Item
                {...formItemLayout}
                name="jobDescription"
                label="İş Açıklaması" >
                <TextArea onChange={(event) => { formik.values.jobDescription = event.target.value }} showCount maxLength={255} />
                {formik.errors.jobDescription ? <Alert type="error" message={formik.errors.jobDescription} banner /> : null}
            </Form.Item>

            <Form.Item>
                <Button onClick={formik.handleSubmit} type="primary" className="login-form-button"> İlanı Ver </Button>
            </Form.Item> */}
        </form>

    );
}
