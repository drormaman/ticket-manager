import React, { useEffect, useState } from 'react';

function Search(props) {
    const [inputText, setInputText] = useState('');
    return(
        <input type="text" id="searchInput" value={inputText} onChange={({target}) => setInputText(target.value)} />
    );
}

export default Search;