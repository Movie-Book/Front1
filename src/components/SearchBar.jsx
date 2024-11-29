function SearchBar({searchText, onSearch, text}){
    return(
        <div className="searchBar">
            <img className="searchIcon" src="/image/search.png" alt="search" />
            <div className="searchText">
                <input 
                    placeholder= {text}
                    value={searchText}
                    onChange={(m)=>onSearch(m.target.value)}
                />
            </div>            
        </div>
    )
}

export default SearchBar;