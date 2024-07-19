import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import PostRoute from "./routes/post.route.js";
import AuthRoute from "./routes/auth.route.js";
import TestRoute from "./routes/test.route.js";
import UserRoute from "./routes/user.route.js";
import ChatRoute from "./routes/chat.route.js";
import MessageRoute from "./routes/message.route.js";


const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/posts", PostRoute);

app.use("/api/auth", AuthRoute);

app.use("/api/test", TestRoute);

app.use("/api/users", UserRoute);

app.use("/api/chats", ChatRoute);

app.use("/api/messages", MessageRoute);

app.listen(8800, () => {
  console.log("server is running");
});
