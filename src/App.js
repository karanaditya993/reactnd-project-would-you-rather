import React, { Component } from 'react'
import Login from './components/login/Login'
import Button from '@material-ui/core/Button'
import Dashboard from './components/dashboard/Dashboard'
import Emoji from 'react-emoji-render'
import img from './logo.svg'
import styled from 'styled-components'
import { connect } from 'react-redux'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import { CircularAddBtn } from './components/styled'
import { getAuthedUser, setAuthedUser, removeAuthedUser, getQuestions, setAuthedUserQuestions, setAvailableQuestions } from './actions'
import { isEmptyObject } from './helpers'
import {  Route, Link } from 'react-router-dom'

const LARGE_CONTAINER_TRANSITION_END_HEIGHT = '60%'
const SMALL_CONTAINER_TRANSITION_END_HEIGHT = '30%'
const CONTENT_OPACITY_START = '0'
const CONTENT_OPACITY_END = '1'
const LOGOUT_TEXT = 'Sign Out'
const TOOLTIP_TEXT = 'Ask a Question'

const Logo = styled.div `
    width: 100px;
    height: 70px;
    background-image: url(${props => props.logoUrl || img });
    background-size:  cover;
    background-repeat: no-repeat;
`

const AuthedUserIcon = styled.div`
    width: 25px;
    height: 25px;
    background-image: url(${props => props.avatarURL });
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 50%;
    border: 2px solid white;
    margin-right: 3px;
    margin-top: 3px;
`

function mapStateToProps({ users, authedUser, questions }) {
    return {
        showLogin: authedUser === null,
        authedUser: Object.values(users).find(user => user.id === authedUser),
        questions: isEmptyObject(questions) ? null : questions
    }
}

function setOpacityLevels(transitionEnd) {
    if (transitionEnd) {
        if (this.loginContainer && this.loginContainer.current) {
            this.loginContainer.current.style.opacity = CONTENT_OPACITY_END
        }
    } else {
        if (this.loginContainer && this.loginContainer.current) {
            this.loginContainer.current.style.opacity = CONTENT_OPACITY_START
        }
    }    
}

class App extends Component {
    constructor(props) {
        super(props)
        this.appContainer = React.createRef()
        this.loginContainer = React.createRef()
        this.dashboardContainer = React.createRef()
    }
    componentDidMount() {
        const authedUser = this.props.dispatch(getAuthedUser()).id
        setOpacityLevels.call(this)
        setTimeout(() => {
            this.appContainer.current.style.height = SMALL_CONTAINER_TRANSITION_END_HEIGHT
            if (authedUser) { this.expandContainer() }
        }, 1000)
        this.props.dispatch(setAuthedUser(authedUser))
        this.props.dispatch(getQuestions())
    }
    expandContainer() {
        this.appContainer.current.style.height = LARGE_CONTAINER_TRANSITION_END_HEIGHT
    }
    onTransitionEnd() {
        setOpacityLevels.call(this, true)
    }
    handleLogout() {
        this.props.dispatch(removeAuthedUser())
        this.props.dispatch(setAuthedUserQuestions({}))
        this.props.dispatch(setAvailableQuestions({}))
    }
    render() {
        const { authedUser, showLogin, questions } = this.props
        
        return (
            <React.Fragment>
                <div className="logo-container">
                    <Logo className="spin"></Logo>
                </div>
                <div className="sign-out-container">
                    {authedUser && (
                    <Button className="sign-out-btn" variant="contained" onClick={ () => this.handleLogout() }>
                        {LOGOUT_TEXT}
                    </Button>)}
                </div>
                <div className="authed-user-container">
                    {!authedUser && (
                        <AccountCircleOutlinedIcon style={{fill: "white"}} fontSize="large"></AccountCircleOutlinedIcon>
                    )}
                    {authedUser && authedUser.avatarURL && (
                        <Button variant="contained">
                            <AuthedUserIcon avatarURL={ authedUser.avatarURL }></AuthedUserIcon>
                            Welcome, {authedUser.name.split(' ')[0]}
                        </Button>
                    )}
                </div>
                <div className="app-container" ref={this.appContainer} onTransitionEnd={() => { this.onTransitionEnd() } }>
                    {showLogin && (
                        <div className="login-container" ref={this.loginContainer}>
                            <Login onSignIn={() => { this.expandContainer() }}></Login>
                        </div>
                    )}
                    {!showLogin && questions && (
                        <div className="dashboard-container" ref={this.dashboardContainer}>
                            <React.Fragment>
                                <Dashboard></Dashboard>
                                <Route exact path='/'>
                                    <Link to='/add'>
                                        <CircularAddBtn tooltipText={TOOLTIP_TEXT}></CircularAddBtn>
                                    </Link>
                                </Route>
                            </React.Fragment>
                        </div>
                    )}
                </div>
                <div className="made-by"><Emoji text="Built with <3 using React/Redux/MaterialUI"></Emoji></div>
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps)(App)
