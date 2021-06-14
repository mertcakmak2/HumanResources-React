import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik';
import { Form, Input, Button, Select, DatePicker, InputNumber, Alert } from 'antd';
import JobTypeService from '../../../services/jobTypeService';
import JobPositionService from '../../../services/jobPositionService';
import CityService from '../../../services/cityService';

const { Option } = Select;
const { TextArea } = Input;

const validate = values => {
    const errors = {};
    if (!values.jobPosition)  errors.jobPosition = "Required job position";

    if (!values.jobType) errors.jobType = "Required job type"

    if (!values.workingConcept) errors.workingConcept = "Required working concept"

    if (!values.city) errors.city = "Required city"

    if (!values.jobDescription) errors.jobDescription = "Required job Description"
    
    return errors;
};

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
};

export default function JobAdd() {

    const [jobTypes, setJobTypes] = useState([])
    const [jobPosition, setjobPositions] = useState([])
    const [city, setCities] = useState([])

    useEffect(() => {
        let jobTypeService = new JobTypeService();
        let jobPositionService = new JobPositionService();
        let cityService = new CityService();
        Promise.all([
            jobTypeService.findAllJobTypes(),
            jobPositionService.findAllJobPositions(),
            cityService.findAllCities()
        ]).then(result => {
            if(result[0].status === 200 && result[1].status === 200 && result[2].status === 200 ){
                setJobTypes(result[0].data.data);
                setjobPositions(result[1].data.data)
                setCities(result[2].data.data)
            }
        })
    }, [])

    const formik = useFormik({
        initialValues: {
            jobPosition: "",
            lastDateOfAppeal: null,
            jobType: "",
            workingConcept: "",
            minSalary: "",
            maxSalary: "",
            positionCount: 1,
            city: "",
            jobDescription:""
        },
        validate,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>

            <Form.Item
                {...formItemLayout}
                id="jobPosition"
                name="jobPosition"
                label="Pozisyon"
            >
                <Select onSelect={(position) => { console.log(position); }} placeholder="Pozisyon seçiniz..">
                    <Option value="1">Male</Option>
                    <Option value="2">Female</Option>
                    <Option value="3">Other</Option>
                </Select>
                {formik.errors.jobPosition ? <Alert type="error" message={formik.errors.jobPosition} banner /> : null}

            </Form.Item>

            <Form.Item
                {...formItemLayout}
                name="jobType"
                label="Çalışma Şekli"
            >
                <Select onChange={(jobType) => { formik.values.jobType = jobType }} placeholder="Çalışma şekli seçiniz..">
                    { jobTypes.map(jobType => (<Option key={jobType.id} value={jobType.id}>{jobType.type}</Option>))  }
                </Select>
            </Form.Item>

            <Form.Item
                {...formItemLayout}
                name="workingConcept"
                label="Çalışma Yeri"
            >
                <Select onChange={(workingConcept) => { formik.values.workingConcept = workingConcept }} placeholder="Çalışma tipini seçiniz..">
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="other">Other</Option>
                </Select>
            </Form.Item>

            <Form.Item
                {...formItemLayout}
                name="positionCount"
                label="Alınacak Kişi Sayısı"
            >
                <InputNumber onChange={(count) => {formik.values.positionCount = count} } min={1} defaultValue={1} />
            </Form.Item>

            <Form.Item label="Maaş" {...formItemLayout} style={{ marginBottom: 0 }}>
                <Form.Item
                    name="minSalary"
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                >
                    <Input onChange={(event) => {formik.values.minSalary = event.target.value} } placeholder="Minimum Maaş" />
                </Form.Item>

                <Form.Item
                    name="maxSalary"
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                >
                    <Input onChange={(event) => {formik.values.maxSalary = event.target.value} } placeholder="Maximum Maaş" />
                </Form.Item>
            </Form.Item>

            <Form.Item label="Şehir / Son Başvuru Tarihi" {...formItemLayout} style={{ marginBottom: 0 }}>
                <Form.Item
                    name="city"
                    rules={[{ required: true }]}
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                >
                    <Select onChange={(city) => { formik.values.city = city }} placeholder="select your gender">
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                        <Option value="other">Other</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="lastDateOfAppeal"
                    rules={[{ required: true }]}
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                >
                    <DatePicker onChange={(date) => {formik.values.lastDateOfAppeal = date}} />
                </Form.Item>
            </Form.Item>

            <Form.Item
                {...formItemLayout}
                name="jobDescription"
                label="İş Açıklaması"
            >
                <TextArea onChange={(event) => {formik.values.jobDescription = event.target.value} } showCount maxLength={255} />
            </Form.Item>

            <Form.Item>
                <Button onClick={formik.handleSubmit} type="primary" className="login-form-button"> İlanı Ver </Button>
            </Form.Item>
        </form>

    );
}
