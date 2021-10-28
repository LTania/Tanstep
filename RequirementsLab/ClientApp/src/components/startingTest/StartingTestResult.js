import React, { Component } from "react";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { connect } from 'react-redux';
import composeStyles from "../../utils/composeStyles";
import { Link, Button } from "@material-ui/core";
import { useHistory } from "react-router";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    borderRadius: '20px',
    backgroundColor: 'rgb(196, 196, 196)',
  },
  pos: {
    color: 'rgb(68, 68, 68)',
  },
  middleText: {
    textAlign: 'center',
  },
  levelText: {
    margin: '20px 0',
  },
  taskListContent: {
  },
  tasksButton: {
    borderRadius: '20px',
    backgroundColor: 'rgb(76, 79, 107)',
    color: 'white',
    alignSelf: 'center',
    margin: '15px auto 0',
    display: 'block',
    '&:hover, &:focus': {
      backgroundColor: 'rgb(50, 50, 80)',
    },
  },
});

export class StartingTestResultComponent extends Component {
  handleTasks = () => {
    this.props.history.push('/tasks');
  }

  render() {
    const { classes, level, levelName } = this.props;

    return (
      <div>
        <Typography className={classes.pos}>Результат тесту</Typography>

        <Card className={classes.root}>
          <CardContent className={classes.taskListContent}>
            <Typography className={composeStyles([
              classes.pos,
              classes.middleText,
            ])}>
              Тест пройдено. Ваш результат:
            </Typography>

            <Typography variant="h3" className={composeStyles([
              classes.pos,
              classes.middleText,
              classes.levelText,
            ])}>
              {level}%
            </Typography>

            <Typography variant="h4" className={composeStyles([
              classes.pos,
              classes.middleText,
            ])}>
              {levelName}
            </Typography>

            <Button
              variant="contained"
              className={classes.tasksButton}
              onClick={this.handleTasks}
            >
              Перейти до завдань
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default function StartingTestResult({ level, levelName }) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <StartingTestResultComponent
      classes={classes}
      level={level}
      levelName={levelName}
      history={history}
    />
  );
}
