const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema ({
        title: {type: String, required: true},
        body: {type: String, required: true},
        published: {type: Date, required: true},
        blogId: { type: Schema.Types.ObjectId, required: true},
        authorId: { type: Schema.Types.ObjectId, required: true },
        author: { type: Schema.Types.ObjectId, ref: 'User' },
        likes: [{ type: Schema.Types.ObjectId, ref: 'Like' }]
});

module.exports = mongoose.model('Comment', CommentSchema);