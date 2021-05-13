import React from 'react';
import Person from './Person';
import { Grid } from '@material-ui/core';
import SearchBar from './SearchBar';

const PersonSearch = (props) => {
    return (
        <Grid container justify='center'>
            <SearchBar type={props.type} {...props} />
            <Person {...props} />
            <Person {...props} />
            <Person {...props} />
            <Person {...props} />
        </Grid>

    );
}

export default PersonSearch;