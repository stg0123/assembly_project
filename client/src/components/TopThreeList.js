import React, { useState } from 'react';
import { GridList, GridListTile, makeStyles, Container, Avatar, Typography, Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { useEffect } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import axios from 'axios';
const useStyles = makeStyles((theme) => ({
    root: {
        width: "60%",
        ["@media (max-width:1000px)"]: {
            "& .MuiGridListTile-root": {
                width: "100% !important"
            }
        }

    },
    tile: {
        background: "#ddd",
        borderRadius: 5,

    },
    card: {
        border: "1px solid #ccc",
        borderRadius: "3%"
    },
    header: {
        display: "flex",
    },
    1: {
        background: "gold",
    },
    2: {
        background: "silver"
    },
    3: {
        background: "#B08D57"
    },
    title: {
        fontWeight: "bold",
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        lineHeight: "1.5rem",
        height: "3rem"
    },
    info: {
        fontSize: "13px",
        marginBottom: 5
    },

    summary: {
        fontSize: "14px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitLineClamp: 5,
        WebkitBoxOrient: "vertical",
        lineHeight: "1.4rem",
        height: "6.8rem"


    },
    votes: {
        fontWeight: "bold",
        '& .up': {
            color: '#4791db'
        },
        '& .down': {
            color: '#f44336'
        },
    },
    actions: {
        display: "flex",
        justifyContent: "flex-end"
    }
}))

const TopThreeItem = (props) => {
    const {bill,rank}=props
    const classes = useStyles();
    const routeToBill = () => {
        props.history.push(`/content/${bill.code}`)
    }
    return (
        <Card className={classes.card}>
            <CardHeader
                avatar={<Avatar className={classes[rank]}>{rank}</Avatar>}
                title={
                    <Typography className={classes.title} color="textPrimary" gutterBottom>
                        {bill.name}
                    </Typography>
                }
                subheader={
                    <Typography color="textSecondary" className={classes.votes}>
                        <span className="up">??????: {bill.agree}</span> | <span className="down">??????: {bill.disagree}</span>
                    </Typography>

                }
            />
            <CardContent>
                <Typography omponent="p" className={classes.info} color="textSecondary">
                    {bill.date} {bill.maker}
                </Typography>
                <Typography variant="body1" component="p" className={classes.summary}>
                    {bill.content}
                </Typography>
            </CardContent>
            <CardActions className={classes.actions}>
                <Button size="small" color="primary" onClick={routeToBill}>
                    ?????????
                </Button>
            </CardActions>
        </Card>
    )
}

const getTopThree = async () => {
    let { data } = await axios.get('/top3');
    let tmp = data.results.map((law) => {
        return {
            name: law.bill_name,
            maker: `${law.main_lawmaker} ${law.proposal_kind}` + (law.sum_lawmaker > 1 ? ` ??? ${law.sum_lawmaker - 1}???` : ''),
            date: law.propose_dt,
            content: law.law_summary,
            agree: law.law_like,
            disagree: law.law_dislike,
            code: law.law_id
        }
    })
    console.log(tmp);
    return tmp;
}

const TopThreeList = (props) => {
    const classes = useStyles();
    const [topThree, setTopThree] = useState([]);
    useEffect(async () => {
        setTopThree(await getTopThree());
    }, []);
    return (
        <GridList cols={3} className={classes.root} style={{ margin: "30px auto" }} spacing={3}>
            {topThree.map((item, index) => (
                <GridListTile key={item.name} style={{ height: "auto" }}><TopThreeItem bill={item} rank={index + 1} {...props}/></GridListTile>
            ))}
        </GridList>
    )
}


export default TopThreeList;