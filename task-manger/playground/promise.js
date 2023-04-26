require("../src/db/monogoose");
const User = require("../src/model/user");



const doWork = async (id, age) => {
    const user = await User.find({id})

    console.log(user[0])

}

doWork('6332a437ff1dee91347be322',22)