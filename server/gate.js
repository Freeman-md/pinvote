class Gate {
    allows(user, action, model) {
        const policyClassName = `${model.constructor.name}-policy`.toLowerCase()
        const PolicyClass = import(`./policies/${policyClassName}`)

        const policy = new PolicyClass(user, model)

        if (!(policy instanceof BasePolicy) || typeof policy.checkPermission !== 'function') {
            throw new Error('Invalid policy');
          }
      
          return policy.checkPermission(action);
    }
}