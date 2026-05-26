
import css from "./Modal.module.css";

import type { ReactNode } from "react";

interface Props {

  children: ReactNode;

  onClose: () => void;

}

export default function Modal({

  children,

  onClose,

}: Props) {

  return (

    <div

      className={css.backdrop}

      role="dialog"

      aria-modal="true"

      onClick={onClose}

    >

      <div

        className={css.modal}

        onClick={(e) =>

          e.stopPropagation()

        }

      >

        {children}

      </div>

    </div>

  );

}