const app = require('./app')
const http = require('http')



const PORT = 3003
const server = http.createServer(app)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

