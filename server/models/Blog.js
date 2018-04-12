const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    title: { type: String, required: true },
    article: { type: String, required: true },
    published: { type: Date, required: true },
    featured: { type: Boolean, required: true },
    authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comments: [{ type:Schema.Types.ObjectId, ref: 'Comment' }],
    likes: [{ type: Schema.Types.ObjectId, ref: 'Like' }]
});

BlogSchema.post('remove', function(doc) {
    const Comment = mongoose.model('Comment')
    const User = mongoose.model('User')

    Comment
        .find({ blogId: doc._id })
        .then(comments => {
            //Go through all comments inside of asingle blog
            comments.forEach(comment => {
                User.update(
                    { _id: comment.authorId },
                    { $pull: { comments: comment._id, blogs:doc._id } }
                ).then(user => comment.remove());
            });
        })
        .catch(err => console.log(err));

})

module.exports = mongoose.model('Blog', BlogSchema);

