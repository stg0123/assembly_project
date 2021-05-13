import React,{useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {ThumbDownTwoTone, ThumbUpTwoTone, ThumbsUpDownTwoTone, CreateTwoTone, CheckCircle, Cached,Clear,Description} from '@material-ui/icons'
import { Grid, Typography, Card, CardContent, CardActions, Button, TextField, Radio,RadioGroup, FormControlLabel } from '@material-ui/core';
const useStyles = makeStyles({
    root: {
        //minWidth: 275,
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
        marginTop: '10px',
        width: '60%'
    },
    icon:{
        marginTop:'10px',
        fontSize: '5em',
    },
    buttonIcon:{
        marginRight:'10px'
    },
    buttonGrid:{
        marginBottom:'10px'
    },
    text:{
        marginTop:'10px',
        textAlign:'center'
    },
    statusDone:{
        color:'green'
    },
    statusDisagree:{
        color:'red'
    },
    commentAgree:{
        backgroundColor:'#4791db'
    },
    commentDisagree:{
        backgroundColor:'#f44336'
    },
    textField:{
        width:'100%'
    },
    commentButton:{
        marginBottom:'10px'
    }
});

function LawComment(props){
    const classes = useStyles();
    const {text,side}=props
    const sideClass=side=='agree'?classes.commentAgree:classes.commentDisagree
    return (<Card className={[classes.root,sideClass]}>
    <CardContent>
        <Typography className={classes.title} gutterBottom>
            {side=='agree'?'찬성':'반대'} 의견
    </Typography>
   <Grid container justify='center'>
       {text}
       </Grid>
    </CardContent>
    <Grid container justify='center' className={classes.buttonGrid}>
        <Grid item xs={12}>
            <Grid container justify='center'>
            <Button><ThumbUpTwoTone className={classes.buttonIcon}/>좋아요 999</Button>
            </Grid>
        </Grid>
    </Grid>
</Card>)
}

function LawContent() {
    const [input, setInput] = useState("");
    const [radio, setRadio] = useState('')
    const handleRadio = (e) =>{
        setRadio(e.target.value)
    }
    const changeInput = (e) => {
        setInput(e.target.value.replace('\n',''));
    }
    const onSubmit=()=>{
        if(radio===''){
            alert('찬성 또는 반대를 선택해주십시오.')
            return
        }
        if(input.replace(/ /g,'')==''){
            alert('댓글 내용을 입력하십시오.')
            return
        }

        console.log(input,radio)
        setInput('')
    }
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            onSubmit();
        }
    }
    const classes = useStyles();
    const status='done'
    const statusToData={
        done:{
            class:classes.statusDone,
            text:'통과됨'
        },
        progress:{
            class:classes.statusProgress,
            text:'진행중'
        },
        disagree:{
            class:classes.statusDisagree,
            text:'부결됨'
        }
    }
    const bull = <span className={classes.bullet}>•</span>;
    
    return (
        <Grid container justify='center'>
            <Grid container className={classes.grid} spacing={4}>
                <Grid item xs={12}>
                    <Grid container justify='center'>
                        <Typography variant='h3'>ㅁㄴㅇㄹ에 관한 법률 일부개정법률안</Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography className={classes.title} >
                                발의자
                        </Typography>
                        <Grid container justify='center'><CreateTwoTone className={classes.icon}/></Grid>
                            <Typography variant="h5" className={classes.text}>
                                ㅇㅇㅇ 의원 외 00인
                        </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography className={classes.title} gutterBottom>
                                법안에 대한 의견 표시
                        </Typography>
                       <Grid container justify='center'><ThumbsUpDownTwoTone className={classes.icon}/></Grid>
                        </CardContent>
                        <Grid container justify='center' className={classes.buttonGrid}>
                            <Grid item xs={12} sm={6}>
                                <Grid container justify='center'>
                                <Button className={classes.statusDone}><ThumbUpTwoTone className={classes.buttonIcon}/>찬성 999</Button>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Grid container justify='center'>
                                <Button className={classes.statusDisagree}><ThumbDownTwoTone className={classes.buttonIcon}/>반대 999</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography className={classes.title} >
                                현재 상태
                        </Typography>
                        <Grid container justify='center' className={statusToData[status].class}>
                            {
                                (status==='done')
                                ?<CheckCircle className={classes.icon}/>
                                :(
                                    status==='disagree'
                                    ?<Clear className={classes.icon}/>
                                    :<Cached className={classes.icon}/>
                                )
                            }
                        </Grid>
                            <Typography variant="h5" className={[classes.text,statusToData[status].class]}>
                                {statusToData[status].text}
                        </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography className={classes.title} gutterBottom>
                                법안 정보
                        </Typography>
                            <Typography variant="h5" component="h2">
                            나라의 말이
                            중국과 달라
                            한문·한자와 서로 통하지 아니하므로
                            이런 까닭으로 어리석은 백성이 이르고자 하는 바가 있어도
                            끝내 제 뜻을 능히 펴지 못하는 사람이 많다.
                            내가 이를 위해 불쌍히 여겨
                            새로 스물여덟 글자를 만드니
                            사람마다 하여금 쉬이 익혀 날마다 씀에 편안케 하고자 할 따름이다.
                        </Typography>
                        <Grid container justify='center'>
                            <Grid item xs={12}>
                                <Grid container justify='center'>
                                <Button><Description className={classes.buttonIcon}/>PDF 원문 보기</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card className={classes.root}>
                        
                        <CardContent>
                        <TextField
          id="outlined-multiline-static"
          label="의견 작성"
          multiline
          rows={4}
          variant="outlined"
          value={input}
          onChange={changeInput}
          className={classes.textField}
          onKeyDown={handleKeyDown}
        />
        </CardContent>
                        <Grid container justify='center' className={classes.commentButton}>
                            
                        <Grid item xs={12} sm={6} >
                                <RadioGroup aria-label="gender" name="gender1" value={radio} onChange={handleRadio}>
                                    <Grid container justify='center'>
                                        <Grid item xs={12} sm={6}>
                                            <Grid container justify='center'>
                                            <FormControlLabel value="agree" control={<Radio />} label="찬성" />
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                        <Grid container justify='center'>
                                        <FormControlLabel value="disagree" control={<Radio />} label="반대" />
                                        </Grid>
                                        </Grid>
                                    </Grid>
                                    </RadioGroup>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Grid container justify='center'>
                                <Button onClick={onSubmit}><CreateTwoTone className={classes.buttonIcon}/>의견 작성</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}><LawComment side='agree' text='
                        정말 좋은 법안이네요.
                        '/></Grid>
                        <Grid item xs={12}><LawComment side='agree' text='
                        나라의 말이
                        중국과 달라
                        한문·한자와 서로 통하지 아니하므로
                        이런 까닭으로 어리석은 백성이 이르고자 하는 바가 있어도
                        끝내 제 뜻을 능히 펴지 못하는 사람이 많다.
                        내가 이를 위해 불쌍히 여겨
                        새로 스물여덟 글자를 만드니
                        사람마다 하여금 쉬이 익혀 날마다 씀에 편안케 하고자 할 따름이다.
                        '/></Grid>
                        <Grid item xs={12}><LawComment side='agree' text='
                        정말 좋은 법안이네요.
                        '/></Grid>
                        <Grid item xs={12}><LawComment side='agree' text='
                        정말 좋은 법안이네요.
                        '/></Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}><LawComment side='disagree' text='
                        정말 좋은 법안이네요.
                        '/></Grid>
                        <Grid item xs={12}><LawComment side='disagree' text='
                        정말 좋은 법안이네요.
                        '/></Grid>
                    </Grid>
                </Grid>
            </Grid>

        </Grid>
    );
}

export default LawContent
