import './SearchBar.scss'

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input type="text" placeholder='Search here' />
      <button>Search</button>
    </div>
  );
};

export default SearchBar;
