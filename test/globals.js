global.__basedir = process.cwd();
//const supertest = require('supertest');
//global.request = supertest(app); 
//global.chakram = chakram;

const chai = require('chai');
const request = require('request');
const mongoose = require('mongoose');
const _ = require('lodash');

const config = require('../config/test');
const App = require('../index').App;
global.expect = chai.expect;
global.assert = chai.assert;
global.should = chai.should();
global.mongoose = mongoose;
global._ = _;
global.request = request;
global.config = config;