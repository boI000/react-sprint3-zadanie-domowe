import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "./Button/Button";

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
    console.log(data);
  };

  return (
    <>
      <h1>Formularz zgłoszeniowy na kurs programowania</h1>
      <form noValidate onSubmit={handleSubmit(handleFormSubmit)}>
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
          <input
            type="radio"
            value="Stacjonarnie"
            {...register("learningMode")}
          />
          Stacjonarnie
          <input type="radio" value="Online" {...register("learningMode")} />
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
                <Button variant="remove" onClick={() => remove(index)}>
                  Usuń
                </Button>
              </section>
            ))}
          </>
        )}
        <Button variant="primary" type="submit">
          Wyślij zgłoszenie
        </Button>
      </form>
    </>
  );
}

export default Form;
