import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useState } from 'react';

import crypto from 'crypto';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                국회.gg
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: 'white',
        margin: "auto",
        marginTop: '60px',
        padding: '30px',
        boxShadow: '5px 5px 10px 1px #888888'
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp(props) {
    const classes = useStyles();
    const [userInfo, setUserInfo] = useState({});

    const changeUserInfo = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    }

    const doCheck=(data)=>{return {success:true,message:'이미 존재하는 계정입니다.'}}

    const onSubmit = () => {
        if(!userInfo.ID){
            alert('ID가 입력되지 않았습니다.')
            return
        }
        if(!userInfo.password){
            alert('비밀번호가 입력되지 않았습니다.')
            return
        }
        if (userInfo.password !== userInfo.passwordConfirm) {
            alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.')
            return
        }
        const {success,message}=doCheck({
            ID:userInfo.ID,
            Password:crypto.createHash('sha256').update(userInfo.password).digest('hex')
        })
        if(success){
            alert('회원가입에 성공했습니다. 로그인해 주십시오.')
            props.history.push('/signin')
        } else{
            alert(`회원가입에 실패했습니다. ${message}`)
        }
    }
    const onKeyPress = (e) =>{
        if(e.key==='Enter'){
            onSubmit()
        }
    }

    return (
        <Container component="main" maxWidth="xs" className={classes.container}>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    회원가입
        </Typography>
                <form className={classes.form} noValidate onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="standard"
                                fullWidth
                                id="ID"
                                label="ID"
                                name="ID"
                                autoComplete="ID"
                                onChange={e => changeUserInfo(e)}
                                onKeyPress={onKeyPress}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="standard"
                                fullWidth
                                name="password"
                                label="비밀번호"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={e => changeUserInfo(e)}
                                onKeyPress={onKeyPress}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="standard"
                                fullWidth
                                name="passwordConfirm"
                                label="비밀번호 확인"
                                type="password"
                                id="passwordConfirm"
                                onChange={e => changeUserInfo(e)}
                                onKeyPress={onKeyPress}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={onSubmit}

                    >
                        회원가입
          </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link onClick={() => { props.history.push('signin') }} variant="body2">
                                이미 계정이 있으신가요? 로그인하기
              </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}