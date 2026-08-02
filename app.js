const express = require("express");
const cors = require("cors");
const dns = require("dns")
const connectDB = require("./config/db");
dns.setServers(['8.8.8.8', '1.1.1.1']);


const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/jobs");
const resumeRoutes = require("./routes/resume");
const matchRoutes = require("./routes/match");
const appRoutes = require("./routes/application");
connectDB();

const app = express();

app.use(cors());

app.use(express.json());

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://ai-job-match-fe.vercel.app/",
    ],
    credentials: true,
  })
);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "AI Job Match API Running"
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/match", matchRoutes);
app.use("/api/applications", appRoutes);
module.exports = app;