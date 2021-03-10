import express, { Express } from "express"
import mongoose from "mongoose"
import cors from "cors"
import todoRoutes from "./routes"

const app: Express = express()

const PORT: string | number = process.env.PORT || 5000

app.use(cors())
app.use(todoRoutes)

const uri: string = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@db:27017/${process.env.MONGO_DB}?authSource=admin`
console.log(uri);
const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.set("useFindAndModify", false)

mongoose
  .connect(uri, options)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch(error => {
    throw error
  })
