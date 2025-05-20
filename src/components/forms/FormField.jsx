import styles from "@/styles/forms/authforms.module.css";
import { CircleAlert } from 'lucide-react';



function FormField({
  name, label, type = 'text',
  placeholder, register,
  rules, errors, ...rest
}) {
  return (
    <div className={styles.authInput}>
      <label htmlFor={name}>{label}</label>
      {type === 'textarea'
        ?
        <textarea className={styles.authTextArea} id={name} placeholder={placeholder}
          {...register(name, rules)}
          {...rest} ></textarea>
        :
        <input id={name} type={type}
          placeholder={placeholder}
          {...register(name, rules)}
          {...rest}
        />}
      {errors[name] && (
        <p className={styles.errorMessage}> <CircleAlert size={'0.65rem'} /> {errors[name].message}</p>
      )}
    </div>
  );
}

export { FormField };
