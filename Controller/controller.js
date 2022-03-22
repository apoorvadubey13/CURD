const { sql,poolPromise } = require('../database/db')
const fs = require('fs');
var rawdata = fs.readFileSync('./query/queries.json');
var queries = JSON.parse(rawdata);

class MainController {

    async getAllData(req , res){
      try {
        const pool = await poolPromise
          const result = await pool.request()
          .query(queries.getAllData)
          res.json(result.recordset)
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async addNewData(req , res){
      try {
        if(req.body.first_name != null && req.body.last_name != null && req.body.id != null) {
          const pool = await poolPromise
          const result = await pool.request()
          .input('id',sql.Int , req.body.id)
          .input('first_name',sql.VarChar , req.body.first_name)
          .input('last_name',sql.VarChar,req.body.last_name)
          .query(queries.addNewUser)
          res.json(result)
        } else {
          res.send('Please fill all the details!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
    }
    }
    async updateData(req , res){
      try {
        if(req.body.id != null && req.body.first_name != null && req.body.last_name !=null) {
        const pool = await poolPromise
          const result = await pool.request()
          
          .input('first_name',sql.VarChar,req.body.first_name)
          .input('last_name',sql.VarChar,req.body.last_name)
          .query(queries.updateUserDetails)
          res.json(result)
        } else {
          res.send('All fields are required!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async deleteData(req , res){
      try {
        if(req.body.id != null ) {
          const pool = await poolPromise
            const result = await pool.request()
            .input('id',sql.VarChar,req.body.id)
            .query(queries.deleteUser)
            res.json(result)
          } else {
            res.send('Please fill all the details!')
          }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
}

const controller = new MainController()
module.exports = controller;