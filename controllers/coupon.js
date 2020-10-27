const db = require('../models')
const Coupon = db.Coupon
const couponController = {
  handleAdd: async (req, res, next) => {
    try {
      const {img, name, content, price, expire} = req.body
      if(!img || !name || !content || !price || !expire){
        req.flash('errorMessage', '請填好，填滿！！')
        return next()
      }
      await Coupon.create({
        img,
        name,
        content,
        price,
        expire
      })
      req.flash('errorMessage', '新增成功！')
      return res.redirect('/admin')
    } catch (err) {
      req.flash('errorMessage', err.toString())
      return next()
    }
  },
  updateCoupon: async (req, res, next) => {
    try {
      const {img, name, content, price, expire} = req.body
      if(!img || !name || !content || !price || !expire){
        req.flash('errorMessage', '請填好，填滿！！')
        return next()
      }
      const coupons = await Coupon.findOne({
        where: {
          id: req.params.id
        }
      })
      await coupons.update({
        img,
        name,
        content,
        price,
        expire
      })
      req.flash('errorMessage', '修改成功！')
      return res.redirect('/admin')
    } catch (err) {
      req.flash('errorMessage', err.toString())
      return next()
    }
  },
  deleteCoupon: async (req, res, next) => {
    const {username} = req.session
    if(!username){
      req.flash('errorMessage', '請先登入。')
      return res.render('login')
    }
    try {
      const coupons = await Coupon.findOne({
        where: {
          id: req.params.id
        }
      })
      await coupons.update({
        delete: '1'
      })
      req.flash('errorMessage', '刪除成功！')
      return res.redirect('/admin')
    } catch (err) {
      req.flash('errorMessage', err.toString())
      return next()
    }
  },
}

module.exports = couponController