const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

dotenv.config({ path: './configuration/config.env' })
require('./db/mongoose')

//ROUTAS
const userRouter = require('./routers/userRoutes')
const formadorRouter = require('./routers/formadorRoutes')
const moduloRouter = require('./routers/moduloRoutes')
const estudanteRouter = require('./routers/estudanteRoutes')
const evidenciaRouter = require('./routers/evidenciaRoutes')
const repoRouter = require('./routers/repoRoutes')
//*ROUTAS

const app = express()

app.use(cors());
app.use(express.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

//PUBLIC SETUP
app.use(express.static(path.join(__dirname, './public')))
app.set("views", path.join(__dirname, "./public"))
app.set("view engine", "html")
//*PUBLIC SETUP

app.use(helmet())
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(cookieParser())
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  next()
})

app.use('/api/user', userRouter)
app.use('/api/formador', formadorRouter)
app.use('/api/modulo', moduloRouter)
app.use('/api/estudante', estudanteRouter)
app.use('/api/evidencia', evidenciaRouter)
app.use('/api/repositorio', repoRouter)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
})