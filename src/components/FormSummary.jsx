function FormSummary({ submittedData, onClose }) {
  return (
    <div>
      <h1>Dane z formularza</h1>
      <h4>Dane osobowe:</h4>
      <p>Imię: {submittedData.firstName}</p>
      <p>Nazwisko: {submittedData.lastName}</p>
      <p>Email: {submittedData.email}</p>
      <p>Telefon: {submittedData.phone}</p>
      <h4>Preferencje kursu:</h4>
      <p>Typ kursu: {submittedData.learningMode}</p>
      <p>Preferowane technologie:</p>
      <ul>
        {submittedData.preferredTechnologies.map((technology) => (
          <li key={technology}>{technology}</li>
        ))}
      </ul>
      <h4>Doświadczenie w programowaniu:</h4>
      {submittedData.hasProgrammingExperience ? (
        <ul>
          {submittedData.programmingExperience.map((experience) => (
            <li key={experience}>
              Technologia: {experience.technology} / poziom: {experience.level}
            </li>
          ))}
        </ul>
      ) : (
        <p>Brak doświadczenia</p>
      )}
      <h4>Curriculum vitae:</h4>
      <img
        src={URL.createObjectURL(submittedData.cv[0])}
        alt="CV"
        width="120"
      ></img>
      <button type="button" onClick={onClose}>
        Zamknij
      </button>
    </div>
  );
}

export default FormSummary;
