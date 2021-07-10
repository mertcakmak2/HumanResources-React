import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Modal } from 'antd';
import { Form, Input } from 'antd';

export default function EditInfoModal({ visible }) {

    const [isModalVisible, setIsModalVisible] = useState(visible);

    const validate = values => {
        const errors = {};
        if (!values.firstName) errors.firstName = " boş bırakılamaz";
        if (!values.lastName) errors.lastName = "Soyisim alanı boş bırakılamaz";
        if (!values.email) errors.email = "Email alanı boş bırakılamaz";
        if (!values.position) errors.position = "Email alanı boş bırakılamaz";
        if (!values.mobilePhone) errors.mobilePhone = "Email alanı boş bırakılamaz";

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            position: "",
            mobilePhone: "",
        },
        validate,
        onSubmit: values => {
            console.log(values);
        }
    });

    const onChange = (value, field) => {
        formik.values[field] = value;
    }

    const onBlur = (field) => {
        var value = formik.values[field];
        if (!value) {
            formik.setFieldError(field, "Bu alan boş bırakılamaz");
        } else {
            formik.setFieldError(field, null);
        }
    }

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 5 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 12 },
        },
    };

    const handleOk = () => {
        formik.handleSubmit();
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div>
            <Modal title="Bilgileri Düzenle" visible={isModalVisible} okText="Düzenle" cancelText="İptal" onOk={handleOk} onCancel={handleCancel}>
                <Form {...formItemLayout}>

                    <Form.Item
                        name="firstName"
                        label="Ad"
                        hasFeedback
                        validateStatus={formik.errors.firstName ? "error" : ''}>
                        <Input onBlur={() => onBlur("firstName")} value={formik.values.firstName} onChange={(e) => onChange(e.target.value, "firstName")} placeholder="Adınızı giriniz..." />
                    </Form.Item>

                    <Form.Item
                        name="lastName"
                        label="Soyad"
                        hasFeedback
                        validateStatus={formik.errors.lastName ? "error" : ''}>
                        <Input onBlur={() => onBlur("lastName")} value={formik.values.lastName} onChange={(e) => onChange(e.target.value, "lastName")} placeholder="Soyadınızı giriniz..." />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
                        hasFeedback
                        validateStatus={formik.errors.email ? "error" : ''}>
                        <Input onBlur={() => onBlur("email")} value={formik.values.email} onChange={(e) => onChange(e.target.value, "email")} placeholder="Email adresinizi giriniz..." />
                    </Form.Item>

                    <Form.Item
                        name="position"
                        label="Pozisyon"
                        hasFeedback
                        validateStatus={formik.errors.position ? "error" : ''}>
                        <Input onBlur={() => onBlur("position")} value={formik.values.position} onChange={(e) => onChange(e.target.value, "position")} placeholder="Pozisyonunuzu giriniz..." />
                    </Form.Item>

                    <Form.Item
                        name="mobilePhone"
                        label="Telefon"
                        hasFeedback
                        validateStatus={formik.errors.mobilePhone ? "error" : ''}>
                        <Input onBlur={() => onBlur("mobilePhone")} value={formik.values.mobilePhone} onChange={(e) => onChange(e.target.value, "mobilePhone")} placeholder="Telefon numaranızı giriniz..." />
                    </Form.Item>

                </Form>
            </Modal>
        </div>
    )
}
