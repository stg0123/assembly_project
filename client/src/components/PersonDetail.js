import { Container, Paper, Card, CardHeader, Grid, CardContent, Typography, makeStyles, Avatar, GridList, GridListTile } from "@material-ui/core";
import CallIcon from '@material-ui/icons/Call';
import { useParams } from 'react-router-dom';
import { useEffect } from "react";
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
    }
});

const PersonDetail = (props) => {
    const classes = useStyles();
    const { id } = useParams();
    return (
        <Container className={classes.root}>
            <Card>
                <CardContent className={classes.container}>
                    <Container className={classes.cardHeader} >
                        <Avatar className={classes.cardAvatar} src="https://www.assembly.go.kr/photo/9770276.jpg" />
                        <Typography className={classes.name} color="secondary">김의원 (한자이름) </Typography>
                        <Typography className={classes.phone} color="secondary"><CallIcon style={{ marginRight: 5 }} />010-1234-5678</Typography>
                    </Container>
                    <GridList className={classes.cardContent} cols={3}>
                        <GridListTile>
                            <Typography color="textSecondary" >정당</Typography>
                            <Typography className={classes.value} color="secondary">국민의 힘</Typography>
                        </GridListTile>
                        <GridListTile>
                            <Typography color="textSecondary" >선거구</Typography>
                            <Typography className={classes.value} color="secondary">대구 수성구갑</Typography>
                        </GridListTile>
                        <GridListTile>
                            <Typography color="textSecondary" >이메일</Typography>
                            <Typography className={classes.value} color="secondary">email@emasdasdsail.com</Typography>
                        </GridListTile>
                        <GridListTile>
                            <Typography color="textSecondary" >홈페이지</Typography>
                            <Typography className={classes.value} color="secondary">www.homepaasdasge.com</Typography>
                        </GridListTile>
                    </GridList>
                </CardContent>
            </Card>
        </Container >
    );
}

export default PersonDetail;