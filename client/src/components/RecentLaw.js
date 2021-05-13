import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LawSearchCard from './LawSearchCard';
import axios from 'axios'
import { Card } from '@material-ui/core';

const useStyles = makeStyles({
    grid: {
        width: '60%'
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

const getData = async (page) => {
    let { data } = await axios.get(`/laws/?page_size=${page}`)
    let tmp = data.results.map((law) => {
        return {
            name: law.bill_name,
            maker: `${law.main_lawmaker} ${law.proposal_kind}` + (law.sum_lawmaker > 1 ? ` 외 ${law.sum_lawmaker - 1}인` : ''),
            date: law.propose_dt,
            content: law.law_summary,
            agree: law.law_like,
            disagree: law.law_dislike,
            code: law.law_id
        }
    })
    console.log(tmp)
    if(data.next!=null) return [tmp,true]
    else return [tmp,false]
}

const RecentLaw = (props) => {
    const [List, setList] = useState([])
    const [page,setPage] = useState(1)
    let haveNext=true
    const classes = useStyles();

    useEffect(async () => {
        console.log(page)
        let [tmp,ttmp]=await getData(page)
        console.log(tmp)
        haveNext=ttmp
        setList([...List,...tmp])
    }, [page]);

    const moreClick=()=>{
        if(haveNext){
            setPage(page=>page+1)
        }
    }
    return (
        <Grid container justify='center'>
            <Grid container className={classes.grid} alignItems='flex-start' justify='center'>
                {List.map((info) => {
                    return (<LawSearchCard {...props} {...info} />)
                })}
                <Grid item xs={12}>
                <Card className={classes.more} justify='center' onClick={moreClick}>
                    <Grid container justify='center'>
                        더보기
                    </Grid>
                </Card>
                </Grid>
                
            </Grid>
        </Grid>
    );
}

export default RecentLaw;