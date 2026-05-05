import React, { useState } from "react";
import { useAuth } from "../../context/useAuth";
import styles from "./AuthModal.module.css";

export function AuthModal({ isOpen, onClose }) {
  const { login, signup, loading, error, clearError } = useAuth();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nombre: "",
    direccion: "",
  });
  const [formError, setFormError] = useState("");

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setFormError("Email y contraseña son requeridos");
      return false;
    }
    if (!isLoginMode && (!formData.nombre || !formData.direccion)) {
      setFormError("Todos los campos son requeridos para registrarse");
      return false;
    }
    if (formData.password.length < 6) {
      setFormError("La contraseña debe tener al menos 6 caracteres");
      return false;
    }
    setFormError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (isLoginMode) {
        await login(formData.email, formData.password);
      } else {
        await signup(formData.email, formData.password, {
          nombre: formData.nombre,
          direccion: formData.direccion,
        });
      }
      onClose();
      setFormData({ email: "", password: "", nombre: "", direccion: "" });
    } catch (err) {
      setFormError(err.message || "Error en la autenticación");
    }
  };

  const handleClose = () => {
    clearError();
    setFormError("");
    setFormData({ email: "", password: "", nombre: "", direccion: "" });
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={handleClose}>
          ✕
        </button>

        <h2 className={styles.title}>
          {isLoginMode ? "Inicia Sesión" : "Crear Cuenta"}
        </h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="tu@email.com"
              disabled={loading}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="••••••••"
              disabled={loading}
            />
          </div>

          {!isLoginMode && (
            <>
              <div className={styles.formGroup}>
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  placeholder="Tu nombre completo"
                  disabled={loading}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="direccion">Dirección de Envío</label>
                <textarea
                  id="direccion"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleInputChange}
                  placeholder="Calle, número, ciudad..."
                  rows="3"
                  disabled={loading}
                />
              </div>
            </>
          )}

          {(error || formError) && (
            <div className={styles.errorMessage}>
              {error || formError}
            </div>
          )}

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={loading}
          >
            {loading ? "Cargando..." : isLoginMode ? "Iniciar Sesión" : "Registrarse"}
          </button>
        </form>

        <div className={styles.toggleMode}>
          <p>
            {isLoginMode ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}
            <button
              type="button"
              onClick={() => {
                setIsLoginMode(!isLoginMode);
                setFormError("");
                clearError();
              }}
              className={styles.toggleBtn}
            >
              {isLoginMode ? "Registrate" : "Inicia sesión"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
