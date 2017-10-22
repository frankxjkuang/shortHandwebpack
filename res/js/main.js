import React from 'react';
import {render} from 'react-dom';
import Hello from '../conponents/Hello';

import '../css/main.scss';

const imgUrl = require('../images/hi.jpg');
const img = document.createElement('img')
img.src = imgUrl;
document.body.appendChild(img);

render(<Hello />, document.getElementById('ele'));