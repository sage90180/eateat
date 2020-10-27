const db = require('../models')
const Dish = db.Dish
const dishController = {
  handleAdd: async (req, res, next) => {
    try {
      const {TypeId, name, price} = req.body
      if(!TypeId || !name || !price ){
        req.flash('errorMessage', '請填好，填滿！！')
        return next()
      }
      await Dish.create({
        TypeId,
        name,
        price,
      })
      req.flash('errorMessage', '新增成功！')
      return res.redirect('/admin')
    } catch (err) {
      req.flash('errorMessage', err.toString())
      return next()
    }
  },
  updateDish: async (req, res, next) => {
    try {
      const {name, price} = req.body
      if(!name || !price){
        req.flash('errorMessage', '請填好，填滿！！')
        return next()
      }
      const dishes = await Dish.findOne({
        where:{
          id: req.params.id,
        }
      })
      await dishes.update({
        name,
        price,
      })
      req.flash('errorMessage', '修改成功！')
      return res.redirect('/admin')
    } catch (err) {
      req.flash('errorMessage', err.toString())
      return next()
    }
  },
  deleteDish: async (req, res, next) => {
    const {username} = req.session
    if(!username){
      req.flash('errorMessage', '請先登入。')
      return res.render('login')
    }
    try {
      const dishes = await Dish.findOne({
        where:{
          id: req.params.id,
        }
      })
      await dishes.update({
        delete: '1'
      })
      req.flash('errorMessage', '刪除成功！')
      return res.redirect('/admin')
    } catch (err) {
      req.flash('errorMessage', err.toString())
      return next()
    }
  }
}

module.exports = dishController