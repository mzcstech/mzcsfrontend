import React from 'react';
import { SERVER_URL } from '../../constants.js'
import Topbar from '../Topbar';
import QueryPrivilegeManagement from './QueryPrivilegeManagement.js';
import LeftMenu from './leftDropMenuPrivilegeManagement.js';
import TablesPrivilegeManagement from './TablesPrivilegeManagement.js';
// import store from '../../store'
import MuiTreeView from 'material-ui-treeview';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import PropTypes from 'prop-types';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import './styles/PrivilegeManagement.css'

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
 
 
  class PrivilegeManagement extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          open:'true',
          data: [],
          page: 0,
          rowsPerPage: 10,
          total: 0,
        }
    }
    componentDidMount(){
      this.fetchTemplate();
    }
      分页
    fetchTemplate = () => {
      let followUpVo = new FormData();
      followUpVo.append("pageNum", this.state.page + 1)
      followUpVo.append("pageSize", this.state.rowsPerPage)
      followUpVo.append("companyName", this.state.valueInput)
      fetch(SERVER_URL + '/usergroup/list', {
        mode: "cors",
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json,text/plain,*/*'
        },
        // body: followUpVo
      })
        .then((response) => response.json())
        .then((responseData) => {
          this.setState({
            data: responseData.data,
          });
        })
        .catch(err => console.error(err));
    }
    //将获取的数据传给store
  
    render(){
      const tree = [
        {
          value: 'Parent A',
          nodes: [{ value: 'Child A' }, { value: 'Child B' }],
        },
        {
          value: 'Parent B',
          nodes: [
            {
              value: 'Child C',
            },
            {
              value: 'Parent C',
              nodes: [
                { value: 'Child D' },
                { value: 'Child E' },
                { value: 'Child F' },
              ],
            },
          ],
        },
      ];
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
                {['All mail', 'Trash', 'Spam'].map((text  , index) => (
                  <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            </div>
        );
        return(
        <Paper className={classes.bottonbox}>
            <Topbar currentPath={currentPath} />
            <AppBar style={{height:'60px'}} position="static"  color="default" >
                <Toolbar>
                    <Typography style={{paddingLeft:'28px'}} variant="h7" color="inherit" noWrap>
                    权限管理
                    </Typography>
                    <div className="QueryTemplateInto" >
                        <QueryPrivilegeManagement/>
                    </div>
                </Toolbar>
            </AppBar>
            <div>
            <div className={classes.boxbotton} >
                    {/* <LeftMenu  /> */}
                    <nav className={classes.drawer} >
                        <Hidden xsDown implementation="css">
                            <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                            >
                             <MuiTreeView tree={tree} className="leftDropMenuPrivilegeManagement" />
                            </Drawer>
                        </Hidden>
                    </nav>
                    <main style={{marginLeft:'15.5%',width:'84%' }}>
                    {/* <div  className={classes.toolbarRight} /> */}
                        <TablesPrivilegeManagement data={this.state.data}  history={this.props.history}/>
                    </main>
                </div>
            </div>
        </Paper>
        )
    }
}
PrivilegeManagement.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(PrivilegeManagement);