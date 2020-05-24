describe('add music service', () => {
    it('should add music in database', () => {
        const objTest = {
            file: "gagnam style.mp3",
            idUser: "5ec132646ec048515f1f5531"
        }
        const { addMusic } = require('../services/music')
        addMusic(objTest).then(music => {
            expect(music).toHaveProperty('_id')
            expect(music).toHaveProperty('file')
            expect(music).toHaveProperty('idUser')
        }
        )
            .catch(err => console.log(err))
    })
})