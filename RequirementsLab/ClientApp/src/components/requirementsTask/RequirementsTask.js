import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import * as backend from '../../store/taskList';
import composeStyles from '../../utils/composeStyles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { IconButton } from '@material-ui/core';
import { AppTheme } from '../../utils/colors';

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
  },
  taskBlockForRequirements: {
    flexDirection: '50%',
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
});

function RequirementItem({classes}) {
  return (
    <div className={classes.requirementItem}>
      <div className={classes.requirementTitle}>
        efmkefmfeefefefefef efefefefef ef ef e f efefef eeef
      </div>

      <div className={classes.requirementButtons}>
        <IconButton aria-label="edit" className={classes.requirementButton}>
          <EditIcon/>
        </IconButton>
        
        <IconButton aria-label="delete" className={classes.requirementButton}>
          <DeleteOutlineIcon/>
        </IconButton>
      </div>
    </div>
  );
}

export function TaskPlayground({classes}) {
  const [value, setValue] = React.useState('Controlled');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <form noValidate autoComplete="off" className={classes.fullWidthItem}>
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
                defaultValue="Default Value"
                variant="outlined"
              />
            </div>

            <Button variant="contained" className={classes.mainButton}>Додати вимогу</Button>
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
                fullWidth
                defaultValue="Default Value"
                variant="outlined"
              />

              <br/>

              <TextField
                className={composeStyles([
                  classes.whiteTextField,
                  classes.keywordTextField,
                ])}
                fullWidth
                defaultValue="Default Value"
                variant="outlined"
              />

              <Typography variant={'subtitle1'} className={classes.sectionTitle}>
                Пріоритет
              </Typography>

              <TextField
                className={classes.whiteTextField}
                fullWidth
                defaultValue="Default Value"
                variant="outlined"
              />
            </div>
            
            <Button variant="contained" className={classes.mainButton}>Завершити спробу</Button>
          </div>
        </div>

        <div className={classes.taskBlock}>
          <div className={classes.taskBlockContent}>
            <Typography variant={'subtitle1'} className={classes.requirementsListTitle}>
              Видобуті вимоги
            </Typography>

            {[1, 2, 3, 3, 3, 3].map(() => (
              <RequirementItem classes={classes}/>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
}

export class RequirementsTaskComponents extends Component {
  /*
   componentDidMount() {
    this.props.dispatch(backend.taskList());
  }
  */

  render() {
    const { classes, taskText } = this.props;

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
                />
            </CardContent>
        </Card>
      </div>
    );
  }
}

export default function RequirementsTask({ dispatch, error, loading }) {
  const classes = useStyles();

  return (
    <RequirementsTaskComponents
      dispatch={dispatch}
      taskText={'Програмне забезпечення має надавати можливість записуватися на прийом до лікаря пацієнту. Лікар може прийняти або відхилити бронювання. Пацієнт має можливість обрати сімейного лікаря.'}
      loading={loading}
      error={error}
      classes={classes}
    />  
  );
}
/*
const mapStateToProps = (state) => {
  const { loading, error, taskList } = state.taskList;

  return {
    loading,
    error,
    taskList,
  };
};

export default connect(mapStateToProps)(StartingTest);
*/

