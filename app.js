const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const app = express()
const routes = require('./routes')
const session = require('express-session')
const usePassport = ('./config/passport')
require('./config/mongoose')

const PORT = process.env.PORT || 3000

app.engine('handlebars', exphbs({
  defaultLayout: 'main', helpers: {
    isEqual: function (arg1, arg2) {
      return arg1 === arg2
    }
  }
}
))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
usePassport(app)

app.use(routes)

app.listen(PORT, () => {
  console.log(`The server is running in http://localhost:${PORT}`)
})