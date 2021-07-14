const express = require('express');
const mongoose = require('mongoose');
const postRouter = require('./routes/postRoutes')
const userRouter = require('./routes/userRouter')
const app = express();
const { MONGO_USER, MONGO_PASSWORD, MONGO_PORT, MONGO_IP, REDIS_URL, REDIS_PORT, SESSION_SECRET } = require('./config/config')
const redis = require('redis')
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var cors = require('cors')
const date = require('date-and-time');
const now = new Date();
var nowtime = date.format(now, 'YYYY/MM/DD HH:mm:ss');
let redisClient = redis.createClient({
    host: REDIS_URL,
    port: REDIS_PORT
})

// mongoose.connect('mongodb://root:example@172.31.0.2:27017?authSource=admin', {  ///pass ip of the container or 
mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}?authSource=admin`, { //pass the docker service name {mongo} from docker compose
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => console.log('success connected to db')).catch((e) => console.log("ERROR CONNECT DB ", e));
app.enable("trust proxy") ///if you need to access the ip addresses coming from nginx
app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        proxy: true,
        cookie: {
            httpOnly: true,
            maxAge: 300000
        }
    })
)
app.use(express.json());
app.get("/api/v1", (req, res) => {
    console.log('working 123 new create  called!!!!');
    // res.send({ data: "items 123 new create " + nowtime })
    res.send({ data: "items 123 new create " })
})

// localhost:3000/api/v1/posts
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);
const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`listening on port ${port}`) })
