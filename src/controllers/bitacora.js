import Model from '../model/post.js'

export const bitacora = async (_id, username) => {
  const arrayI = Model.findOne({ _id })

  const data = {
    user: username,
    fecha: new Date()
  }
  console.log('arrayI', arrayI)

  const newBitacora = await Model.updateOne(
    {
      _id: arrayI._id
    },
    {
      '$set': { bitacora: data }
    }
  )
  return console.log('Bitacora added:', newBitacora)
}
