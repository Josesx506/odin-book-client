'use client'

import { ContainedButton } from '@/components/Buttons';
import { FormField } from '@/components/forms/FormField';
import useFormValidation, { validationRules } from '@/hooks/useFormValidation';
import styles from '@/styles/forms/authforms.module.css';
import { registerUserAction } from '@/utils/authAction';
import Form from 'next/form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function SignUp() {
  const {
    register,
    formState: { errors },
    watch, reset,
    submitWithSanitization } = useFormValidation();

  const password = watch("password");
  const navigate = useRouter();
  const [loading, setLoading] = useState(false);

  // Submit the form with fetch request server action
  const onSubmit = async (sanitizedData) => {
    try {
      setLoading(true);
      const result = await registerUserAction(sanitizedData);
      if (!result.success) {
        toast.error(result.error);
        reset();
      } else {
        toast.success('User registered! Redirecting...');
        navigate.push('/signin');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className={styles.authContainer}>
        <div className={styles.authFormContainer}>
          <h3 style={{ textAlign: 'center' }}>Registration</h3>

          <Form className={styles.authForm} onSubmit={submitWithSanitization(onSubmit)}>
            
            <FormField name={'fullname'} label={'Full name'} placeholder={'First and Last name'}
              register={register} rules={validationRules.name} errors={errors} />
            <FormField name={'username'} label={'Username'} placeholder={'Enter username'}
              register={register} rules={validationRules.username} errors={errors} />
            <FormField type={'email'} name={'email'} label={'Email'} placeholder={'Enter Email'}
              register={register} rules={validationRules.email} errors={errors} />
            <FormField type={'password'} name={'password'} label={'Password'}
              placeholder={'Enter Password'} register={register} rules={validationRules.password}
              errors={errors} />
            <FormField type={'password'} name={'confirmPassword'} label={'Confirm Password'}
              placeholder={'Re-enter Password'} errors={errors}
              register={register} rules={{
                required: 'Please confirm your password',
                validate: value => value === password || 'Passwords do not match'
              }} />

            <div className={styles.authSubmit}>
              <ContainedButton disabled={loading}>Sign Up</ContainedButton>
            </div>
          </Form>
        </div>
        <div className={styles.authLinksContainer}>
          <div className={styles.authLink}>Registered? <Link href={'/signin'}>Sign in</Link> here</div>        
        </div>
      </div>

    </div>
  )
}
