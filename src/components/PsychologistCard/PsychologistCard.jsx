import { useState } from "react";
import styles from "./PsychologistCard.module.css";

export default function PsychologistCard({
  psychologist,
  isFavorite = false,
  onToggleFavorite,
}) {
  const [expanded, setExpanded] = useState(false);

  const {
    name,
    avatar_url,
    experience,
    reviews = [],
    price_per_hour,
    rating,
    license,
    specialization,
    initial_consultation,
    about,
  } = psychologist;

  return (
    <article className={styles.card}>
      <div className={styles.avatarWrap}>
        <img
          src={avatar_url}
          alt={name}
          className={styles.avatar}
          loading="lazy"
        />
      </div>

      <div className={styles.body}>
        <div className={styles.head}>
          <div>
            <p className={styles.label}>Psychologist</p>
            <h2 className={styles.name}>{name}</h2>
          </div>

          <div className={styles.headRight}>
            <span className={styles.rating}>&#9733; Rating: {rating}</span>
            <span className={styles.divider} aria-hidden="true" />
            <span className={styles.price}>
              Price / 1 hour:{" "}
              <b className={styles.priceValue}>{price_per_hour}$</b>
            </span>
            <button
              type="button"
              className={styles.heart}
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
              aria-pressed={isFavorite}
              onClick={onToggleFavorite}
            >
              {isFavorite ? "\u2665" : "\u2661"}
            </button>
          </div>
        </div>

        <ul className={styles.meta}>
          <li><span>Experience:</span> {experience}</li>
          <li><span>License:</span> {license}</li>
          <li><span>Specialization:</span> {specialization}</li>
          <li><span>Initial consultation:</span> {initial_consultation}</li>
        </ul>

        <p className={styles.about}>{about}</p>

        {!expanded && (
          <button
            type="button"
            className={styles.readMore}
            onClick={() => setExpanded(true)}
          >
            Read more
          </button>
        )}

        {expanded && (
          <div className={styles.details}>
            <ul className={styles.reviews}>
              {reviews.map((r, i) => (
                <li key={i} className={styles.review}>
                  <div className={styles.reviewHead}>
                    <span className={styles.reviewer}>{r.reviewer}</span>
                    <span className={styles.reviewRating}>
                      &#9733; {r.rating}
                    </span>
                  </div>
                  <p className={styles.reviewText}>{r.comment}</p>
                </li>
              ))}
            </ul>

            <button type="button" className={styles.appointment}>
              Make an appointment
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
