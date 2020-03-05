import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
const Arr=['1', '2','3','4','5'];

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      justifyContent:'center',
      alignItems:'center',
      minHeight:'100vh',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
      '&:hover':{
          backgroundColor:'gray'
      }
    },
  }));

  const renderAvtar=(classes,text,i,fn)=>{
      return(
      <Avatar className={classes.purple} key={i} onClick={()=>fn(i)}>{text}</Avatar>
      )
  };

function AvatarComponent({onselect}){
    const classes = useStyles();
    return(
        <div className={classes.root}>
            Select An Avtar
            {
                Arr.map((item,ind)=>(
                    renderAvtar(classes,item,ind,onselect)
                ))
            }
      
      </div>
    )
}

export default AvatarComponent;