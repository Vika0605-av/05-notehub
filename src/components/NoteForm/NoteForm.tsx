import css from "./NoteForm.module.css";

import { Formik, Form, Field, ErrorMessage } from "formik";

import * as Yup from "yup";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createNote } from "../../services/noteService";

import type { NoteTag } from "../../types/note";

interface NoteFormProps {

  onClose: () => void;

  onSuccess: () => void;

}

interface FormValues {

  title: string;

  content: string;

  tag: NoteTag;

}

const validationSchema = Yup.object({

  title: Yup.string()

    .min(3)

    .max(50)

    .required("Title is required"),

  content: Yup.string(),

  tag: Yup.string()

  .oneOf([

    "Todo",

    "Work",

    "Personal",

    "Meeting",

    "Shopping",

  ])

  .required(),

});

export default function NoteForm({

  onClose,

  onSuccess,

}: NoteFormProps) {

  const queryClient = useQueryClient();

  const mutation = useMutation({

    mutationFn: createNote,

    onSuccess: () => {

      queryClient.invalidateQueries({

        queryKey: ["notes"],

      });

      onSuccess();

      onClose();

    },

  });

  const initialValues: FormValues = {

    title: "",

    content: "",

    tag: "Todo",

  };

  return (

    <Formik

      initialValues={initialValues}

      validationSchema={validationSchema}

      onSubmit={(values) => {

        mutation.mutate(values);

      }}

    >

      {({ isSubmitting }) => (

        <Form className={css.form}>

          <div className={css.formGroup}>

            <label htmlFor="title">

              Title

            </label>

            <Field

              name="title"

              id="title"

              className={css.input}

            />

            <ErrorMessage

              name="title"

              component="span"

              className={css.error}

            />

          </div>

          <div className={css.formGroup}>

            <label htmlFor="content">

              Content

            </label>

            <Field

              as="textarea"

              rows={8}

              id="content"

              name="content"

              className={css.textarea}

            />

            <ErrorMessage

              name="content"

              component="span"

              className={css.error}

            />

          </div>

          <div className={css.formGroup}>

            <label htmlFor="tag">

              Tag

            </label>

            <Field

              as="select"

              id="tag"

              name="tag"

              className={css.select}

            >

              <option value="Todo">

                Todo

              </option>

              <option value="Work">

                Work

              </option>

              <option value="Personal">

                Personal

              </option>

              <option value="Meeting">

                Meeting

              </option>

              <option value="Shopping">

                Shopping

              </option>

            </Field>

            <ErrorMessage

              name="tag"

              component="span"

              className={css.error}

            />

          </div>

          <div className={css.actions}>

            <button

              type="button"

              onClick={onClose}

              className={css.cancelButton}

            >

              Cancel

            </button>

            <button

              type="submit"

              disabled={isSubmitting}

              className={css.submitButton}

            >

              Create note

            </button>

          </div>

        </Form>

      )}

    </Formik>

  );

}