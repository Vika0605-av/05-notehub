
import toast from 'react-hot-toast';

import styles from './SearchBar.module.css';

interface SearchBarProps {

  onSubmit: (query: string) => void;

}

export const SearchBar = ({ onSubmit }: SearchBarProps) => {

  const handleSubmit = (formData: FormData) => {

    const query = formData.get('query') as string;

    if (!query.trim()) {

      toast.error('Please enter a search query');

      return;

    }

    onSubmit(query);
    
  };

  return (

    <form className={styles.form} action={handleSubmit}>

      <input

        className={styles.input}

        name="query"

        type="text"

        autoComplete="off"

        placeholder="Search movies..."

        autoFocus

      />

      <button className={styles.button} type="submit">

        Search

      </button>

    </form>

  );

};