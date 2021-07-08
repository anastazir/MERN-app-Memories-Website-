import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { getPosts, getPostsBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Paginate from  '../Paginate';
import useStyles from './styles';

function useQuery(){
  // RETRUNS THE SEARCH QUERY
  return new URLSearchParams(useLocation().search)
}


const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const [search, setSearch] = useState('')
  const [tags, setTags] = useState([])
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const classes = useStyles();
  // GETS THE PAGE NUMBER
  const page= query.get('page') || 1;
  // console.log(page);
  // GETS THE PAGE SEARCH TERM
  const searchQuery= query.get('search')

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);



  const handleAddChip = (tag) => setTags([...tags, tag]);
 
  const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      history.push('/');
    }
  };

  const handleKeyPress=(e) => {
    if(e.keyCode === 13) {
      searchPost()
    }
  }

  return (
    <Grow in>
      <Container maxWidth='xl'>
        <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer} >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position= 'static' color='inherit'>
              <TextField 
              new= 'search' 
              label='search memories' 
              fullWidth value={search} 
              onKeyUp={handleKeyPress} 
              onChange={(e)=>{setSearch(e.target.value)}} 
              />
             <ChipInput 
              style={{ margin: '10px 0' }}
              value={tags}
              onAdd={(chip) => handleAddChip(chip)}
              onDelete={(chip) => handleDeleteChip(chip)}
              label="Search Tags"
             />
              <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper elevation={6}>
              <Paginate />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
