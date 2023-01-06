import Model from '../model/post.js'

export const MetaData = async () => {
  try {
    const newPost = new Model({
      metadata: {
        hash: 'weqwfasg',
        num: Math.random()
      }
    })
    await newPost.save()
  } catch (error) {
    return {
      code: 501,
      message: error.message
    }
  }
}
