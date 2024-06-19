import dotenv from "dotenv";
import connectDB from "./models/index.js";
import express from "express";
import coachRoute from "./routes/coachRoute.js";
import athleteRoute from "./routes/athleteRoute.js";
import sportcontroller from "./controllers/sport.controller.js";
import path from "path";
import { fileURLToPath } from "url";
import contactUs from "./routes/contactUs.js";
import staticContent from "./routes/staticContent.js";
import membership from "./routes/membership.js";
import cors from "cors";
import teamRoute from "./routes/teamRoute.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: "http://localhost:5000", // Allow only this origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Enable cookies and HTTP authentication
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

connectDB();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/coach", coachRoute);
app.use("/athlete", athleteRoute);
app.use("/sports", sportcontroller);
app.use("/contactus", contactUs);
app.use("/membership", membership);
app.use("/staticcontent", staticContent);
app.use("/team", teamRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
