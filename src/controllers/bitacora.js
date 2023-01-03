import Model from '../model/post.js'

export const bitacora = async (_id, username) => {
  //   const author = {
  //     user: username
  //   }

  const newBitacora = await Model.updateOne(
    {
      _id
    },
    {
      '$push': { 'bitacora.$.user': username }
    }
  )
  return console.log('Bitacora added:', newBitacora)
}
