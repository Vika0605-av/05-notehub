
import css from "./Pagination.module.css";

import type { ComponentType } from "react";

import ReactPaginateModule from "react-paginate";

import type {

  ReactPaginateProps,

} from "react-paginate";

const ReactPaginate: ComponentType<ReactPaginateProps> = ReactPaginateModule;
interface PaginationProps {

  pageCount: number;

  currentPage: number;

  onPageChange: (

    selected: number

  ) => void;

}

export default function Pagination({

  pageCount,

  currentPage,

  onPageChange,

}: PaginationProps) {

  return (

    <ReactPaginate

      pageCount={pageCount}

      forcePage={

        currentPage - 1

      }

      onPageChange={(

        event

      ) => {

        onPageChange(

          event.selected + 1

        );

      }}

      previousLabel="<"

      nextLabel=">"

      breakLabel="..."

      containerClassName={

        css.pagination

      }

      activeClassName={

        css.active

      }

      pageClassName={

        css.page

      }

      previousClassName={

        css.page

      }

      nextClassName={

        css.page

      }

      disabledClassName={

        css.disabled

      }

    />

  );

}