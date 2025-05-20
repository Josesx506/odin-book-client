import SearchResult from '@/components/cards/SearchResult';
import { axiosApi } from '@/config/axios';
import styles from '@/styles/forms/searchbar.module.css';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { MdOutlineSearch } from "react-icons/md";

export default function SearchBar() {
  const [text, setText] = useState("");
  const [results, setResults] = useState([]);

  const debounceTimeout = useRef(null);
  const abortController = useRef(null);

  useEffect(() => {
    if (!text.trim()) {
      setResults([]);
      return;
    }

    clearTimeout(debounceTimeout.current);// Debounce logic
    debounceTimeout.current = setTimeout(
      async () => {
        // Cancel previous request
        if (abortController.current) abortController.current.abort();
        abortController.current = new AbortController();
        try {
          const res = await axiosApi.post(
            '/v1/social/search',
            { query: text },
            { signal: abortController.current.signal }
          );
          setResults(res.data.results);
        } catch (err) {
          if (err?.code !== "ERR_CANCELED") {
            toast.error(err.message || 'Search error');
          }
        }
      }, 1000)

    return () => {
      clearTimeout(debounceTimeout.current);
    };
  }, [text])

  function handleChange(e) {
    e.stopPropagation();
    setText(e.target.value);
    // getSearchResults(e.target.value);
  }

  return (
    <div className={styles.searchCntr}>
      <div className={styles.searchInputCntr}>
        <MdOutlineSearch />
        <input type='search' value={text} onChange={handleChange} placeholder='Search' />
      </div>
      {text.trim() && (
        <div className={styles.searchRstsCntr}>
          {(text && results.length !== 0) ? results.map((data) => (
            <SearchResult key={data.key} data={data} />
          )) : <div style={{ textAlign: 'center' }}>No results found</div>
          }
        </div>
      )}
    </div>
  )
}
