import styles from './LoadingSpinner.module.css';


function LoadingSpinner() {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.anvilAndHammer}>
        <div className={styles.hammer}></div>
        <div className={styles.anvil}></div>
      </div>
      <p className={styles.loadingText}>Forjando...</p>
    </div>
  );
}

export default LoadingSpinner;