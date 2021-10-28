import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import * as backend from '../../store/startingTest';
import StartingTestResult from './StartingTestResult';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    borderRadius: '20px',
    backgroundColor: 'rgb(196, 196, 196)',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  pos: {
    color: 'rgb(68, 68, 68)',
  },
  taskCard: {
    borderRadius: '20px',
    backgroundColor: 'white',
  },
  taskCardContent: {
    display: 'flex',
    flexDirection: 'column',
    padding: '16px !important',
  },
  taskListContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'wrap',
    maxHeight: '400px',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '20px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'white',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgb(76, 79, 107)',
    },
  },
  startTaskButton: {
    borderRadius: '20px',
    backgroundColor: 'rgb(76, 79, 107)',
    color: 'white',
    alignSelf: 'center',
    marginTop: '15px',
    '&:hover, &:focus': {
      backgroundColor: 'rgb(50, 50, 80)',
    },
  },
  cardItem: {
    flexBasis: '50%',
    padding: '10px',
  },
  radiobuttonMargin: {
    marginTop: '10px',
  },
});

const PurpleRadio = withStyles({
  root: {
    color: 'rgb(76, 79, 107)',
    '&$checked': {
      color: 'rgb(76, 79, 107)',
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

export function TestQuestionAndAnswers({ classes, testText, variants, answer, answersRef }) {
  const startingVariantId = variants[0].id;
  const [value, setValue] = React.useState(startingVariantId + '');

  answersRef.setValue = setValue;

  const handleChange = (event) => {
    const val = event.target.value;

    setValue(val);
    answer.answerId = parseInt(val);
  };

  answer.answerId = value;

  return (
    <FormControl component="fieldset">
      <Typography className={classes.title}>
        {testText}
      </Typography>

      <RadioGroup
        className={classes.radiobuttonMargin}
        aria-label="answer"
        name="answerId"
        value={value}
        onChange={handleChange}
      >
        {variants.map((variant, index) => (
          <FormControlLabel
            key={variant.id}
            value={variant.id + ''}
            control={<PurpleRadio />}
            label={variant.text}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export class StartingTestComponents extends Component {
  constructor(props) {
    super(props);

    this.answers = null;
    this.currentAnswer = null;
    this.currentQuestion = null;

    this.answersRef = {
      setValue: null,
    };
  }

  componentDidMount() {
    this.props.dispatch(backend.startingTest());

    this.answers = [];
    this.currentAnswer = null;
  }

  componentDidUpdate() {
    const question = this.currentQuestion;

    if (question !== null) {
      this.answersRef.setValue(question.variants[0].id + '');
    }
  }

  onProceedClicked = () => {
    this.answers.push(this.currentAnswer);
    this.props.dispatch(backend.nextQuestion());
  }

  onFinishClicked = () => {
    this.answers.push(this.currentAnswer);

    const answers = this.answers.map((answer) => ({
      questionId: answer.questionId,
      variantId: parseInt(answer.answerId),
    }));

    const answersDTO = {
      answers,
    };

    this.props.dispatch(backend.finishTest(answersDTO));
  }

  render() {
    const { classes, questions, questionId, result } = this.props;

    if (result !== null) {
      const { level, levelName } = result;

      return (
        <StartingTestResult
          classes={classes}
          level={level}
          levelName={levelName}
        />
      );
    }

    const question = questions[questionId];

    if (question === undefined) {
      this.currentQuestion = null;

      return null;
    }

    this.currentQuestion = question;

    let isLast = false;

    if (questionId === questions.length - 1) {
      isLast = true;
    }

    const answer = this.currentAnswer = {
      questionId: question.id,
    };

    return (
      <div>
        <Typography className={classes.pos}>Тест на визначення початкового рівня</Typography>

        <Card className={classes.root}>
          <CardContent className={classes.taskListContent}>
            <Typography variant={'h6'}>
              Питання {questionId + 1}
            </Typography>

            <Typography variant={'subtitle1'}>
              Складність - {question.difficulty}
            </Typography>

            <br/>

            <TestQuestionAndAnswers
              variants={question.variants}
              testText={question.text}
              classes={classes}
              answer={answer}
              answersRef={this.answersRef}
            />

            <Button
              variant="contained"
              className={classes.startTaskButton}
              onClick={isLast ? this.onFinishClicked : this.onProceedClicked}
            >
              { isLast ? 'Завершити спробу' : 'Наступне питання' }
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export function StartingTest({ dispatch, error, loading, questions, questionId, result }) {
  const classes = useStyles();

  return (
    <StartingTestComponents
      dispatch={dispatch}
      testNumber={12}
      difficulty={'Складне'}
      testText={'На які запитання дають відповіді операційні вимоги до ПЗ?'}
      variantOne={'Програмна продуктивність'}
      variantTwo={'Використання середовища'}
      variantThree={'Вимоги ефективності ПП'}
      loading={loading}
      error={error}
      questions={questions}
      questionId={questionId}
      result={result}
      classes={classes}
    />  
  );
}

const mapStateToProps = (state) => {
  const { loading, error, questions, questionId, result } = state.startingTest;

  return {
    loading,
    error,
    questions,
    questionId,
    result,
  };
};

export default connect(mapStateToProps)(StartingTest);
