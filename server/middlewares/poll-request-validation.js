import { body } from "express-validator";
import PollService from "../services/poll-service";
import moment from "moment";

const validateStartDate = (startDate) => {
    const now = new Date();
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);

    const startDateObj = new Date(startDate);

    if (isNaN(startDateObj) || startDateObj <= yesterday) {
        throw new Error('Start date must be now or greater');
    }

    return true;
};

const validateEndDate = (endDate, { req }) => {
    const startDate = req.body.startDate;
    const endDateObj = new Date(endDate);
    const startDateObj = new Date(startDate);

    if (isNaN(endDateObj) || endDateObj <= startDateObj) {
        throw new Error('End date must be one day ahead of the start date');
    }

    return true;
};

export const validatePoll = [
    body('question').trim().notEmpty().escape().isLength({ min: 10 }).withMessage('Question must be more than 10 characters'),
    body('options').isArray({ min: 2 }),
    body('options.*').trim().notEmpty().isLength({ min: 3, max: 30 }),
    body('startDate').escape().isDate({
        format: 'YYYY-MM-DDTHH:mm'
    }).withMessage('Start date is invalid'),
    body('endDate').escape().isDate({
        format: 'YYYY-MM-DDTHH:mm'
    }).withMessage('End date is invalid'),
    body('visibility').isIn(['public', 'private']),
]

export const validatePollUpdate = [
    body('question').trim().notEmpty().escape().isLength({ min: 10 }).withMessage('Question must be more than 10 characters'),
    body('options').isArray({ min: 2 }),
    body('options.*').trim().notEmpty().isLength({ min: 3, max: 30 }),
    body('startDate').escape().isDate(),
    body('endDate').escape().isDate().custom(validateEndDate),
    body('visibility').isIn(['public', 'private']),
]