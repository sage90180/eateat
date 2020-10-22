const db = require('../models')
// const User = db.User
// const Type = db.Type
const Dish = db.Dish
const dishController = {
  handleAdd: (req, res, next) => {
    const {TypeId} = req.body
    const {name} = req.body
    const {price} = req.body
    if(!TypeId || !name || !price ){
      req.flash('errorMessage', '請填好，填滿！！')
      return next()
    }
    Dish.create({
      TypeId,
      name,
      price,
    }).then(()=>{
      req.flash('errorMessage', '新增成功！')
      return res.redirect('/admin')
    }).catch(err=>{
      req.flash('errorMessage', err.toString())
      return next()
    })
  },
  update_dish: (req, res, next) => {
    const {name} = req.body
    const {price} = req.body
    if(!name || !price){
      req.flash('errorMessage', '請填好，填滿！！')
      return next()
    }
    Prize.findOne({
      where:{
        id: req.params.id,
      }
    }).then(dishes => {
      return dishes.update({
        name,
        price,
      })
    }).then(() => {
      return next()
    }).catch(err=>{
      req.flash('errorMessage', err.toString())
      return next()
    })
  }
}

module.exports = dishController