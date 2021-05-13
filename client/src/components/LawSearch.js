import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LawSearchCard from './LawSearchCard';

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
    }
});

const getData = (searchStr) => {
    return [{
        name: `대충 ${searchStr} 법률 이름이 있을걸에 관한 법률 일부개정법률안`,
        maker: 'ㅇㅇㅇ 의원 외 00명',
        date: '2021년 5월 13일',
        content: '대충 법률 내용 설명 이러이러한 법입니다 ㅁㄴㅇㄹ 대충 법률 내용 설명 이러이러한 법입니다 ㅁㄴㅇㄹ 대충 법률 내용 설명 이러이러한 법입니다 ㅁㄴㅇㄹ 대충 법률 내용 설명 이러이러한 법입니다 ㅁㄴㅇㄹ 대충 법률 내용 설명 이러이러한 법입니다 ㅁㄴㅇㄹ 대충 법률 내용 설명 이러이러한 법입니다 ㅁㄴㅇㄹ 대충 법률 내용 설명 이러이러한 법입니다 ㅁㄴㅇㄹ 대충 법률 내용 설명 이러이러한 법입니다 ㅁㄴㅇㄹ ',
        agree: 100,
        disagree: 20
    },
    {
        name: `대충${searchStr}법안`,
        maker: 'ㅇㅇㅇ 의원 외 00명',
        date: '2021년 5월 13일',
        content: '대충 법률 내용 설명 이러이러한 법입니다 ㅁㄴㅇㄹ 대충 법률 내용 설명 이러이러한 법입니다 ㅁㄴㅇㄹ 대충 법률 내용 설명 이러이러한 법입니다 ㅁㄴㅇㄹ 대충 법률 내용 설명 이러이러한 법입니다 ㅁㄴㅇㄹ 대충 법률 내용 설명 이러이러한 법입니다 ㅁㄴㅇㄹ 대충 법률 내용 설명 이러이러한 법입니다 ㅁㄴㅇㄹ 대충 법률 내용 설명 이러이러한 법입니다 ㅁㄴㅇㄹ 대충 법률 내용 설명 이러이러한 법입니다 ㅁㄴㅇㄹ 대충 법률 내용 설명 이러이러한 법입니다 ㅁㄴㅇㄹ 대충 법률 내용 설명 이러이러한 법입니다 ㅁㄴㅇㄹ 대충 법률 내용 설명 이러이러한 법입니다 ㅁㄴㅇㄹ 대충 법률 내용 설명 이러이러한 법입니다 ㅁㄴㅇㄹ 대충 법률 내용 설명 이러이러한 법입니다 ㅁㄴㅇㄹ 대충 법률 내용 설명 이러이러한 법입니다 ㅁㄴㅇㄹ 대충 법률 내용 설명 이러이러한 법입니다 ㅁㄴㅇㄹ 대충 법률 내용 설명 이러이러한 법입니다 ㅁㄴㅇㄹ ',
        agree: 20,
        disagree: 100
    },
    {
        name: `${searchStr}의 결정에 관한 법률 일부개정법률안`,
        maker: 'ㅇㅇㅇ 의원 외 00명',
        date: '2021년 5월 13일',
        content: '대충 법률 내용 설명 이러이러한 법입니다 ㅁㄴㅇㄹ 대충 법률 내용 설명 이러이러한 법입니다 ㅁㄴㅇㄹ 대충 법률 내용 설명 이러이러한 법입니다 ㅁㄴㅇㄹ 대충 법률 내용 설명 이러이러한 법입니다 ㅁㄴㅇㄹ 대충 법률 내용 설명 이러이러한 법입니다 ㅁㄴㅇㄹ 대충 법률 내용 설명 이러이러한 법입니다 ㅁㄴㅇㄹ 대충 법률 내용 설명 이러이러한 법입니다 ㅁㄴㅇㄹ 대충 법률 내용 설명 이러이러한 법입니다 ㅁㄴㅇㄹ 대충 법률 내용 설명 이러이러한 법입니다 ㅁㄴㅇㄹ 대충 법률 내용 설명 이러이러한 법입니다 ㅁㄴㅇㄹ 대충 법률 내용 설명 이러이러한 법입니다 ㅁㄴㅇㄹ 대충 법률 내용 설명 이러이러한 법입니다 ㅁㄴㅇㄹ 대충 법률 내용 설명 이러이러한 법입니다 ㅁㄴㅇㄹ 대충 법률 내용 설명 이러이러한 법입니다 ㅁㄴㅇㄹ 대충 법률 내용 설명 이러이러한 법입니다 ㅁㄴㅇㄹ 대충 법률 내용 설명 이러이러한 법입니다 ㅁㄴㅇㄹ 대충 법률 내용 설명 이러이러한 법입니다 ㅁㄴㅇㄹ 대충 법률 내용 설명 이러이러한 법입니다 ㅁㄴㅇㄹ 대충 법률 내용 설명 이러이러한 법입니다 ㅁㄴㅇㄹ 대충 법률 내용 설명 이러이러한 법입니다 ㅁㄴㅇㄹ 대충 법률 내용 설명 이러이러한 법입니다 ㅁㄴㅇㄹ 대충 법률 내용 설명 이러이러한 법입니다 ㅁㄴㅇㄹ 대충 법률 내용 설명 이러이러한 법입니다 ㅁㄴㅇㄹ 대충 법률 내용 설명 이러이러한 법입니다 ㅁㄴㅇㄹ ',
        agree: 1000,
        disagree: 896
    }]
}

function LawSearch(props) {
    const { Target, setTarget } = props
    const [List, setList] = useState([])
    const [searchTarget, setsearchTarget] = useState('')
    useEffect(() => {
        setList(getData(Target))
    }, [Target])
    const classes = useStyles()
    const bull = <span className={classes.bullet}>•</span>;
    const handleChange = searchTarget => event => {
        setsearchTarget(event.target.value)
    };
    return (
        <Grid container justify='center'>
            <SearchBar type={'lawInside'} {...props} />
            <Grid container className={classes.grid} alignItems='center' justify='center'>
                <Typography className={classes.result} variant='h4'>{Target}에 대한 검색 결과입니다.</Typography>
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
            </Grid>
        </Grid>

    )
}

export default LawSearch
