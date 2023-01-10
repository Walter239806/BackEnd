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
    },
    // TODO✓: metadata se llena desde el api: CREATE / UPDATE
    metadata: new Schema({
      hash: {
        type: String
      },
      num: {
        type: Number
      }
    }),

    // TODO✓: al crear o actualizar un post debe agregar una bitacora.

    bitacora: [{ user: { type: String }, fecha: { type: Date } }]
  },
  {
    collection: 'Post',
    timestamps: true
  }
)

export default mongoose.model('Post', postSchema)
