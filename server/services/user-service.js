import User from "../models/user"

export class UserService {
    static findUserByEmail = async (email) => {
        const user = await User.findOne({
            email,
        })

        return user
    }
}