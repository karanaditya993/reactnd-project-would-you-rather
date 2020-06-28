import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles({
    root: {
        maxWidth: '300px',
        margin: 'auto',
    },
    content: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        paddingBottom: '0',
        boxSizing: 'border-box',
        position: 'relative',
    },
    score: {
        backgroundColor: '#04406D',
        color: 'white',
        display: 'flex',
        position: 'absolute',
        right: '10px',
    }
});

export default function LeaderboardCard(props) {
    const classes = useStyles()
    const { data } = props
    return (
        <Card raised className={classes.root}>
            <CardContent className={classes.content}>
                <Avatar alt={data.name} src={data.avatar}></Avatar>
                    <div className="user-name">{data.name}</div>
                <Avatar className={classes.score}>{data.score}</Avatar>
            </CardContent>
            <div className="stats-container">
                <div className="questions">Questions: {data.questions.length}</div>
                <div className="answers">Answers: {Object.values(data.answers).length}</div>
            </div>
        </Card>
    )
}
