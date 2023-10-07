import { Button, Container, Grid } from "@mui/material";
import CountryData from "../../components/CountryData/CountryData";
import Service from "../../components/Service/Service";
import WeightData from "../../components/WeightData/WeightData";
import CarrierData from "../../components/AllInputField/CarrierData";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { toast } from 'react-toastify';
import ratesData from "../utilities/rateCalculate";
const AllInputField = ({ initialRates }) => {

    const [country, setCountry] = useState()
    const [service, setService] = useState()
    const [carrier, setCarrier] = useState()
    const [weight, setWeight] = useState()
    const [rates, setRates] = useState("0");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [activeResult, setActiveResult] = useState(false);


    const rateUpdateState = async () => {

        const variablesData = {
            country,
            service,
            carrier,
            weight: parseFloat(weight),
        };

        try {
            const fetchedRates = await ratesData(variablesData);

            if (fetchedRates) {
                setRates(fetchedRates);
                setError("");
            } else {
                setError("Service Not Available");
                setRates(initialRates);
            }
        } catch (error) {
            setError(
                error.message == "Response not successful: Received status code 400"
                    ? setRates(0)
                    : setError("Service Not Available")
            );

            setRates(initialRates);
        } finally {
            setLoading(false);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!country) {
            toast("X Please select your country!")
        }
        else if (!service) {
            toast("X Please choose your service!")
        }
        else if (!carrier) {
            toast("X Please choose your carrier!")
        }
        else if (!weight) {
            toast("X Please give your product weight")
        }
        else {
            rateUpdateState();
            setActiveResult(true);
        }
    };


    useEffect(() => {
        if (activeResult) {
            if (weight < 0) {
                Swal.fire({
                    title: 'Plese provide ur value',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                })
            } else {
                rateUpdateState();
            }
        }
        setLoading(activeResult);
    }, [country, service, carrier, weight]);


    return (
        <Container maxWidth="lg">
            <form onSubmit={handleFormSubmit}>
                <div>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={3} xl={3}>
                            <CountryData elevation={3} setCountry={setCountry} />
                        </Grid>
                        <Grid item xs={12} md={6} lg={3} xl={3}>
                            <Service elevation={3} setService={setService} />
                        </Grid>
                        <Grid item xs={12} md={6} lg={3} xl={3}>
                            <CarrierData elevation={3} setCarrier={setCarrier} />
                        </Grid>
                        <Grid item xs={12} md={6} lg={3} xl={3}>
                            <WeightData elevation={3} setWeight={setWeight} />
                        </Grid>
                    </Grid>
                    <div style={{ display: "flex", marginTop: "60px", justifyContent: "center" }}>
                        <div>

                            <div style={{ display: "flex", justifyContent: "center", fontSize: "20px" }}>
                                {error ? (
                                    <span className="text-sm text-rose-600">{error}</span>
                                ) : (
                                    <div className="flex items-center h-10">

                                        {loading ? (
                                            <p>
                                                <span>Loading......</span>
                                            </p>
                                        ) : (
                                            <span className="font-bold text-[#08919E] text-2xl">
                                                <span style={{ color: "green" }}>Total amount:</span>  <span style={{ color: "blueviolet" }}>{rates ? rates : "Service not available"} (BDT)</span>
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <Button style={{ backgroundColor: "rgb(12, 74, 154)", color: "white", marginTop: "20px"}} variant="primary"
                                    type="submit"
                                >
                                    Calculate
                                </Button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </form>


        </Container>
    );
};

export async function getServerSideProps() {
    const variablesData = {
        country: "", // initial values for input fields
        service: "",
        carrier: "",
        weight: 0,
    };

    const initialRates = await fetchRates(variablesData);

    return {
        props: {
            initialRates,
        },
    };
}

export default AllInputField;


