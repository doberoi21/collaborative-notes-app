// import { io } from "../../server/";
import { io } from "socket.io-client";

export const socket = io("http://localhost:3001");