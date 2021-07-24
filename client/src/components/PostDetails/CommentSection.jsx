import React , {useState, useEffect} from 'react';
import {Paper, Typography, CircularProgress, Divider, Button, TextField} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import {useParams, useHistory} from 'react-router-dom'
import {commentPost} from '../../actions/posts'
import useStyles from './styles'    

const CommentSection= ({post}) =>{
    const [comments, setComments] = useState(post?.comments)
    const [comment, setComment] = useState('')
    const classes = useStyles()
    const user= JSON.parse(localStorage.getItem('profile'))
    const dispatch = useDispatch();
    const handleClick= () =>{
        const finalComment= `${user.result.name}: ${comment}`
        console.log(finalComment);
        dispatch(commentPost(finalComment, post._id))
    }
    return (
        <div>
            <div >
                <div >
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    {comments.map((c, i) => (
                        <Typography key={i} gutterBottom variant="subtitle1">
                            {c}
                        </Typography>
                    ))}
                </div>
                {user?.result?.name && 
                (<div styles={{width: "70%"}}>
                    <Typography gutterBottom variant="h6">Write a Comment</Typography>
                    <TextField 
                        fullWidth 
                        rows={4} 
                        variant="outlined" 
                        label="Comment" 
                        multiline 
                        value={comment}
                        onChange={(e)=> setComment(e.target.value)}
                        />
                    <Button style={{ margin: '10px'}} 
                            color="primary" 
                            fullWidth 
                            variant="contained" 
                            onClick={handleClick}>
                        Comment
                    </Button>
                </div>)}
            </div>  
        </div>
    )
}

export default CommentSection;

// CommentSection TO POSTS.JS IN ../../actions/posts
//                   TO INDEX.JS IN ../api/index.js
//            (BACKEND)TO POSTS.JS IN ROUTES/POSTS.JS 
//                     TO POSTS.JS IN ../controllers/posts.js
//                 BACK TO POSTS.JS IN ../../actions/posts
//                     TO POSTS.JS  IN  reducers/posts.js
// 
