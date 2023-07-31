import mongoose from 'mongoose'

const { Schema } = mongoose
const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Post title is requried'],
      unique: true
    },
    author: {
      type: String,
      required: [true, 'Author is required']
    },
    state: {
      type: Boolean,
      default: true
    },
    body: {
      type: String,
      required: [true, 'Text is required']
    },
    metadata: new Schema({
      hash: {
        type: String
      },
      num: {
        type: Number
      }
    }),

    bitacora: [{ user: { type: String }, fecha: { type: Date } }]
  },
  {
    collection: 'Post',
    timestamps: true
  }
)

export default mongoose.model('Post', postSchema)
