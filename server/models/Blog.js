const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    title: { type: String, required: true },
    article: { type: String, required: true },
    published: { type: Date, required: true },
    featured: { type: Boolean, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User'},
    comments: [{ type:Schema.Types.ObjectId, ref: 'Comment' }],
    likes: [{ type: Schema.Types.ObjectId, ref: 'Like' }]
});

BlogSchema.post('remove', function(doc) {
    const Comment = mongoose.model('Comment')

    Comment
        .find({ blogId: doc._id })
        .then(comments => {
            // Find all comment related to the blog, 
            // remove them from their authors, and delete from comments collection
            comments.forEach(comment => {
                User.update(
                    { _id: comment.author },
                    { $pull: { comments: comment._id, blogs:doc._id } }
                ).then(user => comment.remove());
            });
        })
        .catch(err => console.log(err));

})

module.exports = mongoose.model('Blog', BlogSchema);

