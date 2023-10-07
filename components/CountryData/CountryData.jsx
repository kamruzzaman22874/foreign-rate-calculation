import { Autocomplete, List, ListItem, TextField } from "@mui/material";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

const GET_COUNTRY_QUERY = gql`
  query GetCountries {
    getCountries {
      message
      result {
        list {
          name
        }
      }
    }
  }
`;

const CountryData = ({ setCountry }) => {
    const { loading, error, data } = useQuery(GET_COUNTRY_QUERY);
    const [inputValue, setInputValue] = useState("");
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [selectedCountry, setSelectedCountry] = useState(null);




    useEffect(() => {
        setSelectedIndex(-1);
    }, [filteredCountries]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    const countriesData = data?.getCountries.result.list;

    const handleInputChange = (e) => {
        const query = e.target.value.toLowerCase();
        setCountry(query)

    };

    const handleCountrySelection = (countryName) => {
        setInputValue(countryName);
        setFilteredCountries([]);
        setSelectedIndex(-1);
        setCountry(countryName)
    };



    const handleKeyDown = (e) => {
        if (e.key === "ArrowDown" && selectedIndex < filteredCountries.length - 1) {
            setSelectedIndex(selectedIndex + 1);
        } else if (e.key === "ArrowUp" && selectedIndex > 0) {
            setSelectedIndex(selectedIndex - 1);
        } else if (e.key === "Enter" && selectedIndex >= 0) {
            handleCountrySelection(filteredCountries[selectedIndex].name);
        }
    };


    const handleInputChanges = (e, newValue) => {
        setInputValue(newValue);
        setCountry(newValue)
    };

    const handleCountrySelections = (country) => {
        setSelectedCountry(country);
    };

    return (
        <div style={{ marginTop: "12px" }}>
            <Autocomplete
                options={countriesData?.map(country => country?.name)}
                getOptionLabel={(option) => option}
                value={selectedCountry}
                inputValue={inputValue}
                onInputChange={handleInputChanges}
                onChange={(e, newValue) => handleCountrySelections(newValue)}
                filterOptions={(options, { inputValue }) =>
                    options.filter((option) =>
                        option.toLowerCase().startsWith(inputValue.toLowerCase())
                    )
                }
                renderInput={(params) => (
                    <List>
                        <TextField {...params}
                            placeholder="Select your country"
                            value={inputValue}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />
                    </List>
                )}

            />

        </div>
    );
};

export default CountryData;