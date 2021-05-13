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
        margin:'10px'
    }  
});

const getData = async () => {
    let {data}= await axios.get('/laws/?page_size=1')
    // .then(({data})=>{
    //     return data.results.map((law)=>{
    //         return {
    //             name:law.bill_name,
    //             maker:`${law.main_lawmaker} ${law.proposal_kind}`+(law.sum_lawmaker>1?` 외 ${law.sum_lawmaker-1}인`:''),
    //             date:law.propose_dt,
    //             content:law.law_summary,
    //             agree:law.law_like,
    //             disagree:law.law_dislike,
    //             code:law.bill_no
    //         }
    //     })
    // })
    
    let tmp= data.results.map((law)=>{
                 return {
                     name:law.bill_name,
                     maker:`${law.main_lawmaker} ${law.proposal_kind}`+(law.sum_lawmaker>1?` 외 ${law.sum_lawmaker-1}인`:''),
                     date:law.propose_dt,
                     content:law.law_summary,
                     agree:law.law_like,
                     disagree:law.law_dislike,
                     code:law.bill_no
                 }
             })
    console.log(tmp)
    return tmp
}

const RecentLaw = (props) => {
    const [List, setList] = useState([])
    const classes = useStyles();

    useEffect(async () => {
        setList(await getData())
    }, []);
    return (
        <Grid container justify='center'>
            <Grid container className={classes.grid} alignItems='flex-start' justify='center'>
                {List.map((info) => {
                    return (<LawSearchCard {...props} {...info} />)
                })}
                <Grid item xs={12}>
                <Card className={classes.more}>
                    더보기
                </Card>
                </Grid>
                
            </Grid>
        </Grid>
    );
}

export default RecentLaw;