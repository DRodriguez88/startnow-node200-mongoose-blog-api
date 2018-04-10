const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikeSchema = new Schema ({
        likerId: { type: Schema.Types.ObjectId, required: true },
        liker: { type: Schema.Types.ObjectId, ref: 'User' },
        blogId: { type:Schema.Types.ObjectId, ref: 'Blog' } 
});

module.exports = mongoose.model('Like', LikeSchema);