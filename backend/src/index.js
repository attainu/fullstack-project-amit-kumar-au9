const app = require('./app');

const PORT = process.env.PORT || 6700;

app.listen(PORT, (err) => {
	if (err) throw err;
	console.log(`Server is running at port ${PORT}`);
});
