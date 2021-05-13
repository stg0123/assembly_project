import React, { useState } from 'react';
import { GridList, GridListTile, makeStyles, Container, Avatar, Typography, Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { useEffect } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';

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
    summary: {
        fontSize: "14px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitLineClamp: 5,
        WebkitBoxOrient: "vertical",
        lineHeight: "1.4rem",
        height: "7rem"


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

const TopThreeItem = ({ bill }) => {
    const classes = useStyles();
    const routeToBill = () => {
        console.log(bill.id);
    }
    return (
        <Card className={classes.card}>
            <CardHeader
                avatar={<Avatar className={classes[bill.rank]}>{bill.rank}</Avatar>}
                title={
                    <Typography className={classes.title} color="textPrimary" gutterBottom>
                        {bill.title}
                    </Typography>
                }
                subheader={
                    <Typography color="textSecondary" className={classes.votes}>
                        <span className="up">찬성: {bill.up}</span> | <span className="down">반대: {bill.down}</span>
                    </Typography>

                }
            />
            <CardContent>
                <Typography variant="body1" component="p" className={classes.summary}>
                    {bill.summary}
                </Typography>
            </CardContent>
            <CardActions className={classes.actions}>
                <Button size="small" color="primary" onClick={routeToBill}>
                    더보기
                </Button>
            </CardActions>
        </Card>
    )
}

const getTopThree = () => {
    return [
        {
            id: "1238012",
            rank: 1,
            title: "감염병의 예방 및 관리에 관한 법률",
            up: 10,
            down: 5,
            summary: `
                코로나19로 잃어버린 일상을 하루 빨리 되찾기 위해서는 접종시스템 개선, 접종인센티브, 전문가 캠페인 등의 조치와 함께 예방접종 이상반응에 대한 불안감 해소를 위한 적극적 조치를 통해 접종률을 향상시켜야 함.
                이와 관련 1995년 이후 백신 제조나 유통의 결함이 없더라도 접종으로 인한 피해가 인정되면 국가에서 그 피해를 책임지는 ‘예방접종피해보상제도’를 시행하고 있음.특히 대법원은 예방접종과 장애 등 사이의 인과관계는 반드시 의학적·자연과학적으로 명백히 증명되어야 하는 것은 아니고, 간접적 사실관계 등 제반 사정을 고려할 때 인과관계가 있다고 추단되는 경우에는 증명이 있다고 보아야 한다(대법원 2019. 4. 3. 선고 2017두52764 판결).고 하였음.
                하지만 예방접종과 피해사실의 인과성을 밝히기 쉽지 않고 심사 기간 장기화로 적시에 충분한 보상이 이뤄지지 않고 있으며, 최근 코로나19 백신 접종 후 이상반응 사례로 국민들의 우려가 큰 상황임.
                코로나19 백신은 초유의 감염병 재난상황을 극복하고자 신속하게 심사하여 허가한 의약품으로 이상반응 입증이 어려운 의학적 그레이존이 존재할 수밖에 없음.이에 혹시라도 발생할 수 있을 코로나19 백신 접종 후 이상반응에 대한 보상을 함에 있어 모든 가능성을 열어두고 보다 선제적 조치를 할 필요가 있음.
                이에 코로나19 백신 등 신속심사 허가된 의약품을 투여받은 사람이 이상 증상 또는 질병이 발생한 경우 국가 등이 보상 비용을 선지급할 수 있도록 함으로써 팬데믹 상황에서 백신 부작용에 대한 불안감을 해소하고 일반 국민과 의료진의 백신 접종 수용성을 높이도록 하려는 것임(안 제71조의2 신설).'
                `
        },
        {
            id: "3213123",
            rank: 2,
            title: "감염병의 예방 및 관리에 관한 법률",
            up: 11,
            down: 3,
            summary: `
                코로나19로 잃어버린 일상을 하루 빨리 되찾기상황에서 백신 부작용에 대한 불안감을 해소하고 일반 국민과 의료진의 백신 접종 수용성을 높이도록 하려는 것임(안 제71조의2 신설).'
                `
        },
        {
            id: "12312321",
            rank: 3,
            title: "감염병의 예방 및 관리에 관한 법률",
            up: 110,
            down: 52,
            summary: `
                코로나19로 잃어버린 일상을 하루 빨리  국민과 의료진의 백신 접종 수용성을 높이도록 하려는 것임(안 제71조의2 신설).'
                `
        }
    ]
}

const TopThreeList = () => {
    const classes = useStyles();
    const [topThree, setTopThree] = useState([]);
    useEffect(() => {
        setTopThree(getTopThree());
        console.log('mount')
    }, []);
    return (
        <GridList cols={3} className={classes.root} style={{ margin: "30px auto" }} spacing={3}>
            {topThree.map(item => (
                <GridListTile style={{ height: "auto" }}><TopThreeItem bill={item} /></GridListTile>
            ))}
        </GridList>
    )
}


export default TopThreeList;