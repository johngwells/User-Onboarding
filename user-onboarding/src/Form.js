import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';




const UserOnboardingForm = ({ values, errors, touched, status }) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    if (status) {
      setUser([...user, status]);
    }
  }, [status]);

  return (
    <div className='user-form'>
      <Form>
        <Field type='text' name='name' placeholder='name' />
        <Field type='text' name='email' placeholder='email' />
        {touched.email && errors.email && <p className='error'>{errors.email}</p>}
        <Field type='text' name='password' placeholder='password' />
        {touched.password && errors.password && <p className='error'>{errors.password}</p>}
        <label>
          Terms of Service
          <Field type='checkbox' name='tos' value={values.tos} />
        </label>
        <button type='submit'>Submit</button>
      </Form>
      {user.map(user => (
        <ul key={user.id}>
          <li>Name: {user.name}</li>
          <li>Email: {user.email}</li>
          <li>Password: {user.password}</li>
        </ul>
      ))}
    </div>
  );
}

const FormikUserForm = withFormik({
  mapPropsToValues({ name, email, password, tos }) {
    return {
      name: name || '',
      email: email || '',
      password: password || '',
      tos: tos || false
    };
  },

  validationSchema: Yup.object().shape({
    email: Yup.string().required('You must enter an email'),
    password: Yup.string().required('You must enter a password'),
  }),

  handleSubmit(values, { setStatus }) {
    console.log(values);
    axios.post('https://reqres.in/api/users/', values)
    .then(res => {
      setStatus(res.data);
      console.log(res.data);
    })
    .catch(err => console.log(err.res));
  }
})(UserOnboardingForm);
console.log('This is the HOC', FormikUserForm);

export default FormikUserForm;