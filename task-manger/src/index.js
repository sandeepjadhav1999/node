const express = require("express");
require("./db/monogoose");
const userRouter = require('./rotues/userRoutes')
const taskRouter = require('./rotues/taskRoutes')

const app = express();
const port = 3000;


app.use(express.json());
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
  console.log(`*********** server is running on port ${port} ****************`);
});

