import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
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
    barAgree: {
        backgroundColor: '#4791db'
    },
    barDisagree: {
        backgroundColor: '#f44336',
        textAlign: "end",
    },
    bar: {
        marginBottom: '10px',
    },
    barPercentage: {
        color: 'white',
        padding: 5,
        fontSize: 18,
        fontWeight: 'bold',
        display: "flex",
        alignItems: "center",

    },
    barPercentageAgree: {
        justifyContent: "flex-start",
        '& svg': {
            marginRight: 4
        }
    },
    barPercentageDisAgree: {
        justifyContent: "flex-end",
        '& svg': {
            marginLeft: 4
        }
    }
});

function LawSearchCard(props) {
    const { name, maker, date, content, agree, disagree, code } = props
    const classes = useStyles()
    const bull = <span className={classes.bullet}>•</span>;

    const getAgreePercent = () => {
        if (agree == 0 && disagree == 0) return '50%'
        return `${Math.round((agree / (agree + disagree)) * 100)}%`
    }

    const getDisgreePercent = () => {
        if (agree == 0 && disagree == 0) return '50%'
        return `${Math.round((disagree / (agree + disagree)) * 100)}%`
    }

    const lawClick=()=>{
        props.history.push(`/content/${code}`)
    }

    return (
        <Card className={classes.root} onClick={lawClick}>
            <CardContent>
                <Grid container>
                    <Grid style={{ width: getAgreePercent() }} className={[classes.barAgree, classes.bar]}>
                        <Typography className={[classes.barPercentage, classes.barPercentageAgree]}><ThumbUpAltOutlinedIcon /> {getAgreePercent()}</Typography>
                    </Grid>
                    <Grid style={{ width: getDisgreePercent() }} className={[classes.barDisagree, classes.bar]}>
                        <Typography className={[classes.barPercentage, classes.barPercentageDisAgree]}>{getDisgreePercent()} <ThumbDownAltOutlinedIcon /> </Typography>
                    </Grid>
                </Grid>
                <Typography variant="h5" component="h2">
                    {name}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {maker} {bull} {date}
                </Typography>
                <Typography variant="body2" component="p">
                    {content}
                </Typography>
            </CardContent>
        </Card>
    )

}

export default LawSearchCard;