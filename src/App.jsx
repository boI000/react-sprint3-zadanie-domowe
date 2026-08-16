import "./App.css";

function App() {
  return (
    <>
      <h1>Formularz zgłoszeniowy na kurs programowania</h1>
      <form>
        <section>
          <h3>Dane osobowe</h3>
          <input type="text" name="firstName" placeholder="Imię"></input>
          <input type="text" name="lastName" placeholder="Nazwisko"></input>
          <input type="email" name="email" placeholder="E-mail"></input>
          <input type="tel" name="phone" placeholder="Numer telefonu"></input>
        </section>
        <section>
          <h3>Preferencje kursu</h3>
          <label>Wybierz formę nauki: </label>
          <input type="radio" name="learningMode" value="onsite" />
          Stacjonarna
          <input type="radio" name="learningMode" value="online" />
          Online
          <section>
            <label>
              <input
                type="checkbox"
                name="preferredTechnologies"
                value="React"
              />
              React
            </label>
            <label>
              <input
                type="checkbox"
                name="preferredTechnologies"
                value="Node.js"
              />
              Node.js
            </label>
            <label>
              <input
                type="checkbox"
                name="preferredTechnologies"
                value="HTML"
              />
              HTML
            </label>
            <label>
              <input type="checkbox" name="preferredTechnologies" value="CSS" />
              CSS
            </label>
            <label>
              <input
                type="checkbox"
                name="preferredTechnologies"
                value="Next.js"
              />
              Next.js
            </label>
          </section>
        </section>
        <section>
          <h3>Dodaj swoje CV</h3>
          {/* upload a file */}
        </section>
        <section>
          <h3>Doświadczenie w programowaniu</h3>
          <input type="radio" />
          <label>Czy masz doświadczenie w programowaniu?</label>
          {/* expands a modal with selection */}
        </section>
        <button>Wyślij zgłoszenie</button>
      </form>
    </>
  );
}

export default App;
