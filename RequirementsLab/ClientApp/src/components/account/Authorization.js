import React from "react";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Button } from "@material-ui/core";
import { useHistory } from "react-router";
import { connect } from 'react-redux';
import * as backend from '../../store/authorization';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    borderRadius: '20px',
    backgroundColor: 'rgb(196, 196, 196)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  pos: {
    color: 'rgb(68, 68, 68)',
  },
  middleText: {
    textAlign: 'center',
  },
  taskListContent: {
  },
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  tasksButton: {
    borderRadius: '20px',
    backgroundColor: 'rgb(76, 79, 107)',
    color: 'white',
    alignSelf: 'center',
    margin: '15px 10px 0',
    display: 'block',
    '&:hover, &:focus': {
      backgroundColor: 'rgb(50, 50, 80)',
    },
  },
  whiteTextField: {
    maxWidth: 400,
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
});

export function LoginComponent(props) {
  const { classes, dispatch } = props;

  const [values, setValues] = React.useState({
    login: '',
    password: '',
  });

  const handleChangeForm = name => event => {
    const newValues = {
      ...values,
      [name]: event.target.value,
    };

    setValues(newValues);
  };

  const login = () => {
    const dto = {
      userName: values.login,
      password: values.password,
    };

    dispatch(backend.login(dto));
  };

  const openRegister = () => {
    dispatch(backend.openRegister());
  };

  return (
    <div>
      <Typography className={classes.pos}>Вхід в систему</Typography>

      <Card className={classes.root}>
        <CardContent className={classes.taskListContent}>
          <div>
            <Typography variant={'subtitle1'}>
              Логін
            </Typography>

            <TextField
              className={classes.whiteTextField}
              fullWidth
              variant="outlined"
              name="login"
              type="text"
              onChange={handleChangeForm('login')}
            />
          </div>

          <div>
            <Typography variant={'subtitle1'}>
              Пароль
            </Typography>

            <TextField
              className={classes.whiteTextField}
              fullWidth
              variant="outlined"
              name="password"
              type="password"
              onChange={handleChangeForm('password')}
            />
          </div>

          <div className={classes.buttonsWrapper}>
            <Button
              variant="contained"
              className={classes.tasksButton}
              onClick={login}
            >
              Увійти
            </Button>

            <Button
              variant="contained"
              className={classes.tasksButton}
              onClick={openRegister}
            >
              Перейти до реєстрації
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function RegisterComponent(props) {
  const { classes, dispatch } = props;

  const [values, setValues] = React.useState({
    login: '',
    password: '',
    name: '',
    surname: '',
  });

  const handleChangeForm = name => event => {
    const newValues = {
      ...values,
      [name]: event.target.value,
    };

    setValues(newValues);
  };

  const register = () => {
    const dto = {
      userName: values.login,
      password: values.password,
      name: values.name,
      surname: values.surname,
    };

    dispatch(backend.register(dto));
  };

  const openLogin = () => {
    dispatch(backend.openLogin());
  };

  return (
    <div>
      <Typography className={classes.pos}>Реєстрація</Typography>

      <Card className={classes.root}>
        <CardContent className={classes.taskListContent}>
          <div>
            <Typography variant={'subtitle1'}>
              Логін
            </Typography>

            <TextField
              className={classes.whiteTextField}
              fullWidth
              variant="outlined"
              name="login"
              type="text"
              onChange={handleChangeForm('login')}
            />
          </div>

          <div>
            <Typography variant={'subtitle1'}>
              Пароль
            </Typography>

            <TextField
              className={classes.whiteTextField}
              fullWidth
              variant="outlined"
              name="password"
              type="password"
              onChange={handleChangeForm('password')}
            />
          </div>

          <div>
            <Typography variant={'subtitle1'}>
              Ім'я
            </Typography>

            <TextField
              className={classes.whiteTextField}
              fullWidth
              variant="outlined"
              name="name"
              type="text"
              onChange={handleChangeForm('name')}
            />
          </div>

          <div>
            <Typography variant={'subtitle1'}>
              Прізвище
            </Typography>

            <TextField
              className={classes.whiteTextField}
              fullWidth
              variant="outlined"
              name="surname"
              type="text"
              onChange={handleChangeForm('surname')}
            />
          </div>

          <div className={classes.buttonsWrapper}>
            <Button
              variant="contained"
              className={classes.tasksButton}
              onClick={register}
            >
              Зареєструватись
            </Button>

            <Button
              variant="contained"
              className={classes.tasksButton}
              onClick={openLogin}
            >
              Перейти до входу
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function Authorization({ dispatch, userId, loggedIn, isRegistering, error, loading }) {
  const history = useHistory();
  const classes = useStyles();

  if (loggedIn) {
    history.push('/tasks');

    return null;
  }

  return isRegistering ?
    (
      <RegisterComponent
        classes={classes}
        dispatch={dispatch}
        userId={userId}
        loggedIn={loggedIn}
        loading={loading}
        error={error}
      />
    ) :
    (
      <LoginComponent
        classes={classes}
        dispatch={dispatch}
        userId={userId}
        loggedIn={loggedIn}
        loading={loading}
        error={error}
      />
    );
}

const mapStateToProps = (state) => {
  const {
    userId,
    loggedIn,
    loading,
    error,
    isRegistering,
  } = state.authorization;

  return {
    userId,
    loggedIn,
    loading,
    error,
    isRegistering,
  };
};

export default connect(mapStateToProps)(Authorization);
