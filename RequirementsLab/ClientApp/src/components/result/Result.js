import React, { Component } from "react";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import composeStyles from "../../utils/composeStyles";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    borderRadius: '20px',
    backgroundColor: 'rgb(196, 196, 196)',
    padding: '20px',
  },
  pos: {
    color: 'rgb(68, 68, 68)',
  },
  middleText: {
    textAlign: 'center',
  },
  taskListContent: {
    backgroundColor: 'white',
    borderRadius: '20px',
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
    const { classes, level, levelName, time, title } = this.props;

    return (
      <div>
        <Typography className={classes.pos}>Результат тесту</Typography>

        <Card className={classes.root}>
          <Typography className={classes.pos}>
            {title}
          </Typography>

          <CardContent className={classes.taskListContent}>
            <Typography variant="h5" className={composeStyles([
              classes.pos,
              classes.middleText,
              classes.levelText,
            ])}>
              Ваш результат - {level}%
              {
                levelName ?

                (<>
                  <br />
                  {levelName}
                </>) : 

                null
              }
            </Typography>

            <Typography className={composeStyles([
              classes.pos,
              classes.middleText,
            ])}>
              Час, витрачений на виконання
              <br />
              завдання - {time}
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

export default function StartingTestResult({ level, levelName, time, title }) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <StartingTestResultComponent
      classes={classes}
      level={level}
      levelName={levelName}
      history={history}
      time={time}
      title={title}
    />
  );
}
