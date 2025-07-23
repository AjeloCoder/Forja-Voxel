import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.errorCode}>404</h1>
      <p className={styles.message}>¡Ups! Te has perdido en el bosque.</p>
      <p className={styles.subMessage}>
        La página que buscas no existe o fue movida a otra dimensión.
      </p>
      <Link to="/" className={`pixel-button ${styles.homeButton}`}>
        Volver a la Entrada
      </Link>
    </div>
  );
}

