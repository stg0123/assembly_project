import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LawSearchCard from './LawSearchCard';

const useStyles = makeStyles({
    grid: {
        width: '60%'
    }
});

const getData = () => {
    const searchStr = "최신 법률법률"
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

const RecentLaw = (props) => {
    const [List, setList] = useState([])
    const classes = useStyles();

    useEffect(() => {
        setList(getData())
    }, []);
    return (
        <Grid container justify='center'>
            <Grid container className={classes.grid} alignItems='flex-start' justify='center'>
                {List.map((info) => {
                    return (<LawSearchCard {...props} {...info} />)
                })}
            </Grid>
        </Grid>
    );
}

export default RecentLaw;