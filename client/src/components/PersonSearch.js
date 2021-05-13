import React from 'react';
import Person from './Person';
import { Grid, Container, Button } from '@material-ui/core';
import SearchBar from './SearchBar';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const getSearch = async (word, page) => {
    console.log(word, page);
    let { data } = await axios.get(`/lawmakers/?search=${word}&page_size=${page}`);
    if (data.next !== null) return [data.results, true]
    console.log('nomore');
    return [data.results, false];
}


const PersonSearch = (props) => {
    const { word } = useParams();
    const [page, setPage] = useState(1);
    const [haveNext, setHaveNext] = useState(false);
    const [personList, setPersonList] = useState([]);

    useEffect(async () => {
        console.log(word);
        let [data, more] = await getSearch(word, page)
        setHaveNext(more);
        console.log(data);
        setPersonList([...personList, ...data]);
    }, [word, page]);

    const moreClick = () => {
        if (haveNext) {
            setPage(page => page + 1)
        }
    }
    return (
        <Grid container justify='center' direction="column" alignItems="center">
            <SearchBar type={props.type} {...props} />
            {
                personList.map(item => (
                    <Person key={item.id} person={item}  {...props} />
                ))
            }
            {
                haveNext && <Button style={{ width: "60%", marginBottom: "20px", height: "60px" }} variant="contained" color="primary" onClick={moreClick}>
                    더보기
                </Button>
            }
        </Grid>

    );
}

export default PersonSearch;