import React, {useEffect} from 'react'
import {Paper, Typography, CircularProgress, Divider} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment';
import {useParams, useHistory} from 'react-router-dom'

import useStyles from './styles';
import {getPost, getPostsBySearch} from '../../actions/posts'
import Form from '../Form/Form';

const PostDetails = () => {
    const {post, posts, isLoading}= useSelector((state) => state.posts)
    console.log(posts);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const {id}= useParams();
    let recommendedPosts=[]

    useEffect(() => {
        dispatch(getPost(id))
    }, [id])

    // RECOMMENDED POSTS 
    useEffect(() => {
        if(post){
            dispatch(getPostsBySearch({search: 'none', tags: post?.tags.join(',')})) 
        }
    }, [post])


    if(!posts) return null;

    if(isLoading){
        return <Paper element={6} className={classes.loadingPaper}>
            <CircularProgress size= '7em'/>
        </Paper>
    }

    const openPost = (_id) => history.push(`/posts/${_id}`);

    if (posts){
        recommendedPosts= posts.filter(({_id})=>_id!==post._id) //DONT SHOW THE CURRENT POST IN RECOMMENED POSTS
        console.log(recommendedPosts);
    }

    return (
        <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
            <div className={classes.card}>
                <div className={classes.section}>
                <Typography variant="h3" component="h2">{post.title}</Typography>
                <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
                <Typography variant="h6">Created by: {post.name}</Typography>
                <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
                <Divider style={{ margin: '20px 0' }} />
                <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
                <Divider style={{ margin: '20px 0' }} />
                <Typography variant="body1"><strong>Comments - coming soon!</strong></Typography>
                <Divider style={{ margin: '20px 0' }} />
                </div>
                <div className={classes.imageSection}>
                <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
                </div>
                {/* <Form currentId={id}/> */}
            </div>
            {recommendedPosts?.map(({ title, name, message, likes, selectedFile, _id }) => (
              <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                <Typography gutterBottom variant="h6">{title}</Typography>
                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                 <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                <img src={selectedFile} width="200px" />
              </div>

            ))}
      </Paper>
    )
}

export default PostDetails
