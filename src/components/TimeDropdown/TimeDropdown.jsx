import { useEffect, useRef, useState } from "react";
import styles from "./TimeDropdown.module.css";

function formatSpaced(time) {
  const [hours, minutes] = time.split(":");
  return `${hours} : ${minutes}`;
}

function TimeDropdown({ options, value, onChange, placeholder = "00:00" }) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !listRef.current) return;

    const selectedEl = listRef.current.querySelector('[aria-selected="true"]');
    selectedEl?.scrollIntoView({ block: "center" });
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (time) => {
    onChange(time);
    setIsOpen(false);
  };

  return (
    <div className={styles.root} ref={rootRef}>
      <button
        type="button"
        className={styles.trigger}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{value || placeholder}</span>
        <span className={styles.clockIcon} aria-hidden="true">
          &#128337;
        </span>
      </button>

      {isOpen && (
        <div className={styles.panel}>
          <p className={styles.title}>Meeting time</p>
          <ul className={styles.list} role="listbox" ref={listRef}>
            {options.map((time) => (
              <li key={time} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={time === value}
                  className={`${styles.option} ${
                    time === value ? styles.optionSelected : ""
                  }`}
                  onClick={() => handleSelect(time)}
                >
                  {formatSpaced(time)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TimeDropdown;
