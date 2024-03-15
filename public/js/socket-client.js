const socket = io()

socket.on('new-vote-casted', (msg) => {
    console.log('A new vote has been casted: ', msg)
})