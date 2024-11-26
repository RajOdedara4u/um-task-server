import e from "express";
const app = e();
import Userrouter from "./router/user-router.js";
import mongoCD from "./utils/db.js";
import { config } from "dotenv";
import errorMiddleware from "./middlewares/error-middleware.js";
import cors from "cors";
const coreOptions = {
  origin: "http://localhost:5173",
  methoda: "GET , POST , PUT , DELATE , PATCH , HEAD ",
  Credential: true,
};

app.use(cors(coreOptions));
config();
app.use(e.json());
app.use("/api", Userrouter);
app.use(errorMiddleware);

mongoCD().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("Server Is running On Port", process.env.PORT);
  });
});
