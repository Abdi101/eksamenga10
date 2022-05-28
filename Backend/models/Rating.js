const mongoose = 	require('mongoose');
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
	brewId: {	
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Brew',
		required: true
	},
	userId: {	
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	rating: {	
		type: Number,
		required: true,
		min: 1,
		max: 5
	}
});


//compile schema to model
module.exports = mongoose.model('Rating', RatingSchema);