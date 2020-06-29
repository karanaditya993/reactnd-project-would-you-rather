import { isEmptyObject } from '../helpers'

export const SET_AVAILABLE_QUESTIONS = 'SET_AVAILABLE_QUESTIONS'
export const UPDATE_AVAILABLE_QUESTIONS = 'UPDATE_AVAILABLE_QUESTIONS'

function _formatAvailableQuestions({ users, authedUser, questions }) {
    if (!isEmptyObject(users && authedUser && questions)) {
        const answeredQuestions = Object.values(questions).filter((question) => users[authedUser].answers[question.id])
        const unansweredQuestions = Object.values(questions).filter((question) => !users[authedUser].answers[question.id])
        return {
            answeredQuestions: answeredQuestions.sort((a, b) => b.timestamp - a.timestamp),
            unansweredQuestions: unansweredQuestions.sort((a, b) => b.timestamp - a.timestamp)
        }
    }
    return {
        answeredQuestions: [],
        unansweredQuestions: []
    }
}

export function setAvailableQuestions(props) {
    const availableQuestions = _formatAvailableQuestions(props)
    return {
        type: SET_AVAILABLE_QUESTIONS,
        availableQuestions
    }
}

export function updateAvailableQuestions(questions) {
    questions.sort((a, b) => b.timestamp - a.timestamp);
    return {
        type: UPDATE_AVAILABLE_QUESTIONS,
        availableQuestions: questions,
    }
}
