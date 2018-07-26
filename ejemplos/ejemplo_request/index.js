'use strict';

const axios = require('axios');

const url = 'https://swapi.co/api/planets/1/';

(async () => {

  const response = await axios.get(url);

  console.log(response.data);

})().catch(err => console.error(err));
