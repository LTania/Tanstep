import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import * as backend from '../../store/requirementsTask';
import composeStyles from '../../utils/composeStyles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { IconButton } from '@material-ui/core';
import { AppTheme } from '../../utils/colors';
import { useHistory } from 'react-router';
import Result from '../result/Result';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    borderRadius: '20px',
    backgroundColor: 'rgb(196, 196, 196)',
    color: AppTheme.mainText,
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
  requirementsTaskContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  mainButton: {
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
  whiteTextField: {
    backgroundColor: 'white',
    borderRadius: '10px',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: 'none',
      },
      '& input': {
        padding: '5px',
      },
    },
  },
  fullWidthItem: {
    width: '100%',
  },
  displayFlex: {
    display: 'flex',
  },
  taskBlockContent: {
    maxHeight: '250px',
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
  taskBlock: {
    minWidth: '0',
    backgroundColor: 'white',
    borderRadius: '20px',
    overflow: 'hidden',
    flexBasis: '50%',
  },
  taskBlockForRequirements: {
    flexBasis: '50%',
    display: 'flex',
  },
  requirementsSection: {
    marginRight: '15px',
  },
  requirementTextSection: {
    width: '60%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  keywordsPrioritySection: {
    width: '40%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  requirementItem: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'rgb(196, 196, 196)',
    borderRadius: '50px',
    margin: '10px',
    alignItems: 'center',
    padding: '5px 15px',
  },
  editingItem: {
    backgroundColor: 'rgb(171, 177, 236)',
  },
  requirementButton: {
    backgroundColor: 'rgb(76, 79, 107)',
    marginLeft: '10px',
    padding: '5px',
    '&:hover': {
      backgroundColor: 'rgb(50, 50, 80)',
    },
  },
  requirementTitle: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '75%',
  },
  requirementButtons: {
    flexShrink: '0',
  },
  requirementsListTitle: {
    marginLeft: '20px',
  },
  keywordTextField: {
    marginBottom: '10px',
  },
  sectionTitle: {
    textAlign: 'center',
  },
  error: {
    color: 'red',
    margin: '10px 0',
  },
});

function RequirementItem({ requirement, isEditing, classes, dispatch }) {
  const deleteRequirement = () => {
    dispatch(backend.deleteRequirement(requirement.id));
  };

  const cancelEditing = () => {
    dispatch(backend.cancelEditing());
  };

  const editRequirement = () => {
    dispatch(backend.editRequirement(requirement.id));
  };

  return (
    <div 
      className={composeStyles([
        classes.requirementItem,
        isEditing ? classes.editingItem : '',
      ])}
    >
      <div className={classes.requirementTitle}>
        {requirement.requirementText}
      </div>

      <div className={classes.requirementButtons}>
        <IconButton
          onClick={isEditing ? cancelEditing : editRequirement}
          aria-label="edit"
          className={classes.requirementButton}>
          <EditIcon/>
        </IconButton>
        
        <IconButton
          onClick={deleteRequirement}
          aria-label="delete"
          className={classes.requirementButton}
        >
          <DeleteOutlineIcon/>
        </IconButton>
      </div>
    </div>
  );
}

export function ErrorMessage({style, message}) {
  return (
    <div>
      <Typography
        className={style}
      >
        {message}
      </Typography>
    </div>
  );
}

function handleErrors(newValues) {
  const requirementText = newValues.requirementText;

  const errors = newValues.errors;

  if (!requirementText) {
    errors.requirementText = 'Це поле обов\'язкове.';
  } else if (requirementText.length > 200) {
    errors.requirementText = 'Надто довгий текст вимоги! Максимум - 200 символів.';
  }

  const keywordErrorText = 'Надто довге ключове слово! Максимум - 20 символів.';

  if (newValues.keyword1.length > 20) {
    errors.keyword1 = keywordErrorText;
  }

  if (newValues.keyword2.length > 20) {
    errors.keyword2 = keywordErrorText;
  }

  const priority = newValues.priority;

  if (!priority) {
    errors.priority = 'Це поле обов\'язкове.';
  } else {
    const parsed = parseInt(priority);

    if (parsed + '' !== priority || priority.length !== 1) {
      errors.priority = 'Введіть ціле число.';
    } else {
      if (parsed < 1) {
        errors.priority = 'Надто низький пріоритет! Мінімум - 1.';
      } else if (parsed > 5) {
        errors.priority = 'Надто високий пріоритет! Максимум - 5.';
      }
    }
  }
}

let previousEditing = false;
let previousId = null;

export function TaskPlayground(props) {
  const { requirements, isEditing, editingRequirement, taskId, finishCallback, classes, dispatch } = props;

  const [values, setValues] = React.useState({
    requirementText: '',
    keyword1: '',
    keyword2: '',
    priority: '',
    errors: {
      firstTime: true,
    },
  });

  let editingRequirementId = null;

  if (isEditing) {
    editingRequirementId = editingRequirement.id;
  } else {
    previousId = null;
  }

  const override = isEditing && !previousEditing;
  const clear = !isEditing && previousEditing;

  previousEditing = isEditing;

  if (override || previousId !== editingRequirementId) {
    values.requirementText = editingRequirement.requirementText;
    values.keyword1 = editingRequirement.keyword1;
    values.keyword2 = editingRequirement.keyword2;
    values.priority = editingRequirement.priority + '';

    values.errors = {
      firstTime: true,
    };

    setValues(values);
  } else if (clear) {
    values.requirementText = '';
    values.keyword1 = '';
    values.keyword2 = '';
    values.priority = '';

    values.errors = {
      firstTime: true,
    };

    setValues(values);
  }

  previousId = editingRequirementId;

  const handleChangeForm = name => event => {
    const errors = {};

    const newValues = {
      ...values,
      [name]: event.target.value,
      errors,
    };

    handleErrors(newValues);

    setValues(newValues);
  };

  const addRequirement = () => {
    handleErrors(values);

    const errors = values.errors;

    if (!(
      errors.firstTime ||  
      errors.requirementText ||
      errors.keyword1 ||
      errors.keyword2 ||
      errors.priority
    )) {
      const requirement = {
        requirementText: values.requirementText,
        keyword1: values.keyword1,
        keyword2: values.keyword2,
        priority: parseInt(values.priority),
      };

      dispatch(backend.addRequirement(requirement));
    } else {
      const newValues = {
        ...values,
      };

      setValues(newValues);
    }
  };

  const updateRequirement = () => {
    handleErrors(values);

    const errors = values.errors;

    if (!(
      errors.requirementText ||
      errors.keyword1 ||
      errors.keyword2 ||
      errors.priority
    )) {
      const requirement = {
        id: editingRequirement.id,
        requirementText: values.requirementText,
        keyword1: values.keyword1,
        keyword2: values.keyword2,
        priority: parseInt(values.priority),
      };

      dispatch(backend.updateRequirement(requirement));
    } else {
      const newValues = {
        ...values,
      };

      setValues(newValues);
    }
  };

  const finishTask = () => {
    const data = {
      taskId,
      requirements: requirements.map((requirement) => {
        const keywords = [];

        if (requirement.keyword1) {
          keywords.push(requirement.keyword1);
        }

        if (requirement.keyword2) {
          keywords.push(requirement.keyword2);
        }

        return {
          description: requirement.requirementText,
          priority: parseInt(requirement.priority),
          keywords,
        };
      }),
    };

    finishCallback();

    dispatch(backend.finishTask(data));
  };

  return (
    <form
      noValidate
      autoComplete="off"
      className={classes.fullWidthItem}
    >
      <div className={classes.displayFlex}>
        <div className={classes.taskBlockForRequirements}>
          <div className={composeStyles([
            classes.requirementsSection,
            classes.requirementTextSection,
          ])}>
            <div>
              <Typography variant={'subtitle1'}>
                Текст вимоги
              </Typography>

              <TextField
                className={classes.whiteTextField}
                fullWidth
                multiline
                rows={6}
                value={values.requirementText}
                variant="outlined"
                name="requirementText"
                type="text"
                onChange={handleChangeForm('requirementText')}
              />

              {
                values.errors.requirementText ?
                <ErrorMessage
                  message={values.errors.requirementText}
                  style={classes.error}
                /> :
                null
              }
            </div>

            <Button
              variant="contained"
              className={classes.mainButton}
              onClick={isEditing ? updateRequirement : addRequirement}
            >
              {isEditing ? 'Змінити вимогу' : 'Додати вимогу'}
            </Button>
          </div>

          <div className={composeStyles([
            classes.requirementsSection,
            classes.keywordsPrioritySection,
          ])}>
            <div>
              <Typography variant={'subtitle1'} className={classes.sectionTitle}>
                Ключові слова
              </Typography>

              <TextField
                className={composeStyles([
                  classes.whiteTextField,
                  classes.keywordTextField,
                ])}
                value={values.keyword1}
                fullWidth
                variant="outlined"
                name="keyword1"
                type="text"
                onChange={handleChangeForm('keyword1')}
              />

              {
                values.errors.keyword1 ?
                <ErrorMessage
                  message={values.errors.keyword1}
                  style={classes.error}
                /> :
                null
              }

              <br/>

              <TextField
                className={composeStyles([
                  classes.whiteTextField,
                  classes.keywordTextField,
                ])}
                value={values.keyword2}
                fullWidth
                variant="outlined"
                name="keyword2"
                type="text"
                onChange={handleChangeForm('keyword2')}
              />

              {
                values.errors.keyword2 ?
                <ErrorMessage
                  message={values.errors.keyword2}
                  style={classes.error}
                /> :
                null
              }

              <Typography variant={'subtitle1'} className={classes.sectionTitle}>
                Пріоритет
              </Typography>

              <TextField
                className={classes.whiteTextField}
                value={values.priority}
                fullWidth
                variant="outlined"
                name="priority"
                type="number"
                onChange={handleChangeForm('priority')}
              />
              
              {
                values.errors.priority ?
                <ErrorMessage
                  message={values.errors.priority}
                  style={classes.error}
                /> :
                null
              }
            </div>
          
            <Button
              variant="contained"
              className={classes.mainButton}
              onClick={finishTask}
            >
              Завершити спробу
            </Button>
          </div>
        </div>

        <div className={classes.taskBlock}>
          <div className={classes.taskBlockContent}>
            <Typography variant={'subtitle1'} className={classes.requirementsListTitle}>
              Видобуті вимоги
            </Typography>

            {requirements.map((requirement) => (
              <RequirementItem
                key={requirement.id}
                requirement={requirement}
                isEditing={editingRequirementId === requirement.id}
                classes={classes}
                dispatch={dispatch}
              />
            ))}
          </div>
        </div>
      </div>
    </form>
  );
}

export class RequirementsTaskComponents extends Component {
  constructor(props) {
    super(props);

    this.taskStartTime = null;
    this.taskDuration = null;
  }

  componentDidMount() {
    const { dispatch, history, taskId } = this.props;

    if (taskId === null) {
      history.push('/tasks');
    } else {
      this.taskStartTime = Date.now();

      dispatch(backend.clearRequirements());
    }
  }

  onFinished = () => {
    const currentTime = Date.now();

    this.taskDuration = currentTime - this.taskStartTime;
  }

  render() {
    const {
      classes,
      taskId,
      taskText,
      requirements,
      isEditing,
      editingRequirement,
      dispatch,
      result,
    } = this.props;

    if (result !== null) {
      const { grade, title } = result;

      const ms = this.taskDuration;
      const seconds = ~~(ms / 1000);
      const minutes = ~~(seconds / 60);
      const secondsRemainder = seconds - minutes * 60;

      const time = `${minutes.toString().padStart(2, '0')}:${secondsRemainder.toString().padStart(2, '0')}`;

      return (
        <Result
          classes={classes}
          level={grade}
          levelName={null}
          time={time}
          title={title}
        />
      );
    }

    return (
      <div>
        <Typography className={classes.pos}>
          Практичне завдання з видобування вимог
        </Typography>

        <Card className={classes.root}>
          <CardContent className={classes.requirementsTaskContent}>
            <div>
              <Typography variant={'subtitle1'}>
                {taskText}
              </Typography>
            </div>

            <TaskPlayground
              classes={classes}
              dispatch={dispatch}
              requirements={requirements}
              taskId={taskId}
              isEditing={isEditing}
              editingRequirement={editingRequirement}
              finishCallback={this.onFinished}
            />
          </CardContent>
        </Card>
      </div>
    );
  }
}

export function RequirementsTask(props) {
  const {
    requirements,
    isEditing,
    editingRequirement,
    dispatch,
    taskId,
    taskText,
    loading,
    error,
    result,
  } = props;

  const classes = useStyles();
  const history = useHistory();

  return (
    <RequirementsTaskComponents
      dispatch={dispatch}
      taskId={taskId}
      error={error}
      loading={loading}
      taskText={taskText}
      requirements={requirements}
      isEditing={isEditing}
      editingRequirement={editingRequirement}
      classes={classes}
      history={history}
      result={result}
    />  
  );
}

const mapStateToProps = (state) => {
  const {
    requirements,
    isEditing,
    editingRequirement,
    taskText,
    loading,
    error,
    result,
  } = state.requirementsTask;

  const {
    taskId,
  } = state.taskList;

  return {
    requirements,
    isEditing,
    editingRequirement,
    taskId,
    taskText,
    loading,
    error,
    result,
  };
};

export default connect(mapStateToProps)(RequirementsTask);
