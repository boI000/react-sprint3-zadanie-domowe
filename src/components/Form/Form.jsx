import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "../Button/Button";

import styles from "./Form.module.css";

function Form({ registrationFormSchema, onSubmit }) {
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: "programmingExperience",
  });

  const hasProgrammingExperience = watch("hasProgrammingExperience");

  const handleFormSubmit = (data) => {
    if (
      data.hasProgrammingExperience &&
      data.programmingExperience.length === 0
    ) {
      setExperienceError("Dodaj przynajmniej jedno doświadczenie");
      return;
    }
    setExperienceError("");
    onSubmit(data);
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>
        Formularz zgłoszeniowy na kurs programowania
      </h1>
      <form
        className={styles.form}
        noValidate
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <section className={styles.section}>
          <h3 className={styles.subtitle}>Dane osobowe</h3>
          <div className={styles.fieldGroup}>
            <input
              className={styles.field}
              type="text"
              placeholder="Imię"
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className={styles.error}>{errors.firstName.message}</p>
            )}
          </div>
          <div className={styles.fieldGroup}>
            <input
              className={styles.field}
              type="text"
              placeholder="Nazwisko"
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className={styles.error}>{errors.lastName.message}</p>
            )}
          </div>
          <div className={styles.fieldGroup}>
            <input
              className={styles.field}
              type="email"
              placeholder="E-mail"
              {...register("email")}
            />
            {errors.email && (
              <p className={styles.error}>{errors.email.message}</p>
            )}
          </div>
          <div className={styles.fieldGroup}>
            <input
              className={styles.field}
              type="tel"
              placeholder="Numer telefonu"
              {...register("phone")}
            />
            {errors.phone && (
              <p className={styles.error}>{errors.phone.message}</p>
            )}
          </div>
        </section>
        <section className={styles.section}>
          <h3 className={styles.subtitle}>Preferencje kursu</h3>
          <div className={styles.optionGroup}>
            <span>Wybierz formę nauki: </span>
            <label className={styles.option}>
              <input
                type="radio"
                value="Stacjonarnie"
                {...register("learningMode")}
              />
              Stacjonarnie
            </label>
            <label className={styles.option}>
              <input
                type="radio"
                value="Online"
                {...register("learningMode")}
              />
              Online
            </label>
          </div>
          {errors.learningMode && (
            <p className={styles.error}>{errors.learningMode.message}</p>
          )}
          <section className={styles.checkboxGroup}>
            <label className={styles.choice}>
              <input
                className={styles.hiddenCheckbox}
                type="checkbox"
                value="React"
                {...register("preferredTechnologies")}
              />
              <span className={styles.choiceText}>React</span>
            </label>
            <label className={styles.choice}>
              <input
                className={styles.hiddenCheckbox}
                type="checkbox"
                value="Node.js"
                {...register("preferredTechnologies")}
              />
              <span className={styles.choiceText}>Node.js</span>
            </label>
            <label className={styles.choice}>
              <input
                className={styles.hiddenCheckbox}
                type="checkbox"
                value="HTML"
                {...register("preferredTechnologies")}
              />
              <span className={styles.choiceText}>HTML</span>
            </label>
            <label className={styles.choice}>
              <input
                className={styles.hiddenCheckbox}
                type="checkbox"
                value="CSS"
                {...register("preferredTechnologies")}
              />
              <span className={styles.choiceText}>CSS</span>
            </label>
            <label className={styles.choice}>
              <input
                className={styles.hiddenCheckbox}
                type="checkbox"
                value="Next.js"
                {...register("preferredTechnologies")}
              />
              <span className={styles.choiceText}>Next.js</span>
            </label>
          </section>
          {errors.preferredTechnologies && (
            <p className={styles.error}>
              {errors.preferredTechnologies.message}
            </p>
          )}
        </section>
        <section className={styles.section}>
          <h3 className={styles.subtitle}>Dodaj swoje CV</h3>
          <input type="file" accept=".jpg,.jpeg,.png" {...register("cv")} />
          {errors.cv && <p className={styles.error}>{errors.cv.message}</p>}
        </section>
        <section className={styles.section}>
          <h3 className={styles.subtitle}>Doświadczenie w programowaniu</h3>
          <label className={styles.option}>
            <input type="checkbox" {...register("hasProgrammingExperience")} />
            Czy masz doświadczenie w programowaniu?
          </label>
        </section>
        {hasProgrammingExperience && (
          <div className={styles.experienceControls}>
            <Button
              variant="success"
              onClick={() => {
                append({
                  technology: "",
                  level: "",
                });
                setExperienceError("");
              }}
            >
              Dodaj doświadczenie
            </Button>
            {experienceError && (
              <p className={styles.error}>{experienceError}</p>
            )}

            {fields.map((field, index) => (
              <section key={field.id} className={styles.experienceRow}>
                <select
                  className={styles.field}
                  {...register(`programmingExperience.${index}.technology`)}
                >
                  <option value="">Wybierz technologie</option>
                  <option value={"JavaScript"}>JavaScript</option>
                  <option value={"React"}>React</option>
                  <option value={"Python"}>Python</option>
                  <option value={"CSS"}>CSS</option>
                </select>
                <select
                  className={styles.field}
                  {...register(`programmingExperience.${index}.level`)}
                >
                  <option value="">Wybierz poziom</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <Button variant="remove" onClick={() => remove(index)}>
                  Usuń
                </Button>
              </section>
            ))}
          </div>
        )}
        <div className={styles.submitButtonWrapper}>
          <Button variant="primary" type="submit">
            Wyślij zgłoszenie
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Form;
