import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

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
        backgroundColor: '#f44336'
    },
    bar: {
        fontSize: '10px',
        marginBottom: '10px'
    },
});

function LawSearchCard(props) {
    const { name, maker, date, content, agree, disagree } = props
    const classes = useStyles()
    const bull = <span className={classes.bullet}>•</span>;

    const getAgreePercent = () => {
        if (agree == 0 && disagree == 0) return '0%'
        return `${parseInt((agree / (agree + disagree)) * 100)}%`
    }

    const getDisgreePercent = () => {
        if (agree == 0 && disagree == 0) return '0%'
        return `${parseInt((disagree / (agree + disagree)) * 100)}%`
    }

    return (
        <Card className={classes.root} onClick={() => { alert('asdf') }}>
            <CardContent>
                <Grid container>
                    <Grid style={{ width: getAgreePercent() }} className={[classes.barAgree, classes.bar]}>ㅤ</Grid>
                    <Grid style={{ width: getDisgreePercent() }} className={[classes.barDisagree, classes.bar]}>ㅤ</Grid>
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