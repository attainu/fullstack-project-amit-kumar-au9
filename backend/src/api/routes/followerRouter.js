const Router = require('express').Router();

const {
	addFollower,
	removeFollower,
	getFollowerList,
	getFollowerCount,
	getFollowingList,
	getFollowingCount,
} = require('../controllers/followerController');

Router.get('/addFollower/:userId', addFollower);
Router.get('/removeFollower/:userId', removeFollower);

Router.get('/getFollowerList/:userId', getFollowerList);
Router.get('/getFollowerCount/:userId', getFollowerCount);

Router.get('/getFollowingList/:userId', getFollowingList);
Router.get('/getFollowingCount/:userId', getFollowingCount);

module.exports = Router;

// abc is following xyz where abc is user1 and xyz is user2
// above statement means => abc is a follower of xyz OR user1 is a follower of user2
