import React from 'react';
import { TextField, Container, InputAdornment, Button } from '@material-ui/core';

const SearchBar = (prop) => {
    const isBill = prop.bill;
    const placeholder = isBill ? "법안명, 법안 키워드, ..." : "의원명...";
    return (
        <Container style={{ paddingTop: 100, paddingBottom: 100 }}>
            <TextField style={{ width: "60%" }} placeholder={placeholder} variant="outlined"
                InputProps={{
                    endAdornment: <InputAdornment position="end"><Button variant="contained" color="primary">.GG</Button></InputAdornment>
                }}
            />
        </Container>
    )
};

export default SearchBar;