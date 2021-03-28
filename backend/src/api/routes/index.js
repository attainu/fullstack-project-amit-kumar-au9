const indexRouter = require('express').Router();
const authChecker = require('../auth/isAuth');

const userAuthRouter = require('./authRouter');
const postRouter = require('./postRouter');
const imageRouter = require('./imageRouter');
const likeRouter = require('./likesRouter');
const commentRouter = require('./commentsRouter');
const ratingRouter = require('./ratingsRouter');
const artistProfileRouter = require('./artistProfileRouter');
const homePageRouter = require('./homePageRouter');
const explorePageRouter = require('./explorePageRouter');
const followerRouter = require('./followerRouter');
const saveRouter = require('./saveRouter');
const settingRouter = require('./settingRouter');
const occasionRouter = require('./occasionRouter');

indexRouter.use('/auth', userAuthRouter);
indexRouter.use('/post', authChecker, postRouter);
indexRouter.use('/image', authChecker, imageRouter);
indexRouter.use('/like', authChecker, likeRouter);
indexRouter.use('/comment', authChecker, commentRouter);
indexRouter.use('/rating', authChecker, ratingRouter);
indexRouter.use('/artist', authChecker, artistProfileRouter);
indexRouter.use('/home', authChecker, homePageRouter);
indexRouter.use('/explore', authChecker, explorePageRouter);
indexRouter.use('/follower', authChecker, followerRouter);
indexRouter.use('/save', authChecker, saveRouter);
indexRouter.use('/setting', authChecker, settingRouter);
indexRouter.use('/data/occasion', occasionRouter);

module.exports = indexRouter;
