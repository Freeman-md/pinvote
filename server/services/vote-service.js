class VoteService {
    static recordVote = async (userId, pollId, optionId) => {
        console.log('user ID', userId)
        console.log('poll ID', pollId)
        console.log('option ID', optionId)

        return true
    }
}  

export default VoteService