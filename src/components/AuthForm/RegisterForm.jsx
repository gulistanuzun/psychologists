import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../schemas/authSchemas";
import { useAuth } from "../../context/AuthContext";
import styles from "./AuthForm.module.css";

function RegisterForm({ onSuccess }) {
  const { register: registerUser } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    try {
      await registerUser(data.email, data.password);
      onSuccess();
    } catch {
      setError("root", { message: "Registration failed. Try another email." });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className={styles.title}>Registration</h2>
      <p className={styles.text}>
        Thank you for your interest in our platform! Please provide the following
        information.
      </p>

      <label className={styles.field}>
        <input
          className={styles.input}
          type="text"
          placeholder="Name"
          {...register("name")}
        />
        {errors.name && (
          <span className={styles.error}>{errors.name.message}</span>
        )}
      </label>

      <label className={styles.field}>
        <input
          className={styles.input}
          type="email"
          placeholder="Email"
          {...register("email")}
        />
        {errors.email && (
          <span className={styles.error}>{errors.email.message}</span>
        )}
      </label>

      <label className={styles.field}>
        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && (
          <span className={styles.error}>{errors.password.message}</span>
        )}
      </label>

      {errors.root && <span className={styles.error}>{errors.root.message}</span>}

      <button className={styles.submit} type="submit" disabled={isSubmitting}>
        Sign Up
      </button>
    </form>
  );
}

export default RegisterForm;
