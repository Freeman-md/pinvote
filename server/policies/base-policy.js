class BasePolicy {
    async authorize(action, user, ...args) {
        const methodName = action.toLowerCase();
        const model = this.constructor.name.replace(/Policy$/, '');

        if (typeof this[methodName] !== 'function') {
            throw new Error(`Invalid action: ${action}`);
        }

        const isAuthorized = this[methodName](user, ...args);

        if (!isAuthorized) {
            const modelName = model.charAt(0).toUpperCase() + model.slice(1);
            throw new Error(`You're not allowed to ${action} this ${modelName}`);
        }
    }
}

export default BasePolicy