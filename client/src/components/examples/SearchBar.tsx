import SearchBar from '../SearchBar';

export default function SearchBarExample() {
  const handleSearch = (query: string) => {
    console.log('Search triggered:', query);
  };

  return (
    <div className="w-full max-w-md">
      <SearchBar onSearch={handleSearch} />
    </div>
  );
}