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
    const countriesData = data.getCountries.result.list;

    const handleInputChange = (e) => {
        const input = e.target.value.toLowerCase();
        if(input === "" && null){
            alert("Please enter")
        }
        else{
            setCountry(e.target.value)
            setInputValue(input);
            const filtered = countriesData.filter((country) =>
            country.name.toLowerCase().includes(input)).sort((a, b) => a.name.localeCompare(b.name))
            setFilteredCountries(filtered);
            setSelectedIndex(-1);
        }
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
                options={countriesData}
                getOptionLabel={(country) => country.name}
                value={selectedCountry}
                inputValue={inputValue}
                onInputChange={handleInputChanges}
                onChange={(e, newValue) => handleCountrySelections(newValue)}
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
                ListboxProps={{
                    style: {
                        maxHeight: '500px', // Adjust the maximum height as needed
                    },
                }}

            />


            {filteredCountries.length > 0 && inputValue && (
                <List>
                    {filteredCountries.map((country, index, props) => (
                        <ListItem
                            {...props}
                            key={index}
                            style={{
                                cursor: "pointer",
                                minWidth: 250,

                                backgroundColor:
                                    index === selectedIndex ? "lightgray" : "white",
                            }}
                            onClick={() => handleCountrySelection(country.name)}
                        >
                            {country.name}
                        </ListItem>
                    ))}
                </List>
            )}
        </div>
    );
};

export default CountryData;