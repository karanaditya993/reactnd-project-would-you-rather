import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Avatar from '@material-ui/core/Avatar'
import SwipeableViews from 'react-swipeable-views'
import Pagination from '@material-ui/lab/Pagination'
import Vote from '../vote/Vote'
import './questions.css'
import { updateQuestionsWithVotes } from '../../actions'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const  QUESTION_NAME = 'Would you rather?'

function mapStateToProps({ authedUser, users, questions, availableQuestions }) {
    return {
        authedUser,
        questions,
        users,
        availableQuestions,
    }
}

class Questions extends Component {
    state = {
        activeQuestionIdx: 0,
        hoveredOptionIdx: null,
    }
    changeActiveQuestionsIdx(_evt, page) {
        if (page) {
            this.setState({
                activeQuestionIdx: page - 1,
            })
        }
    }
    handleMouseEnter(idx) {
        this.setState({
            hoveredOptionIdx: idx,
        })
    }
    handleMouseLeave() {
        this.setState({
            hoveredOptionIdx: null,
        })
    }
    handleContainerClick(questionId, option) {
        this.props.dispatch(updateQuestionsWithVotes(questionId, option, this.props));
    }
    activeIconColor(idx) {
        return idx === this.state.hoveredOptionIdx ? 'secondary' : 'action'
    }
    render() {
        const { activeQuestionIdx } = this.state
        const { users, data } = this.props
        return (
            <div className="question-container">
                {data && (
                    <React.Fragment>
                        <SwipeableViews index={activeQuestionIdx}>
                            {data.map((question) => (
                                <React.Fragment key={question.id} >
                                    <Container className="question-widget" disableGutters>
                                    <div className="question-banner">
                                        <Avatar src={users[question.author].avatarURL}></Avatar>{users[question.author].name} asks
                                        <div>{QUESTION_NAME}</div>
                                    </div>
                                    <div className="question-options">
                                        <div className="option-one"
                                            onMouseEnter={() => this.handleMouseEnter(0)} onMouseLeave={() => this.handleMouseLeave()}
                                            onClick={() => this.handleContainerClick(question.id, 'optionOne')}>
                                            {question.optionOne.text}
                                            <Vote votes={question.optionOne.votes} activeIconColor={this.activeIconColor(0)}></Vote>
                                        </div>
                                        <div className="option-two"
                                        onMouseEnter={() => this.handleMouseEnter(1)}
                                        onMouseLeave={() => this.handleMouseLeave()}
                                        onClick={() => this.handleContainerClick(question.id, 'optionTwo')}>
                                            {question.optionTwo.text}
                                            <Vote votes={question.optionTwo.votes} activeIconColor={this.activeIconColor(1)}></Vote>
                                        </div>
                                    </div>
                                </Container>
                                <Link className="view-details-link" to={`/questions/${question.id}`}>
                                    <Button variant="outlined" color="primary">toggle details</Button>
                                </Link>
                            </React.Fragment>
                            ))}
                        </SwipeableViews>
                        <Pagination className="pagination-counter" 
                            count={data.length}
                            onChange={(evt, page) => { this.changeActiveQuestionsIdx(evt, page)  }}
                        ></Pagination>
                    </React.Fragment>
                )}
            </div>
        );
    }
}

export default connect(mapStateToProps)(Questions)
