import React, { useState } from 'react';
import { TextField, Container, InputAdornment, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: 50,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center"
    },
    typography: {
        fontSize: "100px",
    },
    search: {
        width: "60vw"
    },
}));

const SearchBar = (props) => {
    const classes = useStyles();
    const type = props.type;
    const showLogo = props.showLogo;
    const placeholder = (type.startsWith('law')) ? "법안명, 법안 키워드, ..." : "의원명...";
    const [input, setInput] = useState("");
    const changeInput = (e) => {
        setInput(e.target.value);
    }
    const onSubmit = () => {
        if(input.length==0){
            alert('검색어가 없습니다.')
            return
        }
        props.setTarget(input)
        if (type=='law') props.history.push('/search')
    }
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            onSubmit();
        }
    }
    return (
        <Container className={classes.root}>
            {showLogo && <Typography className={classes.typography} color="primary">국회.gg</Typography>}
            <TextField className={classes.search} placeholder={placeholder} variant="outlined" onKeyDown={handleKeyDown} onChange={changeInput}
                InputProps={{
                    endAdornment: <InputAdornment position="end"><Button variant="contained" color="primary" onClick={onSubmit}>.GG</Button></InputAdornment>
                }}
            />
        </Container>
    )
};

export default SearchBar;