const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikeSchema = new Schema ({
        liker: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        blogId: { type:Schema.Types.ObjectId, ref: 'Blog', required: true }
});

module.exports = mongoose.model('Like', LikeSchema);