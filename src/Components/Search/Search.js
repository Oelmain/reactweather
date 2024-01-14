import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import {GEO_API_URL ,geoApioptions } from '../../api';
const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = async (inputValue) => {
    try {
      const response = await fetch(
        `${GEO_API_URL}'https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=1000000'=${inputValue}`,
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
    onSearchChange(searchData.value);
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnchange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
