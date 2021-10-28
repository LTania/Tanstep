import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { DataGrid } from '@material-ui/data-grid';
import { VictoryChart, VictoryTheme, VictoryBar } from 'victory';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
    borderRadius: '20px',
    backgroundColor: 'rgb(196, 196, 196)',
  },
  requirement: {
    backgroundColor: '#ccc',
    borderRadius: '20px',
    marginBottom: '12px',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#aaa'
    }
  },
  taskListContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflowY: 'auto',
  },
  flexibleCards: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    overflowY: 'auto',
    width: '100%',
    padding: '10px 0',
    marginBottom: '12px'
  },
  flexibleCard: {
    '&:not(:first-of-type)': {
      marginLeft: '16px'
    },
    marginBottom: '12px'
  },
  poorCard: {
    backgroundColor: '#fff',
    borderRadius: '20px',
    minWidth: '240px',
  },
  subCardHeader: {
    fontFamily: 'Roboto',
    fontSize: '14px',
    lineHeight: '15px',
    marginBottom: '6px'
  },
  startTaskButton: {
    borderRadius: '20px',
    backgroundColor: 'rgb(76, 79, 107)',
    color: 'white',
    alignSelf: 'center',
    '&:hover, &:focus': {
      backgroundColor: 'rgb(50, 50, 80)',
      outline: 'none'
    },
    '&.fixed-width': {
      width: '230px'
    },
    '&.active': {
      backgroundColor: '#ABB1EC',
    }
  },
  hoverableWord: {
    padding: '0 2px',
    borderRadius: '2px',
    '&:hover': {
      backgroundColor: '#0002',
      cursor: 'pointer'
    },
  },
  popup: {
    overflowY:'visible',
    padding: '4px',
    border: '2px solid #000',
    borderRadius: '5px',
    backgroundColor: '#fff',
    '&::before': {
      content: `''`,
      position: 'absolute',
      bottom: '-20px',
      left: '7px',
      borderColor: '#000 transparent transparent transparent',
      borderWidth: '9px',
      borderStyle: 'solid',
    },
    '&::after': {
      content: `''`,
      position: 'absolute',
      bottom: '-18px',
      left: '7px',
      borderColor: '#fff transparent transparent transparent',
      borderWidth: '9px',
      borderStyle: 'solid',
    }
  },
  button: {
    width: '20px',
    height: '20px',
    '&:hover, &:focus': {
      outline: 'none'
    },
  },
  tableCard: {
    maxWidth: '700px'
  },
  pos: {
    color: 'rgb(68, 68, 68)',
  },
  marginBottom: {
    marginBottom: '12px'
  },
  centered: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  dataGrid: {
    '& .MuiDataGrid-window': {
      overflowX: 'hidden !important'
    }
  }
});

export const UserProfile = () => {
  const history = useHistory();
  const classes = useStyles();
  const [profileData, setProfileData] = useState();
  const [activeTab, setActiveTab] = useState('history');
  const [chartType, setChartType] = useState();
  
  const formatDate = (date) => {
    const dateToFormat = new Date(date);
    return `${addPad(dateToFormat.getDate())}.${addPad(dateToFormat.getMonth() + 1)}.${dateToFormat.getFullYear()} \n ${addPad(dateToFormat.getHours())}:${addPad(dateToFormat.getMinutes())}`;
  }

  const addPad = (number) =>{
    return number.toString().padStart(2, '0')
  }

  const columns = [
    { field: 'taskTitle', headerName: 'Назва завдання', width: 200},
    {
      field: 'time', headerName: 'Час проходження',
      width: 200,
      valueGetter: (params) => formatDate(params.getValue('timeStamp'))
    },
    { field: 'grade', headerName: 'Оцінка', width: 200, },
  ];

  useEffect(() => {
    (async () => {
        const response = await fetch(`Profile/profile`);
        const data = await response.json();
        data.allUserTasksResults.map(res => {
          const {id, ...rest} = {...res}
          return rest;
        })
        setProfileData(data);
    })()
  }, []);

  const getDataRows = (data) => {
    return data.map(res => {
      return {
        taskTitle: res.taskTitle,
        timeStamp: res.timeStamp,
        grade: res.grade,
        id: (Math.random()*0xfff)^0
      };
    })
  }

  const getDataForChart = (chartType, chartData) => {
    const taskGroup = chartData.find(data => data.taskTypeId == chartType)?.groupedTasks || [];
    return taskGroup.map(data => {
      return {
        x: data.taskTitle,
        y: data.avgGrade
      }
    });
  };

  const getWidthForChart = (data) => {
    const tasks = data.find(data => data.taskTypeId == chartType)?.groupedTasks || 0;
    return 300 + 20 * tasks.length;
  }
  
  return (
    <>
      <Typography className={classes.pos}>
        Профіль користувача "{profileData && (profileData.currentUser?.firstName + " " + profileData.currentUser?.lastName)}" {'->'} <b>Модуль аналізу вимог до ПЗ</b>
      </Typography>
      <Card className={classes.root}>
        <CardContent className={classes.taskListContent}>
          <div className={classes.flexibleCards}>
            <div className={classes.flexibleCard}>
              <Card className={[classes.poorCard, classes.tableCard].join(' ')}>
                <CardContent className={classes.taskListContent}>
                  <Typography className={classes.pos}>
                    Загальний бал курсу <b>{profileData && profileData.overallGrade}%</b>
                  </Typography>
                  <Typography className={[classes.pos, classes.marginBottom].join(' ')}>
                    Кількість пройдених завдань - <b>{profileData && profileData.finishedTasksCount}/{profileData && profileData.overallTasksCount}</b>
                  </Typography>
                  <Button
                    variant="contained"
                    className={
                      [
                        classes.startTaskButton, 
                        'fixed-width', 
                        classes.marginBottom, 
                        activeTab == 'history' ? 'active' : ''
                      ].join(' ')
                    }
                    onClick={() => setActiveTab('history')}
                  > 
                    Моя історія проходжень
                  </Button>
                  <Button
                    variant="contained"
                    className={
                      [
                        classes.startTaskButton, 
                        'fixed-width', 
                        classes.marginBottom, 
                        activeTab == 'stats' ? 'active' : ''
                      ].join(' ')
                    }
                    onClick={() => setActiveTab('stats')}
                  > 
                    Моя статистика
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className={[classes.flexibleCard].join(' ')}>
            <Card className={[classes.poorCard].join(' ')}>
                <CardContent className={classes.taskListContent}>
                {activeTab == 'history' ? ( 
                  <div style={{ height: 400, width: 650, padding: 20 }}>
                    {profileData && <DataGrid className={classes.dataGrid} rows={getDataRows(profileData.allUserTasksResults)} columns={columns} disableExtendRowFullWidth={true}/>}
                  </div>
                ):(
                  <>
                    <Typography className={[classes.pos, classes.marginBottom].join(' ')}>
                      Середня оцінка по виконанню завдань
                    </Typography>
                    {profileData && profileData.groupedUserTasks.map((taskGroup, index) => (
                      <Button
                        key={index}
                        variant="contained"
                        onClick={()=>setChartType(taskGroup.taskTypeId)} className={[
                          classes.marginBottom, 
                          classes.startTaskButton,
                          taskGroup.taskTypeId == chartType ? 'active' : ''
                        ].join(' ')}>
                        {taskGroup.taskTypeName}
                      </Button>
                    ))}
                    {profileData &&
                    <div className={classes.centered}>
                      <div style={{ 
                          width: profileData ? getWidthForChart(profileData.groupedUserTasks) : '300',
                          overflowX: 'auto'
                        }}>

                        <VictoryChart
                          theme={VictoryTheme.material}
                          domainPadding={{x: 40}}
                          alignment="middle"
                          maxDomain={{ y: 100 }}
                          minDomain={{ y: 0 }}
                          style={{ width: '100%'}}
                          
                        >
                          <VictoryBar
                            style={{ data: { fill: "#aac" } }}
                            data={getDataForChart(chartType, profileData.groupedUserTasks)}
                            labels={({ datum }) => `${Math.round(datum.y * 100)/100}%`}
                          />
                        </VictoryChart>
                      </div>
                    </div>
                    }
                  </>
                )}
                </CardContent>
            </Card>
              
            </div>
          </div>

          <Button
            variant="contained"
            className={classes.startTaskButton}
            onClick={()=>history.push('../')}
          > 
            Ок
          </Button>
        </CardContent>
      </Card>
    </>
  );
}

const mapStateToProps = (state) => {
  const {
    taskId,
  } = state.taskList;
  return {
    taskId
  };
};

export default connect(mapStateToProps)(UserProfile);
