import React from 'react'
import {Pagination, PaginationItem} from '@material-ui/lab'
import {Link} from 'react-router-dom'

import styles from './styles'

export const Pagination = () => {
    const classes = useStyles
    return (
        <Pagination
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
