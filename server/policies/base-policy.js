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
            const specificErrorMessage = this.getSpecificErrorMessage(action, modelName);
            throw new Error(specificErrorMessage);
        }
    }

    getSpecificErrorMessage(action, modelName) {
        switch (action) {
            case 'view':
            case 'edit':
            case 'update':
            case 'delete':
                return `You're not allowed to ${action} this ${modelName}`;
            case 'create':
                return `You're not allowed to create a ${modelName}`;
            default:
                return `You're not allowed to perform this action on ${modelName}`;
        }
    }
}

export default BasePolicy