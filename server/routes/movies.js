require('dotenv').config();

const express = require('express');
const axios = require('axios');
const router = express.Router();

// Getting popular movies
router.get('/popular', (req, res) => {
  axios({
    method: 'GET',
    url: 'https://api.themoviedb.org/3/discover/movie',
    params: {
      sort_by: 'popularity.desc',
      api_key: process.env.API_KEY
    }
  })
  .then((response) => {
    res.send(response.data)
  })
  .catch((error) => {
    res.status(error.response.status).end();
  })
})

// Searching for a movie
router.get('/search/:query', (req, res) => {
  axios({
    method: 'GET',
    url: 'https://api.themoviedb.org/3/search/movie',
    params: {
      api_key: process.env.API_KEY,
      query: req.params.query
    }
  })
  .then((response) => {
    res.send(response.data)
  })
  .catch((error) => {
    res.status(error.response.status).end();
  })
})

// Getting details of a single movie with requests to multiple endpoints
router.get('/:id', (req, res) => {
  axios.all([
    axios({
      method: 'GET',
      url: `https://api.themoviedb.org/3/movie/${req.params.id}`,
      params: {
        api_key: process.env.API_KEY,
      }
    }),
    axios({
      method: 'GET',
      url: `https://api.themoviedb.org/3/movie/${req.params.id}/credits`,
      params: {
        api_key: process.env.API_KEY,
      }
    }),
    axios({
      method: 'GET',
      url: `https://api.themoviedb.org/3/movie/${req.params.id}/similar`,
      params: {
        api_key: process.env.API_KEY,
      }
    })
  ])
  .then(axios.spread((...responses) => {
    const responsesData = responses.map((res)=>res.data);
    const combinedResponse = Object.assign({}, ...responsesData);
    res.send(combinedResponse);
  }))
  .catch((error) => {
    res.status(error.response.status).end();
  })
})

module.exports = router;