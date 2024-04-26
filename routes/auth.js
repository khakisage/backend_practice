const express = require('express');
const logger = require('../lib/logger');

const router = express.Router();
const userService = require('../services/userService');
