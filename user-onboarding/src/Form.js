import React from 'react';
import { withFormik, Form, Field } from 'formik';

const UserOnboardingForm = () => {
  return (
    <div className='user-form'>
      <Form>
        <Field type='text' name='name' placeholder='name' />
      </Form>
    </div>
  );
}

const FormikUserForm = withFormik({
  mapPropsToValues({ name }) {
    return {
      name: name || ''
    };
  },
  handleSubmit(values) {
    console.log(values);
  }
})(UserOnboardingForm);
console.log('This is the HOC', FormikUserForm);

export default FormikUserForm;