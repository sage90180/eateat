const db = require('../models')
const { User, Type, Dish, Booking, Coupon, Faq } = db
const userController = {
  login: (req, res) => {
    res.render('login')
  },
  logout: (req, res) => {
    req.session.username = null
    res.redirect('/login')
  },
  handleLogin: async (req, res, next) => {
    try {
      const {
        username,
        password
      } = req.body
      if (!username || !password) {
        req.flash('errorMessage', '請填好，填滿！！')
        return next()
      }
      const user = await User.findOne({
        where: {
          username,
          password
        }
      })
      if (!user) {
        req.flash('errorMessage', '帳號/密碼錯誤喔！')
        return next()
      }
      req.session.username = user.username
      return res.redirect('/admin')
    } catch (err) {
      req.flash('errorMessage', err.toString())
      return next()
    }
  },
  index: async (req, res, next) => {
    try {
      const types = await Type.findAll({
        raw: true,
        where: {
          delete: null
        }
      })
      const dishes = await Dish.findAll({
        raw: true,
        where: {
          delete: null
        }
      })
      const coupons = await Coupon.findAll({
        raw: true,
        where: {
          delete: null
        }
      })
      const bookings = await Booking.findAll({
        raw: true,
        where: {
          delete: null
        }
      })
      const faqs = await Faq.findAll({
        raw: true,
        where: {
          delete: null
        },
        order: ['order']
      })
      return res.render('index', {
        types,
        dishes,
        coupons,
        bookings,
        faqs
      })
      
    } catch (err) {
      req.flash('errorMessage', err.toString())
      return next()
    }
  },
  admin: async (req, res, next) => {
    try {
      const {username} = req.session
      if(!username){
        req.flash('errorMessage', '請先登入。')
        return res.render('login')
      }
      const types = await Type.findAll({
        raw: true,
        where: {
          delete: null
        }
      })
      const dishes = await Dish.findAll({
        raw: true,
        where: {
          delete: null
        }
      })
      const coupons = await Coupon.findAll({
        raw: true,
        where: {
          delete: null
        }
      })
      const bookings = await Booking.findAll({
        raw: true,
        where: {
          delete: null
        },
      })
      const faqs = await Faq.findAll({
        where: {
          delete: null
        },
        order: ['order']
      })
      return res.render('admin', {
        types,
        dishes,
        coupons,
        bookings,
        faqs
      })
    } catch (err) {
      req.flash('errorMessage', err.toString())
      return next()
    }
  }
}

module.exports = userController