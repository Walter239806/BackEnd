import Model from '../model/post.js'

export const bitacora = async (_id, username) => {
  const data = {
    user: username,
    fecha: new Date()
  }

  const newBitacora = await Model.updateOne(
    {
      _id
    },
    {
      '$push': { bitacora: data }
    }
  )
  return console.log('Bitacora added:', newBitacora)
}
