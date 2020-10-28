const db = require('../models')
const Booking = db.Booking
const bookingController = {
  handleBooking: async (req, res, next) => {
    try {
      const {name, phone, date, people, time, meal, content} = req.body
      if(!name || !phone || !people || !time || !meal || !content || !date){
        req.flash('errorMessage', '請填好，填滿！！')
        return res.redirect('/#booking')
      }
      await Booking.create({
        name,
        phone,
        date,
        people,
        time,
        meal,
        content
      })
      req.flash('errorMessage', '預約成功！')
      return res.redirect('/#booking')
    } catch (err) {
      req.flash('errorMessage', err.toString())
      return next()
    }
  },
  deleteBooking: async (req, res, next) => {
    const {username} = req.session
    if(!username){
      req.flash('errorMessage', '請先登入。')
      return res.render('login')
    }
    try {
      const bookings = await Booking.findOne({
        where: {
          id: req.params.id
        }
      })
      await bookings.update({
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
module.exports = bookingController