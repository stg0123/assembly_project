import Avatar from '@material-ui/core/Avatar';
import { Container } from '@material-ui/core';
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
  morebtn: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  avatar: {
  }
}));

export default function Person(props) {
  const classes = useStyles();
  const theme = useTheme();
  const person = props.person;
  const routeToDetail = () => {
    props.history.push(`/person/detail/${person.id}`);
  }

  return (
    <Container style={{ width: "60%", paddingTop: 30, paddingBottom: 30 }}>

      <Card className={classes.root}>
        <Avatar alt="Remy Sharp" src={person.picture} className={classes.large} />
        <div className={classes.details} >
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5" className={classes.avatar}>
              {person.name} ({person.chinese_name})
            </Typography>
            <Typography variant="subtitle2">
              {person.english_name}
            </Typography>
            <Typography variant="subtitle2">
              <br />{person.party}
              <br />{person.location}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {person.elected}
            </Typography>
          </CardContent>
          <div >
            <CardActions className={classes.morebtn}>
              <Button size="small" color="primary" onClick={routeToDetail}>
                상세 보기
              </Button>
            </CardActions>
          </div>
        </div>
      </Card>
    </Container>
  );
}