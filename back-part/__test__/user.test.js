describe('add user service', () => {
    it('should add user in database', () => {
        const objTest = {
            firstName: "sbaiti",
            lastName: "sbaiti",
            email: "sbaiti@gmail.com",
            login: "sbaiti",
            password: "sbaiti"
        }
        const { addUser } = require('../services/user')
        addUser(objTest).then(user => {
            expect(user).toHaveProperty('_id')
            expect(user).toHaveProperty('firstName')
            expect(user).toHaveProperty('lastName')
            expect(user).toHaveProperty('login')
            expect(user).toHaveProperty('email')
        }
        )
            .catch(err => console.log(err))
    })
})

describe('login user api', () => {
    it('should login success', () => {
        const objTest = {
            login: "sbaiti",
            password: "sbaiti"
        }
        const { login } = require('../services/user')
        login(objTest).then(user => {
            expect(user).toHaveProperty('_id')
            expect(user).toHaveProperty('firstName')
            expect(user).toHaveProperty('lastName')
            expect(user).toHaveProperty('login')
            expect(user).toHaveProperty('email')
        }
        )
            .catch(err => console.log(err))
    })
})