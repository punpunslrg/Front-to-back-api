import express from "express";
import morgan from "morgan";
import cors from "cors"
import userRouter from "./routes/userRoute.js"
import authRouter from "./routes/authRoute.js"

const app = express();
const PORT = 8000;

// Basic middlewares
app.use(cors()) // Allow cross domain
app.use(morgan('dev')) // Show log
app.use(express.json()) // for read body

// Routing GET, POST, PUT, PATCH, DELETE
// http://localhost:8000

// app.get("/", (req, res) => {
//   // code body
//   res.json({ message: "Hello CC20"})
// })

app.use('/api', userRouter)
app.use('/auth', authRouter)

// Error Handling
app.use((err, req, res, next) => {
  res.status(err.code || 500).json({ message: err.message || "Something Wrong !!" })
})

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
