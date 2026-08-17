import styles from "./FormSummary.module.css";
import Button from "../Button/Button";

function FormSummary({ submittedData, onClose }) {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Dane z formularza</h1>
      <div className={styles.summaryCard}>
        <h4 className={styles.sectionTitle}>Dane osobowe:</h4>
        <p>Imię: {submittedData.firstName}</p>
        <p>Nazwisko: {submittedData.lastName}</p>
        <p>Email: {submittedData.email}</p>
        <p>Telefon: {submittedData.phone}</p>
        <h4 className={styles.sectionTitle}>Preferencje kursu:</h4>
        <p>Typ kursu: {submittedData.learningMode}</p>
        <p>Preferowane technologie:</p>
        <ul>
          {submittedData.preferredTechnologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
        <h4 className={styles.sectionTitle}>Doświadczenie w programowaniu:</h4>
        {submittedData.hasProgrammingExperience ? (
          <ul>
            {submittedData.programmingExperience.map((experience, index) => (
              <li key={index}>
                Technologia: {experience.technology} / poziom:{" "}
                {experience.level}
              </li>
            ))}
          </ul>
        ) : (
          <p>Brak doświadczenia</p>
        )}
        <h4 className={styles.sectionTitle}>Curriculum vitae:</h4>
        <img
          className={styles.cvImg}
          src={URL.createObjectURL(submittedData.cv[0])}
          alt="CV"
          width="120"
        ></img>
        <div className={styles.buttonWrapper}>
          <Button variant="secondary" onClick={onClose}>
            Zamknij
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FormSummary;
