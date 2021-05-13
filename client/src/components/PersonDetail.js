import { Container, Paper, Card, CardHeader, Grid, CardContent, Typography, makeStyles, Avatar, GridList, GridListTile } from "@material-ui/core";
import CallIcon from '@material-ui/icons/Call';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from 'axios';
const useStyles = makeStyles({
    root: {
        margin: "100px auto"
    },
    container: {
        display: "grid",
        gridTemplateColumns: "1fr 2fr",
        ["@media (max-width:1000px)"]: {
            "&": {
                gridTemplateColumns: "1fr",
            }
        },
    },
    cardHeader: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold"
    },
    cardAvatar: {
        width: 200,
        height: 200,
        marginBottom: 10,
    },
    cardContent: {
        margin: "50px 30px !important",
        ["@media (max-width:1000px)"]: {
            "& .MuiGridListTile-root": {
                width: "50% !important"
            }
        },
        ["@media (max-width: 800px)"]: {
            "& .MuiGridListTile-root": {
                width: "100% !important"
            }
        }
    },
    value: {
        fontSize: "1.3rem",
        width: "100%",
        marginTop: "5px",
        overflowWrap: "break-word"

    },
    name: {
        fontWeight: "bold",
        fontSize: "2.5vw",
        ["@media (max-width:1000px)"]: {
            "&": {
                fontSize: 18
            }
        },
    },
    phone: {
        fontSize: "1.2vw",
        display: "flex",
        alignItems: "center",
        ["@media (max-width:1000px)"]: {
            "&": {
                fontSize: 16
            }
        },
    },
    career: {
        marginBottom: "0",
        height: "auto !important"
    },
    historyList: {
        marginTop: "30px"
    }
});

const getPerson = async (id) => {
    const { data } = await axios.get(`/person/${id}`);
    return data;
}

const PersonDetail = (props) => {
    const classes = useStyles();
    const { id } = useParams();
    const [person, setPerson] = useState({});
    useEffect(async () => {
        let data = await getPerson(id);
        setPerson(data);
        console.log(data);
    }, [id]);

    if (!person[0]) return null;

    return (
        <Container className={classes.root}>
            <Card>
                <CardContent className={classes.container}>
                    <Container className={classes.cardHeader} >
                        <Avatar className={classes.cardAvatar} src={person[0].picture} />
                        <Typography className={classes.name} color="secondary">{person[0].name} ({person[0].chinese_name}) </Typography>
                        <Typography className={classes.phone} color="secondary"><CallIcon style={{ marginRight: 5 }} />{person[0].phone}</Typography>
                    </Container>
                    <GridList className={classes.cardContent} cols={3}>
                        <GridListTile>
                            <Typography color="textSecondary" >정당</Typography>
                            <Typography className={classes.value} color="secondary">{person[0].party}</Typography>
                        </GridListTile>
                        <GridListTile>
                            <Typography color="textSecondary" >선거구</Typography>
                            <Typography className={classes.value} color="secondary">{person[0].location}</Typography>
                        </GridListTile>
                        <GridListTile>
                            <Typography color="textSecondary" >이메일</Typography>
                            <Typography className={classes.value} color="secondary">{person[0].email}</Typography>
                        </GridListTile>
                        <GridListTile>
                            <Typography color="textSecondary" >홈페이지</Typography>
                            <Typography className={classes.value} color="secondary" >
                                <a href={person[0].homepage}> {person[0].homepage} </a>
                            </Typography>
                        </GridListTile>
                        <GridListTile>
                            <Typography color="textSecondary" >의원실</Typography>
                            <Typography className={classes.value} color="secondary">{person[0].office}</Typography>
                        </GridListTile>
                    </GridList>
                </CardContent>
            </Card>
            <Card className={classes.historyList}>
                <CardHeader title="경력사항" />
                <CardContent >
                    <GridList cols={1}>
                        <GridListTile className={classes.career}>
                            <Typography className={classes.value} color="secondary">• {person[1].record_date} {person[1].record}</Typography>
                        </GridListTile>
                        {
                            Object.keys(person).map((key) => (
                                key !== "0" && key !== "1" &&
                                <GridListTile className={classes.career}>
                                    <Typography className={classes.value} color="secondary">• {person[key].career_date} {person[key].career}</Typography>
                                </GridListTile>
                            ))

                        }

                    </GridList>
                </CardContent>
            </Card>
        </Container >
    );
}

export default PersonDetail;