import React, { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { gql, useQuery } from "@apollo/client";

const GET_SERVICES_DATA = gql`
  query List {
    getServices {
      result {
        list {
          name
        }
      }
    }
  }
`;

const Service = ({ setService }) => {
    const { loading, error, data } = useQuery(GET_SERVICES_DATA);
    const [inputValue, setInputValue] = useState("");
    const [servicesData, setServicesData] = useState([]);

    useEffect(() => {
        if (!loading && !error) {
            setServicesData(data?.getServices.result.list);
        }
    }, [data, loading, error]);

    const handleInputChange = (e,newValue) => {
        setInputValue(e.target.value);
        setService(newValue)
    };

    return (
        <div style={{ marginTop: "20px" }}>
            <Autocomplete
                options={servicesData.map((service) => service.name)}
                value={inputValue}
                onChange={(_, newValue) => {
                    setInputValue(newValue);
                    setService(newValue);
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Service"
                        variant="outlined"
                        fullWidth
                        onChange={handleInputChange}
                    />
                )}
            />
        </div>
    );
};

export default Service;
