import React from 'react';
import SearchBar from './SearchBar';
import TopThreeList from './TopThreeList';
import LawSearchCard from './LawSearchCard';
import RecentLaw from './RecentLaw';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    typo: {
        margin: "20px 0",
        marginLeft: "20%",
        fontWeight: "bold"
    }
}));


const Main = (props) => {
    const classes = useStyles();
    return (
        <>
            <SearchBar showLogo type={props.type} {...props} />
            {props.type === "law" &&
                <>
                    <Typography variant="h4" color="secondary" className={classes.typo}>Top 3</Typography>
                    <TopThreeList />
                    <Typography variant="h4" color="secondary" className={classes.typo}>최신 법안들</Typography>
                    <RecentLaw />
                </>
            }
        </>
    );
}

export default Main;