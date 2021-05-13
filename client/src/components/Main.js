import React from 'react';
import SearchBar from './SearchBar';
import TopThreeList from './TopThreeList';

const Main = (props) => {
    return (
        <>
            <SearchBar showLogo type={props.type} {...props} />
            {props.type === "law" && <TopThreeList />}
        </>
    );
}

export default Main;