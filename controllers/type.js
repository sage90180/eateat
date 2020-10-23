const db = require('../models')
const Type = db.Type
const typeController = {
  handleAdd: async (req, res, next) => {
    try {
      const {type} = req.body
      const {icon} = req.body
      if(!type || !icon){
        req.flash('errorMessage', '請填好，填滿！！')
        return next()
      }
      const types = await Type.create({
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
      const {type} = req.body
      const {icon} = req.body
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
    } catch {
      req.flash('errorMessage', err.toString())
      return next()
    }
  },
  deleteType: async (req, res, next) => {
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
    } catch {
      req.flash('errorMessage', err.toString())
      return next()
    }
  },
}

module.exports = typeController