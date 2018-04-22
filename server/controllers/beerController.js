'use strict';
const env = process.env.NODE_ENV || 'test';
const config = require('../../knexfile')[env];
const knex = require('knex')(config);

const index = async (ctx) => {
  try {
    const beers = await knex('beer').select();
    ctx.body = {
      data: beers,
    };
  } catch (error) {
    console.error(error);
  }
};

const get = async (ctx) => {
  // try{
  const {id} = ctx.params;
  const beer = await knex('beer').select().where({id});

  if (!beer.length) {
    ctx.status = 404;
    ctx.body = {
      data: beer,
    };
  } else {
    ctx.body = {
      data: beer,
    };
  }


  // }catch (error){
  //     ctx.status = 404;
  //     ctx.body = {
  //         data: beers,
  //     };
  //     console.error(error);
  // }
};

module.exports = {index, get};
