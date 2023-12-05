class AuthorizationMiddleware {
    constructor(action) {
        this.action = action;
    }

    handle(req, res, next) {
        const user = req.user
        const model = req.model

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
          }
      
          if (!model) {
            return res.status(400).json({ message: 'Bad Request' });
          }
      
          const gate = new Gate();
      
          try {
            if (!gate.allows(user, this.action, model)) {
              return res.status(403).json({ message: 'Forbidden' });
            }
          } catch (error) {
            return res.status(400).json({ message: 'Invalid Action' });
          }
      
          next();
    }
}