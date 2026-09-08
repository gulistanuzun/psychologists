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

  const closeModal = () => setModal(null);

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        psychologists.services
      </Link>

      <nav className={styles.nav}>
        <NavLink to="/" className={styles.link}>
          Home
        </NavLink>
        <NavLink to="/psychologists" className={styles.link}>
          Psychologists
        </NavLink>
        {user && (
          <NavLink to="/favorites" className={styles.link}>
            Favorites
          </NavLink>
        )}
      </nav>

      <div className={styles.actions}>
        {user ? (
          <>
            <span className={styles.user}>{user.email}</span>
            <button type="button" className={styles.logout} onClick={logout}>
              Log out
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className={styles.loginBtn}
              onClick={() => setModal("login")}
            >
              Log In
            </button>
            <button
              type="button"
              className={styles.registerBtn}
              onClick={() => setModal("register")}
            >
              Registration
            </button>
          </>
        )}
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
