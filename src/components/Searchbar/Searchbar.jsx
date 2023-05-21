import PropTypes from 'prop-types';
import { useState } from 'react';
import { ReactComponent as SearchIcon } from '../../icons/image-search-min.svg';
import css from './SearchBar.module.css';

export default function SearchBar({ onSubmit }) {
  const [value, setValue] = useState('');

  const handleChange = event => setValue(event.currentTarget.value);

  const handleSubmit = event => {
    event.preventDefault();
    if (!value) {
      window.alert('Please enter your request ');
      return;
    }
    onSubmit(value);
    setValue('');
  };

  return (
    <>
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={handleSubmit}>
          <button type="submit" className={css.button}>
            <SearchIcon />
          </button>

          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleChange}
            value={value}
          />
        </form>
      </header>
    </>
  );
}

SearchBar.propTypes = { onSubmit: PropTypes.func.isRequired };
