import React from 'react'
//takes object as its parameter
import { Formik, Form, Field, ErrorMessage, FieldArray, FastField } from 'formik'
import * as Yup from 'yup';
import TextError from './TextError'
const YoutubeForm = () => {

    //see diff between Field and FastField

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
        phNumbers: ['']
    }

    const onSubmit = values => {
        console.log('Form form ', values)
    }

    const validationSchema = Yup.object({
        name: Yup.string().required('Required!'),
        email: Yup.string().email('Invalid email format!').required('Required!'),
        channel: Yup.string().required('Required!')
    })
    //possible usecase render your fields based upon the json that has been fetched from an api call
    const validateComments = value => {
        let error
        if (!value) {
            error = 'Required'
        }
        return error
    }

    return (
        // <Formic initialValue={initialValue} validationSchema={validationSchema} onSubmit={onSubmit}
        //behaves as contextprovider to all three input field
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        // validateOnChange={false}
        // validateOnBlur={false}
        // validateOnMount
        >

            {/* //manually triggering validation for checking if username exist or not */}
            {formik => {
                console.log('Formik props', formik)
                {/*  <form onSubmit={formik.handleSubmit}=====<Form */ }
                return (<Form>

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
                        <Field as='textarea' id='comments' name='comments' validate={validateComments} />
                        <ErrorMessage name='comments' component={TextError} />
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
                    </div>
                    <button type="submit">Sumit</button>


                    <div className='form-control'>
                        <label>List of phone numbers</label>
                        <FieldArray name='phNumbers'>
                            {fieldArrayProps => {
                                const { push, remove, form } = fieldArrayProps
                                const { values } = form
                                const { phNumbers } = values
                                // console.log('fieldArrayProps', fieldArrayProps)
                                // console.log('Form errors', form.errors)
                                return (
                                    <div>
                                        {phNumbers.map((phNumber, index) => (
                                            <div key={index}>
                                                <Field name={`phNumbers[${index}]`} />
                                                {index > 0 && (
                                                    <button type='button' onClick={() => remove(index)}>
                                                        {' '} - {' '}
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                        <button type='button' onClick={() => push('')}>
                                            {' '}   + {' '}
                                        </button>
                                    </div>
                                )
                            }}
                        </FieldArray>

                        <button
                            type='button'
                            onClick={() => formik.validateField('comments')}
                        >
                            Validate comments
                        </button>
                        <button
                            type='button'
                            onClick={() => formik.setFieldTouched('comments')}
                        >
                            Visit comments
                        </button>
                        <button type='button' onClick={() => formik.validateForm()}>
                            Validate all
                        </button>
                        <button
                            type='button'
                            onClick={() =>
                                formik.setTouched({
                                    name: true,
                                    email: true,
                                    channel: true,
                                    comments: true
                                })
                            }
                        >
                            Visit all
                        </button>
                        <button
                            type='submit'
                            disabled={!(formik.dirty && formik.isValid)}
                        >
                            Submit
                        </button>
                    </div>
                </Form>

                )
            }}



        </Formik>
    )
}

export default YoutubeForm
//  <Field> == by default renderes html input element

// 1 hooked up input to the top level Formic component 
//2  it uses name attribute to match up the formic state
//3 by default  it will render an input element which is what our youtube form had as well(ie it will hook ip to the onBlur onChange and value of the form field)







//when the error runs
//1 onChange   to stop // validateOnChange={false}

//2 when we blurr out  to stop // validateOnBlur={false}
//3 when Submit

//disabling Submit button in 2 scenarios
//1 validaing of form state   //isValid true errors empty vice versa
//2 Form submission in progress

//dirty is false as soon as form data change from initial load it will become true