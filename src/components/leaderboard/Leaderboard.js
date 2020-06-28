import React, { Component } from 'react'
import LeaderboardCard from '../styled/LeaderboardCard'
import { connect } from 'react-redux'
import './leaderboard.css'

function mapStateToProps({ users }) {
    return {
        users
    }
}

function setLeaderboard({ users }) {
    return Object.values((users)).map((user) => {
        const stats = {...user}
        const numAnswers = Object.keys(user.answers).length;
        const numQuestions = user.questions.length
        stats.avatar = user.avatarURL
        stats.name = user.name
        stats.id = user.id
        stats.score = numAnswers + numQuestions
        return stats
    }).sort((a, b) => b.score - a.score);
}

class Leaderboard extends Component {
    state = {
        leaderboard: null,
    }
    static getDerivedStateFromProps(props) {
        return {
            leaderboard: setLeaderboard(props),
        }
    }
    render() {
        const { leaderboard } = this.state
        return (
            <div className="leaderboard-container">
                {leaderboard.map((user) => (
                    <div key={user.id} className="card-container">
                        <LeaderboardCard data={user}>
                        </LeaderboardCard>
                    </div>
                ))}
            </div>
        );
    }
}

export default connect(mapStateToProps)(Leaderboard)
