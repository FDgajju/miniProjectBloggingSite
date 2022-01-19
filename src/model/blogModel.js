const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author"
    },
    tags: [String],
    category: {
        type: String,
        required: true
    },
    subcategory: [String],

    deletedAt: { type: Date },
    isDeleted: {
        type: Boolean,
        default: false
    },
    publishedAt: { type: Date },
    isPublished: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model('Blog', blogSchema)