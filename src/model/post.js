import mongoose, { Model } from 'mongoose'

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
    }

    // TODO: agregar el campo metadata: { hash: String (12345), num: Number }

    // TODO: agregar un campo bitacora: [ {  user: String , fecha: date   } ]
  },
  {
    collection: 'Post',
    timestamps: true
  }
)

export default mongoose.model('Post', postSchema)
