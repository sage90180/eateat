const db = require('../models')
const Type = db.Type
const typeController = {
  handleAdd: async (req, res, next) => {
    try {
      const {type, icon} = req.body
      if(!type || !icon){
        req.flash('errorMessage', '請填好，填滿！！')
        return next()
      }
      await Type.create({
        type,
        icon
      })
      req.flash('errorMessage', '新增成功！')
      return res.redirect('/admin')
    } catch (err) {
      req.flash('errorMessage', err.toString())
      return next()
    }
  },
  updateType: async (req, res, next) => {
    try {
      const {type, icon} = req.body
      if(!type || !icon){
        req.flash('errorMessage', '請填好，填滿！！')
        return next()
      }
      const types = await Type.findOne({
        where: {
          id: req.params.id
        }
      })
      await types.update({
        icon,
        type,
      })
      req.flash('errorMessage', '修改成功！')
      return res.redirect('/admin')
    } catch(err) {
      req.flash('errorMessage', err.toString())
      return next()
    }
  },
  deleteType: async (req, res, next) => {
    const {username} = req.session
    if(!username){
      req.flash('errorMessage', '請先登入。')
      return res.render('login')
    }
    try {
      const types = await Type.findOne({
        where: {
          id: req.params.id
        }
      })
      await types.update({
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

module.exports = typeController