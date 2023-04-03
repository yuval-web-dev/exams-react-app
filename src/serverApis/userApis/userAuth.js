import axios from 'axios'
import { userEndpts } from '../endpoints'

const userAuth = async (user = 'user', pass = 'pass') => {
  const login = { user: user, pass: pass }
  try {
    await axios.post(userEndpts.auth, login)
  }
  catch (err) {
    console.error(err)
  }
}

export default userAuth