import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Modal from "../Modal/Modal";
import LoginForm from "../AuthForm/LoginForm";
import RegisterForm from "../AuthForm/RegisterForm";
import styles from "./Header.module.css";

function Header() {
  const { user, logout } = useAuth();
  const [modal, setModal] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeModal = () => setModal(null);
  const closeMenu = () => setMenuOpen(false);
  const linkClass = ({ isActive }) =>
    `${styles.link} ${isActive ? styles.active : ""}`;

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoHighlight}>psychologists</span>
          <span className={styles.logoSuffix}>.services</span>
        </Link>

        <button
          type="button"
          className={styles.burger}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={styles.burgerLine} />
          <span className={styles.burgerLine} />
          <span className={styles.burgerLine} />
        </button>

        <div className={`${styles.menu} ${menuOpen ? styles.menuOpen : ""}`}>
          <nav className={styles.nav}>
            <NavLink to="/" className={linkClass} onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink to="/psychologists" className={linkClass} onClick={closeMenu}>
              Psychologists
            </NavLink>
            {user && (
              <NavLink to="/favorites" className={linkClass} onClick={closeMenu}>
                Favorites
              </NavLink>
            )}
          </nav>

          <div className={styles.actions}>
            {user ? (
              <>
                <span className={styles.userInfo}>
                  <span className={styles.avatar} aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 20c0-4.418 3.582-8 8-8s8 3.582 8 8" />
                    </svg>
                  </span>
                  <span className={styles.user}>
                    {user.displayName || user.email}
                  </span>
                </span>
                <button
                  type="button"
                  className={styles.logout}
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className={styles.loginBtn}
                  onClick={() => {
                    setModal("login");
                    closeMenu();
                  }}
                >
                  Log In
                </button>
                <button
                  type="button"
                  className={styles.registerBtn}
                  onClick={() => {
                    setModal("register");
                    closeMenu();
                  }}
                >
                  Registration
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <Modal isOpen={modal === "login"} onClose={closeModal}>
        <LoginForm onSuccess={closeModal} />
      </Modal>
      <Modal isOpen={modal === "register"} onClose={closeModal}>
        <RegisterForm onSuccess={closeModal} />
      </Modal>
    </header>
  );
}

export default Header;
