import React, { useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LawSearchCard from './LawSearchCard';
import axios from 'axios'
import { Card } from '@material-ui/core';
import {useParams} from 'react-router-dom'

import SearchBar from './SearchBar'

const useStyles = makeStyles({
    root: {
        minWidth: 300,
        margin: '10px',
        cursor: 'pointer'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    grid: {
        width: '60%'
    },
    barAgree: {
        backgroundColor: 'blue'
    },
    barDisagree: {
        backgroundColor: 'red'
    },
    bar: {
        fontSize: '10px',
        marginBottom: '10px'
    },
    result: {
        marginTop: '10px'
    },
    more:{
        margin:'10px',
        paddingTop:'10px',
        paddingBottom:'10px',
        backgroundColor:'#5383e8',
        color:'white',
        cursor:'pointer'
    }  
});
const getData = async (word,page) => {
    let { data } = await axios.get(`/laws/?page_size=${page}&search=${word}`)
    let tmp = data.results.map((law) => {
        return {
            name: law.bill_name,
            maker: `${law.main_lawmaker} ${law.proposal_kind}` + (law.sum_lawmaker > 1 ? ` 외 ${law.sum_lawmaker - 1}인` : ''),
            date: law.propose_dt,
            content: law.law_summary,
            agree: law.law_like,
            disagree: law.law_dislike,
            code: law.bill_no
        }
    })
    console.log(tmp)
    if(data.next!=null) return [tmp,true]
    else return [tmp,false]
}

function LawSearch(props) {
    const { word } = useParams();
    const [List, setList] = useState([])
    const [page,setPage] = useState(1)
    let haveNext=true
    useEffect(async () => {
        console.log(page)
        let [tmp,ttmp]=await getData(word,page)
        console.log(tmp)
        haveNext=ttmp
        setList([...List,...tmp])
    }, [page,word]);
    const classes = useStyles()
    const bull = <span className={classes.bullet}>•</span>;
    const handleChange = searchTarget => event => {
        props.history.push(`/search/${event.target.value}`)
        setList([])
        setPage(1)
    };
    const moreClick=()=>{
        if(haveNext){
            setPage(page=>page+1)
        }
    }
    return (
        <Grid container justify='center'>
            <SearchBar type={'lawInside'} {...props} {...{setPage,setList,word}} />
            <Grid container className={classes.grid} alignItems='center' justify='center'>
                <Typography className={classes.result} variant='h4'><b>{word}</b>에 대한 검색 결과입니다.</Typography>
            </Grid>
            <Grid container className={classes.grid} alignItems='flex-start' justify='center'>
                {List.map((info) => {
                    return (<LawSearchCard {...props} {...info} />)
                })}
                {List.length == 0
                    ? <LawSearchCard {...props} {...{
                        name: '검색 결과가 없습니다.',
                        agree: 0,
                        disagree: 0
                    }} /> : <></>}
                    <Grid item xs={12}>
                <Card className={classes.more} justify='center' onClick={moreClick}>
                    <Grid container justify='center'>
                        더보기
                    </Grid>
                </Card>
                </Grid>
            </Grid>
        </Grid>

    )
}

export default LawSearch
