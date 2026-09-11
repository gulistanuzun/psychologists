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
      <Link to="/" className={styles.logo}>
        psychologists.services
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
              <span className={styles.user}>{user.email}</span>
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
