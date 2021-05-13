import React from 'react';
import SearchBar from './SearchBar';
import TopThreeList from './TopThreeList';
import LawSearchCard from './LawSearchCard';
import RecentLaw from './RecentLaw';

const Main = (props) => {
    return (
        <>
            <SearchBar showLogo type={props.type} {...props} />
            {props.type === "law" && <TopThreeList />}
            {props.type === "law" && <RecentLaw />}
        </>
    );
}

export default Main;