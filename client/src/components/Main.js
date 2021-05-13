import React from 'react';
import Header from './Header';
import SearchBar from './SearchBar';
import TopThreeList from './TopThreeList';

const Main = (props) => {
    return (
        <>
            <Header {...props} type={props.type} />
            <SearchBar showLogo type={props.type} />
            {props.type === "law" && <TopThreeList />}
        </>
    );
}

export default Main;