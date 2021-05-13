import Avatar from '@material-ui/core/Avatar';
import { Container} from '@material-ui/core';
import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
      width: '100%',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
   large: {
      margin: theme.spacing(2),
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
    morebtn:{
        display:'flex',
        justifyContent:'flex-end'
    }
}));

export default function MediaControlCard() {
  const classes = useStyles();
  const theme = useTheme();

  return (
      <Container style={{ width: "60%" ,paddingTop: 100, paddingBottom: 100  }}>

    <Card className={classes.root}>
            <Avatar alt="Remy Sharp" src="https://www.assembly.go.kr/photo/9770276.jpg" className={classes.large}/>
      <div className={classes.details} >
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            의원 이름(한자)
          </Typography>
            <Typography variant="subtitle2">
            영어이름
          </Typography>
          <Typography variant="subtitle2">
            <br/>지역구 
          </Typography>
            <Typography variant="subtitle1" color="textSecondary">
            재선,초선등 정보
          </Typography>
        </CardContent>
          <div >
              <CardActions className={classes.morebtn}>
        <Button size="small" color="primary" >
          상세 보기
        </Button>
      </CardActions>
          </div>
      </div>
    </Card>
      </Container>
  );
}