import { Container, Paper, Card, CardHeader, Grid, CardContent, Typography, makeStyles, Avatar, GridList, GridListTile } from "@material-ui/core";


const useStyles = makeStyles({
    root: {
        margin: "100px auto"
    },
    cardHeader: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    cardAvatar: {
        width: 100,
        height: 100,
        marginRight: 50
    },
    cardContent: {
        margin: "50px 30px !important"
    },
    value: {
        fontSize: "1.5rem"
    }
});

const PersonDetail = (props) => {
    const classes = useStyles();
    const id = props.id;
    return (
        <Container className={classes.root}>
            <Card>
                <CardContent>
                    <Container className={classes.cardHeader} >
                        <Avatar className={classes.cardAvatar} src="https://www.assembly.go.kr/photo/9770276.jpg" />
                        <Typography variant="h3">김의원 (한자이름)</Typography>
                    </Container>
                    <GridList className={classes.cardContent} cols={3}>
                        <GridListTile>
                            <Typography color="textSecondary" >정당</Typography>
                            <Typography className={classes.value}>국민의 힘</Typography>
                        </GridListTile>
                        <GridListTile>
                            <Typography color="textSecondary" >선거구</Typography>
                            <Typography className={classes.value}>대구 수성구갑</Typography>
                        </GridListTile>
                        <GridListTile>
                            <Typography color="textSecondary" >전화번호</Typography>
                            <Typography className={classes.value}>010-1234-5678</Typography>
                        </GridListTile>
                        <GridListTile>
                            <Typography color="textSecondary" >이메일</Typography>
                            <Typography className={classes.value}>email@email.com</Typography>
                        </GridListTile>
                        <GridListTile>
                            <Typography color="textSecondary" >홈페이지</Typography>
                            <Typography className={classes.value}>www.homepage.com</Typography>
                        </GridListTile>
                    </GridList>
                </CardContent>
            </Card>
        </Container>
    );
}

export default PersonDetail;