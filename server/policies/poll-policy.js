import BasePolicy from "./base-policy";

class PollPolicy extends BasePolicy {
    checkPermission(action) {
        // Dynamically dispatch the action to the corresponding method
        const methodName = action.toLowerCase();
        if (typeof this[methodName] === 'function') {
            return this[methodName]();
        }
        throw new Error('Invalid action');
    }

    view() {
        return this.user._id === this.model.user._id;
    }

    create() {
        return true;
    }

    update() {
        return this.user._id === this.model.user._id;
    }

    delete() {
        return this.user._id === this.model.user._id;
    }
}