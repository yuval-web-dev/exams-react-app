import axios from 'axios'
import { userEndpts } from '../endpoints'

const userPost = async (user = 'user', pass = 'pass', firstname = 'John', surname = 'Doe') => {
  const userObj = new userObject(user, pass, firstname, surname)
  const userArray = [userObj]
  try {
    await axios.post(userEndpts.post, userArray)
  }
  catch (err) {
    console.error(err)
  }
}

export default userPost