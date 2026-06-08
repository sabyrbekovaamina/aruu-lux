import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import scss from "./Register.module.scss";
import { useLang } from "../../context/LanguageContext";

import { auth } from "../../../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const { t } = useLang();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !confirm) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await register(email, password);

      toast.success("Account created successfully!");
      navigate("/home");
    } catch (err) {
      console.log(err.code);

      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered");
      } else {
        setError("Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    setError("");

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);

      toast.success("Welcome!");
      navigate("/home");
    } catch (err) {
      console.log(err);
      setError("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={scss.register}>
      <div className={scss.card}>
        <div className={scss.logo}>
          <span className={scss.A}>A</span>
          <span className={scss.RUU}>RUU</span>
        </div>

        <p className={scss.subtitle}>{t.create}</p>

        {error && <p className={scss.error}>{error}</p>}

        <div className={scss.field}>
          <label className={scss.label}>{t.email}</label>
          <input
            className={scss.input}
            type="email"
            placeholder="name@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={scss.field}>
          <label className={scss.label}>{t.password}</label>
          <input
            className={scss.input}
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={scss.field}>
          <label className={scss.label}>{t.confirmPass}</label>
          <input
            className={scss.input}
            type="password"
            placeholder="••••••••"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>

        <button
          className={scss.btn}
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? t.loading : t.createAcc}
        </button>

        <div className={scss.divider}>
          <span>{t.or}</span>
        </div>

        <button
          className={scss.googleBtn}
          onClick={handleGoogle}
          disabled={loading}
        >
          {t.google}
        </button>

        <p className={scss.link}>
          {t.haveAcc}{" "}
          <NavLink to="/login" className={scss.navLink}>
            {t.signin}
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;
