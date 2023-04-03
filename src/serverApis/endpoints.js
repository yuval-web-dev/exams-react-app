const host = 'http://localhost:8080/'
const path = 'api/'

const examEndpts = {
    'post': host + path + '/exam/create'
}

const userEndpts = {
    'post': host + path + '/user/create',
    'auth': host + path + '/user/auth'
}

export { examEndpts, userEndpts }