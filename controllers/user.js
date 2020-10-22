const db = require('../models')
const User = db.User
const Type = db.Type
const Dish = db.Dish
const userController = {
  login: (req, res) => {
    res.render('login')
  },
  index: (req, res) => {
    res.render('index')
  },
  logout: (req, res) => {
    req.session.username = null
    res.redirect('/login')
  },
  handleLogin: (req, res, next) => {
    const {
      username,
      password
    } = req.body
    if (!username || !password) {
      req.flash('errorMessage', '請填好，填滿！！')
      return next()
    }
    User.findOne({
      where:{
        username,
        password
      }
    }).then((user)=>{
      if (!user) {
        req.flash('errorMessage', '帳號/密碼錯誤喔！')
        return next()
      }
      req.session.username = user.username
      req.session.UserId = user.id
      res.render('admin')
    }).catch(err=>{
      req.flash('errorMessage', err.toString())
      return next()
    })
  },
  admin: (req, res) => {
    // const {username} = req.session
    // if(!username){
    //   req.flash('errorMessage', '請先登入。')
    //   return res.render('login')
    // }
    Type.findAll({
      include: Dish,
      where:{
        delete: null
      }
    }).then(categories => {
      console.log(categories)
      res.render('admin',{
        categories
      })
    })
  },
  admin: (req, res) => {
    Type.findAll({
      raw: true,
      where:{
        delete: null
      }
    }).then( categories =>{
      Dish.findAll({
        raw: true,
        where:{
          delete: null
        }
      }).then( dishes =>{
        User.findAll({
          raw: true,
        }).then( users =>{
          // console.log(dishes)
          // console.log(categories)
        res.render('admin',{
          categories,
          dishes
        })
        })
      })
    })
  }
}

module.exports = userController