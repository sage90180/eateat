const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const app = express()
const port = process.env.PORT || 5001

const userController = require('./controllers/user')
const dishController = require('./controllers/dish')
const typeController = require('./controllers/type')

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))

app.set('view engine', 'ejs')
app.use('/css', express.static('css'))
app.use('/imgs', express.static('imgs'))
app.use('/js', express.static('js'))
// app.use(express.static('public'))
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

app.get('/', userController.index)
app.get('/login', userController.login)
app.post('/login', userController.handleLogin, redirectBack)
app.get('/logout', userController.logout)
app.get('/admin', userController.admin)

app.post('/add-type', typeController.handleAdd, redirectBack)
app.get('/delete-type/:id', typeController.delete_type, redirectBack)
app.post('/update-icon/:id', typeController.update_icon, redirectBack)
app.post('/update-type/:id', typeController.update_type, redirectBack)

app.post('/add-dish', dishController.handleAdd, redirectBack)
app.post('/update-dish/:id', dishController.update_dish, redirectBack)
app.get('/delete-dish/:id', dishController.delete_dish, redirectBack)
// app.get('/register', userController.register)
// app.post('/register', userController.handleRegister, redirectBack)

// app.get('/add', articleController.add)
// app.post('/add', articleController.handleAdd, redirectBack)
// app.get('/update/:id', articleController.update)
// app.post('/update/:id', articleController.handleUpdate, redirectBack)
// app.get('/article/:id', articleController.getArticle)
// app.get('/list', articleController.getList)
// app.get('/delete/:id', articleController.delete, redirectBack)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
