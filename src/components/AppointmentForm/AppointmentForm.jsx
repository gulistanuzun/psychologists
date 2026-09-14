import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { appointmentSchema } from "../../schemas/appointmentSchema";
import TimeDropdown from "../TimeDropdown/TimeDropdown";
import styles from "./AppointmentForm.module.css";

const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30",
  "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30",
];

function AppointmentForm({ psychologist, onSuccess }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(appointmentSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    console.log("Appointment request:", data);
    onSuccess();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className={styles.title}>Make an appointment with a psychologists</h2>
      <p className={styles.text}>
        You are on the verge of changing your life for the better. Fill out
        the short form below to book your personal appointment with a
        professional psychologist. We guarantee confidentiality and respect
        for your privacy.
      </p>

      <div className={styles.psychologist}>
        <img
          src={psychologist.avatar_url}
          alt={psychologist.name}
          className={styles.avatar}
        />
        <div>
          <p className={styles.label}>Your psychologist</p>
          <p className={styles.name}>{psychologist.name}</p>
        </div>
      </div>

      <label className={styles.field}>
        <input
          className={styles.input}
          type="text"
          placeholder="Name"
          {...register("name")}
        />
        {errors.name && <span className={styles.error}>{errors.name.message}</span>}
      </label>

      <div className={styles.row}>
        <label className={styles.field}>
          <input
            className={styles.input}
            type="tel"
            placeholder="Phone number"
            {...register("phone")}
          />
          {errors.phone && <span className={styles.error}>{errors.phone.message}</span>}
        </label>

        <label className={styles.field}>
          <Controller
            name="meetingTime"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TimeDropdown
                options={TIME_SLOTS}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {errors.meetingTime && (
            <span className={styles.error}>{errors.meetingTime.message}</span>
          )}
        </label>
      </div>

      <label className={styles.field}>
        <input
          className={styles.input}
          type="email"
          placeholder="Email"
          {...register("email")}
        />
        {errors.email && <span className={styles.error}>{errors.email.message}</span>}
      </label>

      <label className={styles.field}>
        <textarea
          className={styles.textarea}
          placeholder="Comment"
          rows={4}
          {...register("comment")}
        />
        {errors.comment && (
          <span className={styles.error}>{errors.comment.message}</span>
        )}
      </label>

      <button className={styles.submit} type="submit" disabled={isSubmitting}>
        Send
      </button>
    </form>
  );
}

export default AppointmentForm;
