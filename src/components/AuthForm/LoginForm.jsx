import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../schemas/authSchemas";
import { useAuth } from "../../context/AuthContext";
import styles from "./AuthForm.module.css";

function LoginForm({ onSuccess }) {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      onSuccess();
    } catch {
      setError("root", { message: "Invalid email or password" });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className={styles.title}>Log In</h2>
      <p className={styles.text}>
        Welcome back! Please enter your credentials to access your account.
      </p>

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
        Log In
      </button>
    </form>
  );
}

export default LoginForm;
