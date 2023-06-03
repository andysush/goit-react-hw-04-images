import PropTypes from 'prop-types';
import { useState } from 'react';
import { ReactComponent as SearchIcon } from '../../icons/image-search-min.svg';

import {
  SearchHeader,
  SearchForm,
  SearchBtn,
  SearchInput,
} from './SearchBar.styled';

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
      <SearchHeader>
        <SearchForm onSubmit={handleSubmit}>
          <SearchBtn type="submit">
            <SearchIcon />
          </SearchBtn>

          <SearchInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleChange}
            value={value}
          />
        </SearchForm>
      </SearchHeader>
    </>
  );
}

SearchBar.propTypes = { onSubmit: PropTypes.func.isRequired };
