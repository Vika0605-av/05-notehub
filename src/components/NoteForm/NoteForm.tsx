import css from "./NoteForm.module.css";

import { useState } from "react";

import { createNote,} from "../../services/noteService";

import  type { NoteTag } from "../../types/note";

interface Props {

  onClose: () => void;

  onSuccess: () => void;

}

export default function NoteForm({

  onClose,

  onSuccess,

}: Props) {

  const [title, setTitle] =

    useState("");

  const [content, setContent] =

    useState("");

  const [tag, setTag] =

    useState<NoteTag>("Todo");

  const handleSubmit = async (

    e: React.FormEvent

  ) => {

    e.preventDefault();

    await createNote({

      title,

      content,

      tag,

    });

    onSuccess();

    onClose();

  };

  return (

    <form

      className={css.form}

      onSubmit={handleSubmit}

    >

      <div className={css.formGroup}>

        <label htmlFor="title">

          Title

        </label>

        <input

          id="title"

          type="text"

          name="title"

          className={css.input}

          value={title}

          onChange={(e) =>

            setTitle(

              e.target.value

            )

          }

        />

        <span

          data-name="title"

          className={css.error}

        />

      </div>

      <div className={css.formGroup}>

        <label htmlFor="content">

          Content

        </label>

        <textarea

          id="content"

          name="content"

          rows={8}

          className={css.textarea}

          value={content}

          onChange={(e) =>

            setContent(

              e.target.value

            )

          }

        />

        <span

          data-name="content"

          className={css.error}

        />

      </div>

      <div className={css.formGroup}>

        <label htmlFor="tag">

          Tag

        </label>

        <select

          id="tag"

          name="tag"

          className={css.select}

          value={tag}

          onChange={(e) =>

            setTag(

              e.target

                .value as NoteTag

            )

          }

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

        </select>

        <span

          data-name="tag"

          className={css.error}

        />

      </div>

      <div className={css.actions}>

        <button

          type="button"

          className={

            css.cancelButton

          }

          onClick={onClose}

        >

          Cancel

        </button>

        <button

          type="submit"

          className={

            css.submitButton

          }

          disabled={

            !title ||

            !content

          }

        >

          Create note

        </button>

      </div>

    </form>

  );

}