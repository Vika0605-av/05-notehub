import css from "./App.module.css";
import { useState, useEffect, } from "react";

import { useDebouncedCallback,} from "use-debounce";

import SearchBox from "../SearchBox/SearchBox";

import Pagination from "../Pagination/Pagination";

import NoteList from "../NoteList/NoteList";

import Modal from "../Modal/Modal";

import NoteForm from "../NoteForm/NoteForm";

import { fetchNotes, deleteNote, } from "../../services/noteService";

import type { Note } from "../../types/note";

const PER_PAGE = 12;

export default function App() {

  const [notes, setNotes] =

    useState<Note[]>([]);

  const [page, setPage] =

    useState(1);

  const [search, setSearch] =

    useState("");

  const [pages, setPages] =

    useState(0);

  const [isOpen, setIsOpen] =

    useState(false);

useEffect(() => {

  const loadNotes = async () => {

    try {

      const data = await fetchNotes({

        page,

        perPage: PER_PAGE,

        search,

      });

      setNotes(data.notes);

      setPages(data.totalPages);

    } catch (error) {

      console.log(error);

    }

  };

  loadNotes();

}, [page, search]);

  const debounceSearch =

    useDebouncedCallback(

      async(value: string) => {
        try {
const data = await fetchNotes({
  
          page: 1,
          perPage: PER_PAGE,
          search: value,
  
        });
        setNotes(data.notes);
        setPages(data.totalPages);
      } catch (error) {

        console.log(error);
      }
    },
      500

    );

  const handleSearch = (

    value: string

  ) => {

    setSearch(value);

    debounceSearch(value);

  };

  const handleDelete = async (

  id: string

) => {

  try {

    await deleteNote(id);

    const data =

      await fetchNotes({

        page,

        perPage: PER_PAGE,

        search,

      });

    setNotes(data.notes);

    setPages(data.totalPages);

  } catch (error) {

    console.log(error);

  }

};

  return (

    <div className={css.app}>

      <header

        className={

          css.toolbar

        }

      >

        <SearchBox

          value={search}

          onChange={

            handleSearch

          }

        />

        <Pagination

          page={page}

          totalPages={pages}

          onPageChange={

            setPage

          }

        />

        <button

          className={

            css.button

          }

          onClick={() =>

            setIsOpen(true)

          }

        >

          Create note +

        </button>

      </header>

      <NoteList

        notes={notes}

        onDelete={

          handleDelete

        }

      />

      {isOpen && (

        <Modal

          onClose={() =>

            setIsOpen(false)

          }

        >

          <NoteForm

  onClose={() =>

    setIsOpen(false)

  }

  onSuccess={async () => {

    const data =

      await fetchNotes({

        page,

        perPage: PER_PAGE,

        search,

      });

    setNotes(data.notes);

    setPages(

      data.totalPages

    );

  }}

/>
</Modal>

      )}

    </div>
  );
}
