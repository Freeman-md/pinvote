import User from "../models/user"

class UserService {
    static findUserByEmail = async (email) => {
        const user = await User.findOne({
            email,
        })

        return user
    }
}

export default UserService