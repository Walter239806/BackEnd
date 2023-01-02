import Model from '../model/user.js'

export const profile = async (req, res, next) => {
  const find = await Model.find()
  if (find != null) {
    return res.send(find)
  }
  return res.send('No data')
}
