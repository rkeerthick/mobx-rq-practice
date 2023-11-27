import { useState } from 'react';
import { search } from '../../Types';
import Button from '../Button/Button';
import Input from '../Input/Input';
import './SearchBar.scss'
import { setState } from '../../Constant/functions';

const SearchBar = ({handleSearchText}: search) => {
  const[text, setText] = useState('');
  const handleTextChange = (e: any) => {
    // setText(e.target.value);
    setState(setText, e.target.value);
    handleSearchText(e.target.value); 
  }
  const handleSearch = () => {
    handleSearchText(text);
  }
  return (
    <div className="search-bar">
      <Input type="text" placeholder='Search here' value={text} onChange={handleTextChange} />
      <Button buttonType='button' value='Search' type='primary' handleClick={handleSearch} />
    </div>
  );
};

export default SearchBar;
