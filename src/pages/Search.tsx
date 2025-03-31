import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import "./Search.css";
import Artists from "../components/Artists/Artists";
import SearchedResults from "../components/SearchedResults/SearchedResults";
import { artistProps } from "../components/Artists/Artists";
import {
  optionsAutoComplete,
  optionsSearchKeyword,
  tracksProps,
} from "../constants";
import Skeleton from "../components/Skeleton/Skeleton";

export type apiDataProps = artistProps & tracksProps;

const Search = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [viewSuggestion, setViewSuggestion] = useState<boolean>(true);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState<apiDataProps>({} as apiDataProps);
  const [apiSuggestionData, setApiSuggestionData] = useState<any[]>([]);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const suggestionDelay = 500;
  let timer: NodeJS.Timeout;

  useEffect(() => {
    if (keyword.trimEnd() !== "") {
      // setInputValue(keyword);
      setViewSuggestion(false);
      setLoading(true);
      const searchKeyword = async () => {
        try {
          const response = await axios.request(optionsSearchKeyword(keyword));
          setApiData(response.data);
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      };
      searchKeyword();
    }
  }, [keyword]);
  useEffect(() => {
    if (!viewSuggestion) setViewSuggestion(true);

    clearTimeout(timer);

    // Set a new timer to fetch suggestions after the delay
    timer = setTimeout(() => {
      const fetchData = async () => {
        try {
          const response = await axios.request(optionsAutoComplete(inputValue));
          setApiSuggestionData(response.data.hints);
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }, suggestionDelay);

    // Clear the timer when the component unmounts or inputValue changes
    return () => clearTimeout(timer);
  }, [inputValue]);

  return (
    <div className="wrap">
      <div className="mt-4">
        <h5 className="m-2">Search</h5>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="What do you want to listen to?"
            aria-describedby="button-addon2"
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>
      </div>
      {viewSuggestion &&
        apiSuggestionData?.map((item, index: number) => {
          return (
            <div
              key={index}
              className="searchSuggestions p-2 "
              onClick={() => setKeyword(item.term)}
            >
              {item.term}
            </div>
          );
        })}

      {loading && (
        <div className="rplayed__grid">
          {" "}
          {[...Array(5).keys()].map((n) => (
            <Skeleton height="220px" key={n} />
          ))}
        </div>
      )}

      {!viewSuggestion && !loading && (
        <div>
          <SearchedResults tracks={apiData} keyword={keyword} />
          <Artists artists={apiData.artists} />
        </div>
      )}
    </div>
  );
};

export default Search;
