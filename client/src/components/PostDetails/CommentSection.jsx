import React , {useState, useEffect} from 'react';
import {Paper, Typography, CircularProgress, Divider, Button, TextField} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import {useParams, useHistory} from 'react-router-dom'

import useStyles from './styles'

const CommentSection= ({post}) =>{
    const [comments, setComments] = useState([1,2,3,4])
    const [comment, setComment] = useState('')
    const classes = useStyles()
    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    {comments.map((c, i) => (
                        <Typography key={i} gutterBottom variant="subtitle1">
                            Comment {i}
                        </Typography>
                    ))}
                </div>
                <div styles={{width: "70%"}}>
                    <Typography gutterBottom variant="h6">Write a Comment</Typography>
                    <TextField 
                        fullWidth 
                        rows={4} 
                        variant="outlined" 
                        label="Comment" 
                        multiline 
                        onChange={(e)=> setComment(e.target.value)}
                    />
                </div>
            </div>  
        </div>
    )
}

export default CommentSection;