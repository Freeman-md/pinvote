import { matchedData, validationResult } from 'express-validator';
import { handleGlobalError } from '../utils/helpers';
import PollService from '../services/poll-service';
import moment from 'moment';
import PollPolicy from '../policies/poll-policy';

class PollController {
    async index(req, res, next) {
        try {
            const polls = await PollService.getUserPolls(req.session.user._id);

            res.render('user/polls', {
                title: 'My Polls',
                polls,
            });
        } catch (error) {
            return handleGlobalError(req, res, error);
        }
    }

    create(req, res, next) {
        res.render('user/polls/create', {
            title: 'My Polls • Create',
        });
    }

    async edit(req, res, next) {
        const { id } = matchedData(req);

        try {
            if (!res.locals.formData) {
                const poll = await PollService.getPollDetails(id);

                res.locals.formData = {
                    ...poll._doc,
                    startDate: moment(poll._doc.startDate).format('YYYY-MM-DDTHH:mm'),
                    endDate: moment(poll._doc.endDate).format('YYYY-MM-DDTHH:mm'),
                };
            }

            res.render('user/polls/edit', {
                title: 'My Polls • Edit',
                id,
            });

        } catch (error) {
            return handleGlobalError(req, res, error);
        }
    }

    async store(req, res, next) {
        const data = matchedData(req);

        try {
            await PollService.createPoll({ ...data, user: req.session.user._id });

            req.flash('info', 'Poll created successfully');

            res.redirect('/user/polls');
        } catch (error) {
            return handleGlobalError(req, res, error);
        }
    }

    async update(req, res, next) {
        const data = matchedData(req);

        const { id: pollId, startDate, ...poll } = data;

        try {
            await PollPolicy.authorize('update', req.session.user, pollId)

            await PollService.updatePoll(pollId, poll);

            req.flash('info', `Poll "${poll.question.substring(0, 10)}..." updated successfully`);

            res.redirect('/user/polls');
        } catch (error) {
            return handleGlobalError(req, res, error);
        }
    }

    async delete(req, res, next) {
        const { id } = matchedData(req);

        try {
            await PollService.deletePoll(id);

            req.flash('info', `Poll deleted successfully`);

            res.redirect('/user/polls');
        } catch (error) {
            return handleGlobalError(req, res, error);
        }
    }
}

export default new PollController();
