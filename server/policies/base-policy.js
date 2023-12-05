class BasePolicy {
    constructor(user, model) {
        this.user = user;
        this.model = model
    }

    checkPermission(action) {
        throw new Error('Not implemented');
    }
}

export default BasePolicy