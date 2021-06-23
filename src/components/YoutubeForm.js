import React from 'react'
//takes object as its parameter
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import TextError from './TextError'
const YoutubeForm = () => {


    const initialValues = {
        name: 'Diksha',
        email: '',
        channel: '',
        comments: '',
        address: '',
        social: {
            facebook: '',
            twitter: '',
        },
        phoneNumbers: ['', ''],
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
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {/*  <form onSubmit={formik.handleSubmit}=====<Form */}
            <Form>

                <div className="form-control ">
                    <label htmlFor='name'>Name</label>
                    <Field type='text' id='name' name='name'
                    />
                    <ErrorMessage name='name' component={TextError} />
                </div>

                <div className="form-control ">
                    <label htmlFor='email'>E-mail</label>
                    <Field type='email' id='email' name='email'
                    />
                    <ErrorMessage name='email' >
                        {error => <div className='error'>{error}</div>}
                    </ErrorMessage>
                </div>
                <div className="form-control ">
                    <label htmlFor='channel'>Channel</label>
                    <Field type='text' id='channel' name='channel'
                    />
                    <ErrorMessage name='channel' component={TextError} />
                </div>

                <div className="form-control">
                    <label htmlFor="comments">Comment</label>
                    <Field as='textarea' id='comments' name='comments'></Field>
                </div>

                <div className="form-control">
                    <label htmlFor="address">Address</label>
                    <Field name='address'>
                        {/* //using function as children to the component */}
                        {
                            (props) => {
                                // console.log('Props ',props)
                                const { field, form, meta } = props
                                // this input isnot hooked to the formik in any way
                                return <div>
                                    <input type='text' id="address" {...field} />
                                    {meta.touched && meta.error ? <div>{meta.error}</div> : null}
                                </div>
                            }
                        }
                    </Field>

                </div>

                <div className="form-control">
                    <label htmlFor="facebook">Facebook Profile</label>
                    <Field type='text' id='facebook' name='social.facebook'></Field>
                </div>

                <div className="form-control">
                    <label htmlFor="twitter">Twitter Profile</label>
                    <Field type='text' id='twitter' name='social.twitter'></Field>
                </div>

                <div className='form-control'>
                    <label htmlFor='primaryPh'>Primary phone number</label>
                    <Field type='text' id='primaryPh' name='phoneNumbers[0]' />
                </div>

                <div className='form-control'>
                    <label htmlFor='secondaryPh'>Secondary phone number</label>
                    <Field type='text' id='secondaryPh' name='phoneNumbers[1]' />
                </div>v
                <button type="submit">Sumit</button>
            </Form>



        </Formik>
    )
}

export default YoutubeForm
//  <Field> == by default renderes html input element

// 1 hooked up input to the top level Formic component 
//2  it uses name attribute to match up the formic state
//3 by default  it will render an input element which is what our youtube form had as well(ie it will hook ip to the onBlur onChange and value of the form field)