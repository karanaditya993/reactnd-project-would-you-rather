import React, { Component } from 'react'
import './dashboard.css'
import Questions from '../questions/Questions'
import Leaderboard from '../leaderboard/Leaderboard'
import AddQuestion from '../questions/add/AddQuestion'
import { connect } from 'react-redux'
import Tab from '@material-ui/core/Tab'
import Tabs  from '@material-ui/core/Tabs'
import  { TabPanel } from '../styled'
import QuestionDetails from '../questions/details/QuestionDetails'
import { DEFAULT_TAB_KEY, TABS_MAP } from './constants'
import { setAvailableQuestions, setAuthedUserQuestions } from '../../actions'
import {  Route, Link } from 'react-router-dom'

function mapStateToProps({ users, authedUser, questions, authedUserQuestions, availableQuestions }) {
    return {
        users,
        authedUser,
        authedUserQuestions,
        questions,
        availableQuestions,
    }
}

class Dashboard extends Component {
    state = {
        currentTab: DEFAULT_TAB_KEY,
    }
    componentDidMount() {
        const locationPathName = window.location.pathname
        if (locationPathName.includes('leaderboard')) {
            this.activateTab('leaderboard')
        }
        this.props.dispatch(setAuthedUserQuestions(this.props))
        this.props.dispatch(setAvailableQuestions(this.props))
    }
    activateTab(tabKey) {
        this.setState({
            currentTab: tabKey || DEFAULT_TAB_KEY
        })
    }
    handleQuestionClick(isAnswering) {
        this.setState({
            currentTab: isAnswering ? 'answeredQuestions' : 'unansweredQuestions'
        });
    }
    render() {
        const { currentTab } = this.state
        const { authedUserQuestions, availableQuestions  } = this.props
        return (
            <div className="dashboard">
                    <Route path='/'>
                        <Tabs className="dashboard-tabs" value={currentTab} centered>
                            {TABS_MAP.map((tab) => (
                                <Tab onClick={() => {  this.activateTab(tab.key) }} 
                                    label={tab.name} 
                                    key={tab.key}   
                                    value={tab.key} 
                                    component={Link} 
                                    to={tab.link}/>
                            ))}
                        </Tabs>
                        {TABS_MAP.map((tab) => (
                            <TabPanel className="panel-content" key={tab.key} value={tab.key} index={currentTab}>
                                {tab.key === 'unansweredQuestions' && availableQuestions && (
                                    <Questions data={availableQuestions.unansweredQuestions} onQuestionClicked={(isAnswering) => this.handleQuestionClick(isAnswering)}></Questions>
                                )}
                                {tab.key === 'answeredQuestions' && availableQuestions && (
                                    <Questions data={availableQuestions.answeredQuestions} onQuestionClicked={(isAnswering) => this.handleQuestionClick(isAnswering)}></Questions>
                                )}
                                {tab.key === 'myQuestions' && (
                                    <Questions data={authedUserQuestions} onQuestionClicked={(isAnswering) => this.handleQuestionClick(isAnswering)}></Questions>
                                )}
                                {tab.key === 'leaderboard' && (
                                    <Leaderboard></Leaderboard>
                                )}
                            </TabPanel>
                        ))}
                </Route>
                <Route exact path='/add' render={({ history }) =><AddQuestion history={history} onQuestionAdded={() => { this.setState({currentTab: 'unansweredQuestions'}) }}/>}/>
                <Route exact path='/questions/:question_id' render={({match}) => <QuestionDetails params={match.params}/>}></Route>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Dashboard)
