import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import scss from "./Login.module.scss";
import { useLang } from "../../context/LanguageContext";

import { auth } from "../../../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t } = useLang();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await login(email, password);

      toast.success("Welcome back!");
      navigate("/home");
    } catch (err) {
      console.log(err.code);

      if (err.code === "auth/invalid-credential") {
        setError("Wrong email or password");
      } else {
        setError("Login failed");
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
    <div className={scss.login}>
      <div className={scss.card}>
        <div className={scss.logo}>
          <span className={scss.A}>A</span>
          <span className={scss.RUU}>RUU</span>
        </div>

        <p className={scss.subtitle}>{t.sign}</p>

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

        <button className={scss.btn} onClick={handleLogin} disabled={loading}>
          {loading ? t.loading : t.signIn}
        </button>

        <div className={scss.divider}>
          <span>or</span>
        </div>

        <button
          className={scss.googleBtn}
          onClick={handleGoogle}
          disabled={loading}
        >
          {t.google}
        </button>

        <p className={scss.link}>
          {t.acc}{" "}
          <NavLink to="/register" className={scss.navLink}>
            {t.signUp}
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
