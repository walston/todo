var dotenv = require('dotenv').config();
console.log(process.env.DATABASE_URL);
var pg = require('pg');
var url = process.env.DATABASE_URL;

module.exports = {
  user: {
    create: userCreate,
    read: userRead,
    update: userUpdate,
    delete: userDelete
  },
  item: {
    create: itemCreate,
    read: itemRead,
    update: itemUpdate,
    delete: itemDelete
  }
};

function userCreate () {

}

function userRead () {

}

function userUpdate () {

}

function userDelete () {

}

function itemCreate () {

}

function itemRead () {

}

function itemUpdate () {

}

function itemDelete () {

}
