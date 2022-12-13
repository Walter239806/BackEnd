import mongoose from 'mongoose'

const { Schema } = mongoose
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Please type a username'],
      unique: true
    },

    fullname: {
      type: String,
      required: [true, 'Please enter your name'],
      unique: false
    },

    password: {
      type: String,
      required: [true, 'Plese type a password'],
      unique: false
    }
  },
  {
    collection: 'Users',
    timestamps: true
  }
)

export default mongoose.model('Users', userSchema)
