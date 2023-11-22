import { body } from "express-validator";
import PollService from "../services/poll-service";
import moment from "moment";

export const validateDateTime = value => {
    // Check if the value is a valid date in the expected format
    if (!moment(value, 'YYYY-MM-DDTHH:mm', true).isValid()) {
      throw new Error('Invalid date format');
    }
    return true;
  }

  const validateStartDate = (startDate) => {
    const now = new Date();
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);

    // Adjusted parsing for datetime-local input
    const startDateObj = new Date(`${startDate}:00`);

    if (isNaN(startDateObj) || startDateObj <= yesterday) {
        throw new Error('Start date must be now or greater');
    }

    return true;
};

const validateEndDate = (endDate, { req }) => {
    const startDate = req.body.startDate;

    // Adjusted parsing for datetime-local input
    const endDateObj = new Date(`${endDate}:00`);
    const startDateObj = new Date(`${startDate}:00`);

    if (isNaN(endDateObj) || endDateObj <= startDateObj) {
        throw new Error('End date must be ahead of the start date');
    }

    return true;
};


export const validatePoll = [
    body('question').trim().notEmpty().escape().isLength({ min: 10 }).withMessage('Question must be more than 10 characters'),
    body('options').isArray({ min: 2 }),
    body('options.*').trim().notEmpty().isLength({ min: 3, max: 30 }),
    body('startDate').escape().custom(validateDateTime).withMessage('Start date is invalid').custom(validateStartDate),
    body('endDate').escape().custom(validateDateTime).withMessage('End date is invalid').custom(validateEndDate),
    body('visibility').isIn(['public', 'private']),
]

export const validatePollUpdate = [
    body('question').trim().notEmpty().escape().isLength({ min: 10 }).withMessage('Question must be more than 10 characters'),
    body('options').isArray({ min: 2 }),
    body('options.*').trim().notEmpty().isLength({ min: 3, max: 30 }),
    body('startDate').escape().custom(validateDateTime).withMessage('Start date is invalid'),
    body('endDate').escape().custom(validateDateTime).withMessage('End date is invalid').custom(validateEndDate),
    body('visibility').isIn(['public', 'private']),
]

export const validateOptionInPoll = [
    body('option').trim().notEmpty().custom(async (value, { req }) => {
        const poll = await PollService.getPollDetails(req.params.id)

        if (!poll) {
            throw new Error('Poll not found')
        }

        if (!poll.options.includes(value)) {
            throw new Error('Option does not exist in Poll')
        }

        return true
    })
]