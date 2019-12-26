import express from 'express'

const app = express()

const PORT = 4000
app.listen(PORT, () => {
  console.log(`🚀Server running at port ${PORT}`)
})
