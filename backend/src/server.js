import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";

import connectDB
from "./config/db.js";

import {
  initSocket
} from "./socket/socket.js";

const PORT =
  process.env.PORT || 5000;


// DB
connectDB();


// SERVER
const server =
  app.listen(PORT, () => {

    console.log(
      `Server running on ${PORT}`
    );

  });


// SOCKET INIT
initSocket(server);