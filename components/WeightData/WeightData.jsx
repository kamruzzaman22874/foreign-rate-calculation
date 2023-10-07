import { TextField } from "@mui/material";

const WeightData = ({setWeight}) => {
    return (
        <div style={{ marginTop: "20px" }}>
            <div>
                <TextField id="outlined-basic"
                    sx={{ marginBottom: "20px", width:"100%"}}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="0 KG"
                    label="Weight"
                    type='number'
                    variant="outlined" />
            </div>
        </div>
    );
};

export default WeightData;