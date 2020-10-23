const db = require('../models')
const Type = db.Type
const typeController = {
  handleAdd: (req, res, next) => {
    const {type} = req.body
    const {icon} = req.body
    if(!type || !icon){
      req.flash('errorMessage', '請填好，填滿！！')
      return next()
    }
    Type.create({
      type,
      icon
    }).then(()=>{
      req.flash('errorMessage', '新增成功！')
      return res.redirect('/admin')
    }).catch(err=>{
      req.flash('errorMessage', err.toString())
      return next()
    })
  },
  update_icon: (req, res, next) => {
    const {icon} = req.body
    if(!icon){
      req.flash('errorMessage', '請填好，填滿！！')
      return next()
    }
    Type.findOne({
      where:{
        id: req.params.id,
      }
    }).then(types => {
      return types.update({
        icon,
      })
    }).then(() => {
      req.flash('errorMessage', '修改成功！')
      return res.redirect('/admin')
    }).catch(err=>{
      req.flash('errorMessage', err.toString())
      return next()
    })
  },
  update_type: (req, res, next) => {
    const {type} = req.body
    if(!type){
      req.flash('errorMessage', '請填好，填滿！！')
      return next()
    }
    Type.findOne({
      where:{
        id: req.params.id,
      }
    }).then(types => {
      return types.update({
        type,
      })
    }).then(() => {
      req.flash('errorMessage', '修改成功！')
      return res.redirect('/admin')
    }).catch(err=>{
      req.flash('errorMessage', err.toString())
      return next()
    })
  },
  delete_type: (req, res, next) => {
    Type.findOne({
      where:{
        id: req.params.id,
      }
    }).then( types =>{
      types.update({
        delete: '1'
      })
    }).then(()=>{
      req.flash('errorMessage', '刪除成功！')
      return res.redirect('/admin')
    }).catch(err=>{
      req.flash('errorMessage', err.toString())
      return next()
    })
  },
}

module.exports = typeController