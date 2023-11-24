import Button from '../Button/Button';
import Input from '../Input/Input';
import './SearchBar.scss'

const SearchBar = () => {
  return (
    <div className="search-bar">
      <Input type="text" placeholder='Search here' />
      <Button buttonType='submit' value='Search' />
    </div>
  );
};

export default SearchBar;
