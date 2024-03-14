const Events = {
    PASSWORD_RESET: 'send-password-reset-mail',
    NEW_USER: 'send-welcome-email',
    POLL_CREATED: 'poll-created',
    POLL_UPDATED: 'poll-updated',
    VOTE_CASTED: 'vote-casted',
    POLL_ABOUT_TO_START: 'poll-about-to-start',
    POLL_STARTED: 'poll-started',
    POLL_ABOUT_TO_END: 'poll-about-to-end',
    POLL_ENDED: 'poll-ended',
};

export default Events;
