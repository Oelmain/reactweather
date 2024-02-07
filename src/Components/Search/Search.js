import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import {GEO_API_URL ,geoApioptions } from '../../api';

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = async (inputValue) => {
    try {
      const response = await fetch(
        `${GEO_API_URL}/cities?namePrefix=${inputValue}`,
        geoApioptions
      );
  
      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }
  
      const responseData = await response.json();
  
      return {
        options: responseData.data.map((city) => ({
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        })),
      };
    } catch (error) {
      console.error("Error fetching options:", error);
      return { options: [] };
    }
  };
  
  const handleOnchange = (searchData) => {
    console.log("Selected Data:", searchData);

    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate className="top-bar"
      placeholder="Enter your city"
      debounceTimeout={1100}
      value={search}
      onChange={handleOnchange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
