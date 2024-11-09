function SearchBar({searchText, onSearch}){
    return(
        <div className="searchBar">
            <img className="searchIcon" src="/image/search.png" alt="search" />
            <div className="searchText">
                <input 
                    placeholder= "제목을 입력하세요"
                    value={searchText}
                    onChange={(m)=>onSearch(m.target.value)}
                />
            </div>            
        </div>
    )
}

export default SearchBar;