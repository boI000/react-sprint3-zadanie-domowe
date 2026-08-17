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
        (files) => ["image/jpeg", "image.png"].includes(files?.[0]?.type),
        "CV musi być plikiem .jpg lub .png",
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      learningMode: "",
      preferredTechnologies: [],
    },
  });

  const onFormSubmit = (data) => {
    console.log(data);
  };

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
          <input type="radio" />
          <label>Czy masz doświadczenie w programowaniu?</label>
          {/* expands a modal with selection */}
        </section>
        <button type="submit">Wyślij zgłoszenie</button>
      </form>
    </>
  );
}

export default App;
