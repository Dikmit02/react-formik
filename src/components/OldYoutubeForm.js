import React from 'react'
//takes object as its parameter
import { useFormik } from 'formik'
import * as Yup from 'yup';
const OldYoutubeForm = () => {


    const initialValues = {

        //corresponds to name value of the form
        name: 'Diksha',
        email: '',
        channel: ''
    }
    //values===form values
    const onSubmit = values => {
        console.log('Form form ', values)
    }

    //values===form values

    const validate = values => {
        //3 Conditions
        //1       must return objects
        //values.name values.email values.channel
        //2       error.name error.email error.channel  (should be equal to name attribute in form )
        //3       values must be string  error.name='This field is required'
        let error = {}

        if (!values.name) {

            error.name = 'required'
        }
        if (!values.email) {
            error.email = 'required'
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            error.email = 'Invalid email format'
        }
        if (!values.channel) {
            error.channel = 'required'
        }
        return error
    }

    const validationSchema=Yup.object({
        name:Yup.string().required('Required!'),
        email:Yup.string().email('Invalid email format!').required('Required!'),
        channel:Yup.string().required('Required!')
    })

    //managing the form state 
    //Handling form submissiom
    //Validation and error messages
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
        // validate
    })

    // console.log('Form values ', formik.values)
    // console.log('Form Error  ', formik.errors)

    //onBlur for checked whether isvisited or not
    console.log('Form Blurr  ', formik.touched)



    //flow : takes value from initialValue object and  set that on the values object to, then on changing the foem field value from frontend the onChange event is trigged which fires the handle change method 
    //which will update the value object ,when the value oject updates its passes back in thr form filed
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>

                <div className="form-control ">
                    <label htmlFor='name'>Name</label>
                    <input type='text' id='name' name='name'
                        //read the name attribute and update the corresponding properties in the values object
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        // the values object is assigned to the value ofthe form
                        value={formik.values.name} />
                    {formik.touched.name && formik.errors.name ? <div className='error'>{formik.errors.name}</div> : null}
                </div>

                <div className="form-control ">
                    <label htmlFor='email'>E-mail</label>
                    <input type='email' id='email' name='email'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email} />
                    {formik.touched.email && formik.errors.email ? <div className='error'>{formik.errors.email}</div> : null}
                </div>
                <div className="form-control ">
                    <label htmlFor='channel'>Channel</label>
                    <input type='text' id='channel' name='channel'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.channel} />
                    {formik.touched.channel && formik.errors.channel ? <div className='error'>{formik.errors.channel}</div> : null}

                </div>
                <button type="submit">Sumit</button>
            </form>



        </div>
    )
}

export default OldYoutubeForm




//    {...formik.getFieldProps('name')}====== bottom 3 lines
//  onChange={formik.handleChange}
//  onBlur={formik.handleBlur}
//  value={formik.values.name} 