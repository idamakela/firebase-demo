const PORT = 8000;
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotend').config();

const app = express();

app.listen(8000, () => console.log(`Server is running on port ${PORT}`));
