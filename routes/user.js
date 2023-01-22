const express = require('express');
const router = express.Router();

const User = require('../database/models/user');

router.post('/post', async (req, res) => {
	const { name, age } = req.body;
	const userData = new User({
		name,
		age,
	});

	try {
		const savedData = await userData.save();
		res.status(200).send(savedData);
	} catch (err) {
		res.status(400).send({ message: err.message });
	}
});

router.get('/getAll', async (req, res) => {
	try {
		const data = await User.find();

		res.send(data);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
});

router.get('/getOne/:id', async (req, res) => {
	try {
		const data = await User.findById(req.params.id);
		if (!data) {
			return res.send('User not found!');
		}
		res.send(data);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
});

router.patch('/update/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const updatedData = req.body;
		const options = { new: true };

		const result = await User.findByIdAndUpdate(id, updatedData, options);

		res.send(result);
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
});

router.delete('/delete/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const data = await User.findByIdAndDelete(id);
		res.send(`Document with ${data.name} has been deleted..`);
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
});

module.exports = router;
