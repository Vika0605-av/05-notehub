
import   {

  useEffect,

 type ReactNode,

} from "react";

import { createPortal } from "react-dom";

import css from "./Modal.module.css";

interface ModalProps {

  children: ReactNode;

  onClose: () => void;

}

const modalRoot =

  document.getElementById("modal-root")!;

export default function Modal({

  children,

  onClose,

}: ModalProps) {

  useEffect(() => {

    const handleEscape = (

      event: KeyboardEvent

    ) => {

      if (

        event.key === "Escape"

      ) {

        onClose();

      }

    };

    window.addEventListener(

      "keydown",

      handleEscape

    );

    document.body.style.overflow =

      "hidden";

    return () => {

      window.removeEventListener(

        "keydown",

        handleEscape

      );

      document.body.style.overflow =

        "auto";

    };

  }, [onClose]);

  const handleBackdropClick = (

    event:

      React.MouseEvent<HTMLDivElement>

  ) => {

    if (

      event.target ===

      event.currentTarget

    ) {

      onClose();

    }

  };

  return createPortal(

    <div

      className={css.backdrop}

      onClick={handleBackdropClick}

      role="dialog"

      aria-modal="true"

    >

      <div className={css.modal}>

        {children}

      </div>

    </div>,

    modalRoot

  );

}