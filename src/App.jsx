import { useState } from "react";
import { z } from "zod";

import "./App.css";
import FormSummary from "./components/FormSummary/FormSummary";
import Form from "./components/Form/Form";

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

  const [submittedData, setSubmittedData] = useState(null);

  if (submittedData) {
    return (
      <FormSummary
        submittedData={submittedData}
        onClose={() => setSubmittedData(null)}
      />
    );
  }

  return (
    <Form
      registrationFormSchema={registrationFormSchema}
      onSubmit={setSubmittedData}
    />
  );
}

export default App;
