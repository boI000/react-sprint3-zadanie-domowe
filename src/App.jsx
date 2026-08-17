import { useState } from "react";
import { useFieldArray } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import "./App.css";

function App() {
  const registrationFormSchema = z.object({
    firstName: z
      .string()
      .min(3, "Imię musi składać się z co najmniej 3 znaków"),
    lastName: z
      .string()
      .min(3, "Nazwisko musi składać się z co najmniej 3 znaków"),
    email: z
      .string()
      .min(1, "Email jest wymagany")
      .email("Podaj poprawny adres e-mail"),
    phone: z
      .string()
      .min(1, "Numer telefonu jest wymagany")
      .regex(/^\d{9}$/, "Numer telefonu musi mieć dokładnie 9 cyfr"),
    learningMode: z.string().min(1, "Proszę wybierz formę nauki"),
    preferredTechnologies: z
      .array(z.string())
      .min(1, "Proszę wybierz przynajmniej jedną technologię"),
    cv: z
      .any()
      .refine((files) => files?.length === 1, "Dodaj CV")
      .refine(
        (files) => ["image/jpeg", "image/png"].includes(files?.[0]?.type),
        "CV musi być plikiem .jpg lub .png",
      ),
    hasProgrammingExperience: z.boolean(),
    programmingExperience: z.array(
      z.object({
        technology: z.string(),
        level: z.string(),
      }),
    ),
  });

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      learningMode: "",
      preferredTechnologies: [],
      hasProgrammingExperience: false,
      programmingExperience: [],
    },
  });

  const [experienceError, setExperienceError] = useState("");
  const [submittedData, setSubmittedData] = useState(null);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "programmingExperience",
  });

  const hasProgrammingExperience = watch("hasProgrammingExperience");

  const onFormSubmit = (data) => {
    if (
      data.hasProgrammingExperience &&
      data.programmingExperience.length === 0
    ) {
      setExperienceError("Dodaj przynajmniej jedno doświadczenie");
      return;
    }
    setExperienceError("");
    setSubmittedData(data);
    console.log(data);
  };

  if (submittedData) {
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
            {submittedData.programmingExperience.map((experience) => {
              <li key={experience}>
                Technologia: {experience.technology}/{experience.level}
              </li>;
            })}
          </ul>
        ) : (
          <p>Brak doświadczenia</p>
        )}
        <button type="button" onClick={() => setSubmittedData(null)}>
          Zamknij
        </button>
      </div>
    );
  }

  return (
    <>
      <h1>Formularz zgłoszeniowy na kurs programowania</h1>
      <form noValidate onSubmit={handleSubmit(onFormSubmit)}>
        <section>
          <h3>Dane osobowe</h3>
          <input type="text" placeholder="Imię" {...register("firstName")} />
          {errors.firstName && <p>{errors.firstName.message}</p>}
          <input type="text" placeholder="Nazwisko" {...register("lastName")} />
          {errors.lastName && <p>{errors.lastName.message}</p>}
          <input type="email" placeholder="E-mail" {...register("email")} />
          {errors.email && <p>{errors.email.message}</p>}
          <input
            type="tel"
            placeholder="Numer telefonu"
            {...register("phone")}
          />
          {errors.phone && <p>{errors.phone.message}</p>}
        </section>
        <section>
          <h3>Preferencje kursu</h3>
          <label>Wybierz formę nauki: </label>
          <input type="radio" value="onsite" {...register("learningMode")} />
          Stacjonarna
          <input type="radio" value="online" {...register("learningMode")} />
          Online
          {errors.learningMode && <p>{errors.learningMode.message}</p>}
          <section>
            <label>
              <input
                type="checkbox"
                value="React"
                {...register("preferredTechnologies")}
              />
              React
            </label>
            <label>
              <input
                type="checkbox"
                value="Node.js"
                {...register("preferredTechnologies")}
              />
              Node.js
            </label>
            <label>
              <input
                type="checkbox"
                value="HTML"
                {...register("preferredTechnologies")}
              />
              HTML
            </label>
            <label>
              <input
                type="checkbox"
                value="CSS"
                {...register("preferredTechnologies")}
              />
              CSS
            </label>
            <label>
              <input
                type="checkbox"
                value="Next.js"
                {...register("preferredTechnologies")}
              />
              Next.js
            </label>
            {errors.preferredTechnologies && (
              <p>{errors.preferredTechnologies.message}</p>
            )}
          </section>
        </section>
        <section>
          <h3>Dodaj swoje CV</h3>
          <input type="file" accept=".jpg,.jpeg,.png" {...register("cv")} />
          {errors.cv && <p>{errors.cv.message}</p>}
        </section>
        <section>
          <h3>Doświadczenie w programowaniu</h3>
          <input type="checkbox" {...register("hasProgrammingExperience")} />
          <label>Czy masz doświadczenie w programowaniu?</label>
        </section>
        {hasProgrammingExperience && (
          <>
            <button
              type="button"
              onClick={() => {
                append({
                  technology: "",
                  level: "",
                });
                setExperienceError("");
              }}
            >
              Dodaj doświadczenie
            </button>
            {experienceError && <p>{experienceError}</p>}

            {fields.map((field, index) => (
              <section key={field.id}>
                <select
                  {...register(`programmingExperience.${index}.technology`)}
                >
                  <option value="">Wybierz technologie</option>
                  <option value={"JavaScript"}>JavaScript</option>
                  <option value={"React"}>React</option>
                  <option value={"Python"}>Python</option>
                  <option value={"CSS"}>CSS</option>
                </select>
                <select {...register(`programmingExperience.${index}.level`)}>
                  <option value="">Wybierz poziom</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button type="button" onClick={() => remove(index)}>
                  Usuń
                </button>
              </section>
            ))}
          </>
        )}
        <button type="submit">Wyślij zgłoszenie</button>
      </form>
    </>
  );
}

export default App;
