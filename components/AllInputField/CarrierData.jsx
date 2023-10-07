import React, { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { gql, useQuery } from "@apollo/client";

const GET_CARRIERS_QUERY = gql`
  query GetCarriers {
    getCarriers {
      result {
        list {
          name
        }
      }
    }
  }
`;

const CarrierData = ({ setCarrier }) => {
    const { loading, error, data } = useQuery(GET_CARRIERS_QUERY);
    const [inputValue, setInputValue] = useState("");

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    const carriesGetData = data?.getCarriers.result.list;

    const handleInputChange = (e, newValue) => {
        setInputValue(newValue);
        setCarrier(newValue);
    };

    return (
        <div style={{ marginTop: "20px" }}>
            <Autocomplete
                options={carriesGetData.map((carrier) => carrier.name)}
                value={inputValue}
                onChange={handleInputChange}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Carrier"
                        variant="outlined"
                        fullWidth
                    />
                )}
            />
        </div>
    );
};

export default CarrierData;
