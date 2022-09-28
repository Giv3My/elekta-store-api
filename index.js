require('dotenv').config();
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const nocache = require('nocache');
const connectDB = require('./db');
const seeding = require('./db/seeds');

const apiRouter = require('./routes/api');
const authRouter = require('./routes/auth');

const {
  imgGoodsBig,
  imgGoodsPreview,
  imgBlogs,
  imgPromotions,
} = require('./utils/imgPaths');

const store = new MongoDBStore({
  uri: process.env.DB_URL,
  collection: 'sessions',
});

const app = express();

app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin'],
    exposedHeaders: ['Authorization'],
    credentials: true,
  })
);

const sessionCookieOptions = {
  httpOnly: false,
  secure: process.env.NODE_ENV !== 'dev' ? true : null,
  sameSite: process.env.NODE_ENV !== 'dev' ? 'none' : null,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    name: 'session',
    proxy: true,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: sessionCookieOptions,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(nocache());

app.use('/api', apiRouter);
app.use('/auth', authRouter);

app.use(
  '/goods/images/big',
  imgGoodsBig.map((imgPath) =>
    express.static(path.join(__dirname, `public/static/assets/img/${imgPath}`))
  )
);
app.use(
  '/goods/images/preview',
  imgGoodsPreview.map((imgPath) =>
    express.static(path.join(__dirname, `public/static/assets/img/${imgPath}`))
  )
);
app.use(
  '/promotions/images',
  imgPromotions.map((imgPath) =>
    express.static(path.join(__dirname, `public/static/assets/img/${imgPath}`))
  )
);
app.use(
  '/blogs/images',
  imgBlogs.map((imgPath) =>
    express.static(path.join(__dirname, `public/static/assets/img/${imgPath}`))
  )
);

const start = async () => {
  try {
    await connectDB();
    await seeding();

    app.listen(PORT, () => console.log(`Server has been started on PORT: ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
