import React, { Component } from 'react'
import { connect } from "react-redux"
import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import './questionDetails.css'

const TITLE_TEXT = 'Would you rather?'

function mapStateToProps({users, questions}) {
    return {
        questions,
        users,
    }
}

function getQuestionInfo(props) {
    const questionId = props.params.question_id
    const questions = props.questions
    return questions[questionId] || null
}

class QuestionDetails extends Component {
    state = {
        question: null,
    }
    componentDidMount() {
        this.setState({
            question: getQuestionInfo(this.props),
        })
    }
    getPercentageWidth(votes) {
        const totalUsers = Object.keys(this.props.users).length
        return `${Math.round((votes.length / totalUsers) * 100)}%`
    }
    render() {
        const { users } = this.props
        const { question } = this.state
        return (
            <div className="question-details-container">
                <div className="close-container">
                    <Link to='/'>
                        <img alt='close-container' src='/close.png'></img>
                    </Link>
                </div>
                {question && (
                    <Card raised>
                        <CardHeader 
                            avatar={<Avatar src={users[question.author].avatarURL}></Avatar>}
                            title={TITLE_TEXT}
                        >
                        </CardHeader>
                        <CardContent className="details-content-container">
                            <div className="question-percentage-container">
                                {question.optionOne.text} <span>({question.optionOne.votes.length} votes)</span>
                                <div className="percentage-container"></div>
                                <div className="percent" style={{width: this.getPercentageWidth(question.optionOne.votes)}}></div>
                                <div className="percentage-value">{this.getPercentageWidth(question.optionOne.votes)}</div>
                            </div>
                            <div className="question-percentage-container">
                                {question.optionTwo.text} <span>({question.optionTwo.votes.length} votes)</span>
                                <div className="percentage-container"></div>
                                <div className="percent" style={{width: this.getPercentageWidth(question.optionTwo.votes)}}></div>
                                <div className="percentage-value">{this.getPercentageWidth(question.optionTwo.votes)}</div>
                            </div> 
                        </CardContent>
                    </Card>  
                )}
            </div>
        )
    }
}

export default connect(mapStateToProps)(QuestionDetails)
