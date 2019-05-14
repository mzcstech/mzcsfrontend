import React from 'react';
import { SERVER_URL } from '../../constants.js'
import Topbar from '../Topbar';
import QueryPrivilegeSubordinate from './QueryPrivilegeSubordinate'
import PrivilegeSubordinateTablesHead from './PrivilegeSubordinateTablesHead'
import AddprivilegeSubordinate from './AddprivilegeSubordinate'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText'; 
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import NavigationIcon from '@material-ui/icons/Navigation';
import Fab from '@material-ui/core/Fab';
import './styles/privilegeSubordinate.css'


const drawerWidth ='15%';
const drawerWidth2 ='84%';
const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
    },
    // 新加
    boxbotton:{
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
          width: drawerWidth,
          flexShrink: 0,
        },
    },
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up('sm')]: {
          width: `calc(100% - ${drawerWidth}px)`,
        },
    },
      menuButton: {
        marginRight: 20,
        [theme.breakpoints.up('sm')]: {
          display: 'none',
        },
      },
      toolbar: theme.mixins.toolbar,
      toolbarRight:{
        borderTop:'2px solid #eeeeee',
        
      },
      drawerPaper: {
        maxHeight:`calc(83%)`,
        top:`calc(16%)`,
        width: drawerWidth,
      },
      content: {
        width:drawerWidth2,
        // border:'1px solid red',
        flexGrow: 1,
      },
  });
 
  class privilegeSubordinate extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            open: true,
        };
        this.addTemplate = this.addTemplate.bind(this)
    }
    componentWillMount(){
      this.setState({
        href:window.location.href
      })
    }
    addTemplate(params) {
    let original = new FormData()
    if (params) {
      for (let key in params) {
        original.append(key, params[key])
      }
    }
    fetch(SERVER_URL + '/original/save',
      {
        mode: "cors",
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json,text/plain,*/*'
        },
        body: original
      }
    )
      .then(res => this.fetchTemplate())
      .catch(err => console.error(err))

    }
      //组件御载时触发
    render(){
        let NewUrl =  this.state.href.replace('/PrivilegeSubordinate',"") + '/PrivilegeManagement'
        let linkStyle = { backgroundColor: '#303f9f', color: '#ffffff', height: '36px',marginLeft:'15px' }
        const { classes ,theme  } = this.props;
        const currentPath = this.props.location.pathname;
        const  drawer = (
            <div>
              <div className={classes.toolbar} />
              <Divider />
              <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
              <Divider />
              <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            </div> 
        );
        return(
        <Paper>
            <Topbar currentPath={currentPath} />
            <AppBar style={{height:'60px'}} position="static"    color="default" >
                <Toolbar style={{paddingLeft:'14px'}}>
                <Fab href={NewUrl} size="small" variant="extended" color="primary" aria-label="Add" style={{background:'#2196F3'}}>
                    <NavigationIcon className={classes.extendedIcon} />
                    返回
                </Fab>
                      <div className="QueryFollowUpProcess">
                        <div className="QueryFollowUpProcessInto" >
                            <QueryPrivilegeSubordinate  />
                        </div>
                     </div>
                </Toolbar>
            </AppBar>
            <div className="PrivilegeTemplate">
              <Grid item>
                    <AddprivilegeSubordinate onClick={this.addTemplate} style={linkStyle} variant="text"  >新增</AddprivilegeSubordinate>
              </Grid>
            </div>
            <PrivilegeSubordinateTablesHead/>
        </Paper>
      
        )
    }
}
privilegeSubordinate.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(privilegeSubordinate);