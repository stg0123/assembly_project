import React,{useState,useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {ThumbDownTwoTone, ThumbUpTwoTone, ThumbsUpDownTwoTone, CreateTwoTone, CheckCircle, Cached,Clear,Description} from '@material-ui/icons'
import { Grid, Typography, Card, CardContent, CardActions, Button, TextField, Radio,RadioGroup, FormControlLabel } from '@material-ui/core';
import {useParams} from 'react-router-dom'
import axios from 'axios'

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
    const {text,side,likes,id}=props
    const sideClass=side=='agree'?classes.commentAgree:classes.commentDisagree
    return (<Card className={[classes.root,sideClass]}>
    <CardContent>
        <Typography className={classes.title} gutterBottom>
            <b>{side=='agree'?'찬성':'반대'} 의견</b>
    </Typography>
   <Grid container justify='center'>
       {text}
       </Grid>
    </CardContent>
    <Grid container justify='center' className={classes.buttonGrid}>
        <Grid item xs={12}>
            <Grid container justify='center'>
            <Button><ThumbUpTwoTone className={classes.buttonIcon}/>좋아요 {likes}</Button>
            </Grid>
        </Grid>
    </Grid>
</Card>)
}
const getData=async (lawId) =>{
    let {data}=await axios.get(`/law_detail/${lawId}`)
    return data
}
function LawContent(props) {
    const [input, setInput] = useState("");
    const [radio, setRadio] = useState('')
    const [data, setData] = useState({
        name:'',
        maker:'',
        likes:0,
        dislikes:0,
        status:'progress',
        content:'',
        pdf:null,
        likeComment:[],
        dislikeComment:[]
    })
    const { lawId } = useParams();
    useEffect(async ()=>{
        let {detail,like_comments,dislikes_comments} = await getData(lawId)
        setData({
            name:detail.bill_name,
            maker:`${detail.main_lawmaker} ${detail.proposal_kind}` + (detail.sum_lawmaker > 1 ? ` 외 ${detail.sum_lawmaker - 1}인` : ''),
            likes:detail.law_like,
            dislikes:detail.law_dislike,
            status:(detail.law_pass=='y')?'done':'progress',
            content:detail.law_summary,
            pdf:detail.law_pdf,
            likeComment:like_comments,
            dislikeComment:dislikes_comments
        })
    },[lawId])

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
    const goPDF=()=>{
        if(data.pdf===null) alert('PDF 원문이 없습니다.')
        else window.location.href=data.pdf
    }
    const lawLikeDislike=async (type)=>{
        if(!props.user.isLogin){
            alert('로그인이 필요합니다.')
            return
        }
        const res=await axios.post('/like_law',{
            username:props.user.userID,
            like_dislike:type,
            law_id:lawId
        })
        console.log(res.data)
        const {success}=res.data
        if(success){
            if(type==='like') setData({
                ...data,
                likes:data.likes+1
            })
            else setData({
                ...data,
                dislikes:data.dislikes+1
            })
        }else{
            alert('이미 클릭하셨습니다.')
        }
    }
    const clickLike=()=>{lawLikeDislike('like')}
    const clickDislike=()=>{lawLikeDislike('dislike')}
    
    return (
        <Grid container justify='center'>
            <Grid container className={classes.grid} spacing={4}>
                <Grid item xs={12}>
                    <Grid container justify='center'>
                        <Typography variant='h3'><b>{data.name}</b></Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography className={classes.title} >
                                <b>발의자</b>
                        </Typography>
                        <Grid container justify='center'><CreateTwoTone className={classes.icon}/></Grid>
                            <Typography variant="h5" className={classes.text}>
                                <b>{data.maker}</b>
                        </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography className={classes.title} gutterBottom>
                                <b>법안에 대한 의견 표시</b>
                        </Typography>
                       <Grid container justify='center'><ThumbsUpDownTwoTone className={classes.icon}/></Grid>
                        </CardContent>
                        <Grid container justify='center' className={classes.buttonGrid}>
                            <Grid item xs={12} sm={6}>
                                <Grid container justify='center'>
                                <Button className={classes.statusDone} onClick={clickLike}><ThumbUpTwoTone className={classes.buttonIcon}/>찬성 {data.likes}</Button>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Grid container justify='center'>
                                <Button className={classes.statusDisagree} onClick={clickDislike}><ThumbDownTwoTone className={classes.buttonIcon}/>반대 {data.dislikes}</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography className={classes.title} >
                                <b>현재 상태</b>
                        </Typography>
                        <Grid container justify='center' className={statusToData[data.status].class}>
                            {
                                (data.status==='done')
                                ?<CheckCircle className={classes.icon}/>
                                :(
                                    data.status==='disagree'
                                    ?<Clear className={classes.icon}/>
                                    :<Cached className={classes.icon}/>
                                )
                            }
                        </Grid>
                            <Typography variant="h5" className={[classes.text,statusToData[data.status].class]}>
                                <b>{statusToData[data.status].text}</b>
                        </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography className={classes.title} gutterBottom>
                                <b>법안 정보</b>
                        </Typography>
                            <Typography variant="h5" component="h2">
                            {data.content}
                        </Typography>
                        <Grid container justify='center'>
                            <Grid item xs={12}>
                                <Grid container justify='center'>
                                <Button onClick={goPDF}><Description className={classes.buttonIcon}/>PDF 원문 보기</Button>
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
                        {
                            data.likeComment.map((comment)=>{
                                return (
                                    <Grid item xs={12}><LawComment side='agree' text={comment.comment} likes={comment.comment_like} id={comment.comment_id}/></Grid>
                                )
                            })
                        }
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Grid container spacing={2}>
                    {
                            data.dislikeComment.map((comment)=>{
                                return (
                                    <Grid item xs={12}><LawComment side='disagree' text={comment.comment} likes={comment.comment_like} id={comment.comment_id}/></Grid>
                                )
                            })
                        }
                    </Grid>
                </Grid>
            </Grid>

        </Grid>
    );
}

export default LawContent
