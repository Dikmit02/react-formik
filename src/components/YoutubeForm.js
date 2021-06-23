import React from 'react'
//takes object as its parameter
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
const YoutubeForm = () => {


    const initialValues = {
        name: 'Diksha',
        email: '',
        channel: ''
    }

    const onSubmit = values => {
        console.log('Form form ', values)
    }

    const validationSchema = Yup.object({
        name: Yup.string().required('Required!'),
        email: Yup.string().email('Invalid email format!').required('Required!'),
        channel: Yup.string().required('Required!')
    })



    return (
        // <Formic initialValue={initialValue} validationSchema={validationSchema} onSubmit={onSubmit}
        //behaves as contextprovider to all three input field
        <Formik initialValue={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {/*  <form onSubmit={formik.handleSubmit}=====<Form */}
            <Form>

                <div className="form-control ">
                    <label htmlFor='name'>Name</label>
                    <Field type='text' id='name' name='name'
                    />
                    <ErrorMessage name='name' />
                </div>

                <div className="form-control ">
                    <label htmlFor='email'>E-mail</label>
                    <Field type='email' id='email' name='email'
                    />
                    <ErrorMessage name='email' />
                </div>
                <div className="form-control ">
                    <label htmlFor='channel'>Channel</label>
                    <Field type='text' id='channel' name='channel'
                    />
                    <ErrorMessage name='channel' />
                </div>
                <button type="submit">Sumit</button>
            </Form>



        </Formik>
    )
}

export default YoutubeForm
//  <Field>
// 1 hooked up inut to the top level Formic component
//2  it uses name attribute to match up the formic state
//3 by default  it will render an input element which is what our youtube form had as well