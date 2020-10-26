const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const app = express()
const port = process.env.PORT || 5001

const userController = require('./controllers/user')
const dishController = require('./controllers/dish')
const typeController = require('./controllers/type')
const couponController = require('./controllers/coupon')
const bookingController = require('./controllers/booking')
const faqController = require('./controllers/faq')

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))

app.set('view engine', 'ejs')
app.use('/css', express.static('css'))
app.use('/imgs', express.static('imgs'))
app.use('/js', express.static('js'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(flash())
app.use((req, res, next) => {
  res.locals.username = req.session.username
  res.locals.errorMessage = req.flash('errorMessage')
  next()
})

function redirectBack(req, res) {
  res.redirect('back')
}

// 登入
app.get('/', userController.index)
app.get('/login', userController.login)
app.post('/login', userController.handleLogin, redirectBack)
app.get('/logout', userController.logout)
app.get('/admin', userController.admin)

// 菜單-類別
app.post('/add-type', typeController.handleAdd, redirectBack)
app.get('/delete-type/:id', typeController.deleteType, redirectBack)
app.post('/update-type/:id', typeController.updateType, redirectBack)
// 菜單-菜色
app.post('/add-dish', dishController.handleAdd, redirectBack)
app.get('/delete-dish/:id', dishController.deleteDish, redirectBack)
app.post('/update-dish/:id', dishController.updateDish, redirectBack)
// 優惠卷
app.post('/add-coupon', couponController.handleAdd, redirectBack)
app.get('/delete-coupon/:id', couponController.deleteCoupon, redirectBack)
app.post('/update-coupon/:id', couponController.updateCoupon, redirectBack)
// 預約
app.post('/booking', bookingController.handleBooking, redirectBack)
app.get('/delete-booking/:id', bookingController.deleteBooking, redirectBack)
// 預約
app.post('/add-faq', faqController.handleAdd, redirectBack)
app.get('/delete-faq/:id', faqController.deleteFaq, redirectBack)
app.post('/update-faq/:id', faqController.updateFaq, redirectBack)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})