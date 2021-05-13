import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        cursor: 'pointer',
        fontFamily: 'Jua',
        flexShrink: 0
    },
    buttons: {
        flexGrow: 1,
        marginLeft: '20px',
        flexShrink: 0
    },
    icon: {
        margin: '10px'
    },
    logoutButton: {
        wordBreak: 'keep-all',
        lineHeight: '120%',
        textTransform: 'lowercase'
    }
}));



function Header(props) {
    const { type } = props
    const { isLogin, userID } = props.user
    const classes = useStyles();
    const logout = () => {
        props.setUser({ ...props.user, isLogin: false })
    }
    return (
        <AppBar position="static" elevation={0} className={classes.root}>
            <Toolbar>
                <Typography variant="h5" className={classes.title} onClick={() => { props.history.push('/') }}>
                    국회.gg
          </Typography>
                <div className={classes.buttons}>
                    <Button color={type === 'law' ? "secondary" : "inherit"} variant={type === 'law' ? "contained" : "text"} onClick={() => { props.history.push('/') }}>법안</Button>
                    <Button color={type === 'person' ? "secondary" : "inherit"} variant={type === 'person' ? "contained" : "text"} onClick={() => { props.history.push('/person') }}>의원</Button>
                </div>
                {
                    isLogin
                        ? <Button color="inherit" onClick={logout} className={classes.logoutButton}><AccountCircleIcon className={classes.icon} />{userID} 로그아웃</Button>
                        : <Button color="inherit" onClick={() => { props.history.push('/signin') }}><AccountCircleIcon className={classes.icon} />로그인</Button>
                }

            </Toolbar>
        </AppBar>
    )
}

export default Header
