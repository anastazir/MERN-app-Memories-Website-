import React, { useEffect } from 'react'
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/posts';

import useStyles from './styles'

const Paginate = ({page}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        // PASSING THE CURRENT PAGE
        dispatch(getPosts(page));
    }, [page]);
    const classes = useStyles()
    return (
        <Pagination
        style = {{ marginLeft : 50 }}
            className={{ul: classes.ul}}
            count= {5}
            page={1}
            color='primary'
            renderItem={(item) =>(
                <PaginationItem {...item} component={Link} to={`/posts?page=${1}`}/>
            )}
        />
    )
}

export default Paginate