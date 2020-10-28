const db = require('../models')
const Faq = db.Faq
const faqController = {
  handleAdd: async (req, res, next) => {
    try {
      const {question, answer, order} = req.body
      if(!question || !answer){
        req.flash('errorMessage', '請填好，填滿！！')
        return next()
      }
      await Faq.create({
        question,
        answer,
        order
      })
      req.flash('errorMessage', '新增成功！')
      return res.redirect('/admin/#faq')
    } catch (err) {
      req.flash('errorMessage', err.toString())
      return next()
    }
  },
  updateFaq: async (req, res, next) => {
    try {
      const {question, answer, order} = req.body
      if(!question || !answer){
        req.flash('errorMessage', '請填好，填滿！！')
        return next()
      }
      const faqs = await Faq.findOne({
        where: {
          id: req.params.id
        }
      })
      await faqs.update({
        question,
        answer,
        order
      })
      req.flash('errorMessage', '修改成功！')
      return res.redirect('/admin')
    } catch(err) {
      req.flash('errorMessage', err.toString())
      return next()
    }
  },
  deleteFaq: async (req, res, next) => {
    const {username} = req.session
    if(!username){
      req.flash('errorMessage', '請先登入。')
      return res.render('login')
    }
    try {
      const faqs = await Faq.findOne({
        where: {
          id: req.params.id
        }
      })
      await faqs.update({
        delete: '1'
      })
      req.flash('errorMessage', '刪除成功！')
      return res.redirect('/admin')
    } catch(err) {
      req.flash('errorMessage', err.toString())
      return next()
    }
  },
}

module.exports = faqController