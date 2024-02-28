import { body, param } from 'express-validator';
import PollService from '../services/poll-service';
import moment from 'moment';
import BaseValidator from './validator';
import EnsurePollIsActive from '../actions/polls/ensure-poll-is-active';

class PollRequestValidator extends BaseValidator {
  constructor() {
    super();

    this.validateDateTime = (value) => {
      if (!moment(value, 'YYYY-MM-DDTHH:mm', true).isValid()) {
        throw new Error('Invalid date format');
      }
      return true;
    };

    this.validateStartDate = (startDate) => {
      const now = new Date();
      const yesterday = new Date();
      yesterday.setDate(now.getDate() - 1);

      const startDateObj = new Date(`${startDate}:00`);

      if (isNaN(startDateObj) || startDateObj <= yesterday) {
        throw new Error('Start date must be now or greater');
      }

      return true;
    };

    this.validateEndDate = (endDate, { req }) => {
      const startDate = req.body.startDate;

      const endDateObj = new Date(`${endDate}:00`);
      const startDateObj = new Date(`${startDate}:00`);

      if (isNaN(endDateObj) || endDateObj <= startDateObj) {
        throw new Error('End date must be ahead of the start date');
      }

      return true;
    };

    this.validateOptionInPoll = async (value, { req }) => {
        const poll = await PollService.getPollDetails(req.params.id);

        if (!poll) {
          throw new Error('Poll not found');
        }

        if (!poll.options.includes(value)) {
          throw new Error('Option does not exist in Poll');
        }

        return true;
      }

      this.ensurePollIsActive = async (value, { req }) => {
        await EnsurePollIsActive.execute(value)
      }

    this.validatePoll = [
      body('question').trim().notEmpty().escape().isLength({ min: 10 }).withMessage('Question must be more than 10 characters'),
      body('options').isArray({ min: 2 }),
      body('options.*').trim().notEmpty().isLength({ min: 3, max: 30 }),
      body('startDate').escape().custom(this.validateDateTime).withMessage('Start date is invalid').custom(this.validateStartDate),
      body('endDate').escape().custom(this.validateDateTime).withMessage('End date is invalid').custom(this.validateEndDate),
      body('visibility').isIn(['public', 'private']),
    ]

    this.validatePollUpdate = [
      body('question').trim().notEmpty().escape().isLength({ min: 10 }).withMessage('Question must be more than 10 characters'),
      body('options').isArray({ min: 2 }),
      body('options.*').trim().notEmpty().isLength({ min: 3, max: 30 }),
      body('startDate').escape().custom(this.validateDateTime).withMessage('Start date is invalid'),
      body('endDate').escape().custom(this.validateDateTime).withMessage('End date is invalid').custom(this.validateEndDate),
      body('visibility').isIn(['public', 'private']),
    ]

    this.validateOptionExistsAndPollIsActive = [
      body('option').trim().notEmpty().custom(this.validateOptionInPoll),
      param('id').custom(this.ensurePollIsActive)
    ]
  }
}

export default new PollRequestValidator();
