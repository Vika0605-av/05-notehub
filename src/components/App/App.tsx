import css from "./App.module.css";

import { useState } from "react";

import { useDebouncedCallback } from "use-debounce";

import { useQuery } from "@tanstack/react-query";

import SearchBox from "../SearchBox/SearchBox";

import Pagination from "../Pagination/Pagination";

import NoteList from "../NoteList/NoteList";

import Modal from "../Modal/Modal";

import NoteForm from "../NoteForm/NoteForm";

import { fetchNotes } from "../../services/noteService";

const PER_PAGE = 12;

export default function App() {

  const [page, setPage] =

    useState(1);

  const [search, setSearch] =

    useState("");

  const [isOpen, setIsOpen] =

    useState(false);

  const debounceSearch =

    useDebouncedCallback(

      (value: string) => {

        setPage(1);

        setSearch(value);

      },

      500

    );

  const { data, isLoading } =

    useQuery({

      queryKey: [

        "notes",

        page,

        search,

      ],

      queryFn: () =>

        fetchNotes({

          page,

          perPage: PER_PAGE,

          search,

        }),

      placeholderData:

        previousData =>

          previousData,

    });

  return (

    <div className={css.app}>

      <header

        className={css.toolbar}

      >

        <SearchBox

          onSearch={

            debounceSearch

          }

        />
{(data?.totalPages ?? 0) > 1 && (
        <Pagination

          pageCount={

            data?.totalPages ??

            0

          }

          currentPage={

            page

          }

          onPageChange={

            setPage

          }

        />
        )}
        <button

          className={css.button}

          onClick={() =>

            setIsOpen(true)

          }

        >

          Create note +

        </button>

      </header>

      {isLoading ? (

        <p>

          Loading...

        </p>

      ) : (

        <NoteList

          notes={

            data?.notes ??

            []

          }

        />

      )}

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

            onSuccess={() =>

              setIsOpen(false)

            }

          />

        </Modal>

      )}

    </div>

  );
}