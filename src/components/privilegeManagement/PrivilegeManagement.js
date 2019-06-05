import React from 'react';
import { SERVER_URL } from '../../constants.js'
import Topbar from '../Topbar';
// import QueryPrivilegeManagement from './QueryPrivilegeManagement.js';
import TablesPrivilegeManagement from './TablesPrivilegeManagement.js';
import TreeMenu  from 'react-simple-tree-menu'
// import store from '../../store'
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
import Input from '@material-ui/core/Input';
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
          three:[],
          open:'true',
          page: 0,
          rowsPerPage: 10,
          total: 0,
          label:''
        }
        this.getUsergroupFindByParentId = this.getUsergroupFindByParentId.bind(this)
        this.nodeComparison             = this.nodeComparison.bind(this)
    }
    componentDidMount(){
      this.getUsergroupFindByParentId()
    }
    
    //获取用户组树
    getUsergroupFindByParentId(){
      fetch(SERVER_URL + '/usergroup/findByParentId',{
        mode: "cors",
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json,text/plain,*/*'
        },
      })
      .then((response) => response.json())
      .then((responseData) => {
           this.setState({
             three:responseData.data
           })
      })
      .catch(err => console.error(err));
    }
    //点击节点渲染列表
    nodeComparison(e){
       this.setState({
          label:e.label
       })
    }
    render(){
        const { three,label} = this.state
        const { classes ,theme ,history} = this.props;
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
                            <TreeMenu data={three} onClickItem={this.nodeComparison} />
                            {/* <div
                              data={treeData}
                              onClickItem={({ key, label, ...props }) => {
                             
                                this.navigate(props.url); // user defined prop
                              }}
                              debounceTime={125}>
                                {({ search, items }) => (
                                    <>
                                      <Input  onChange={e => search(e.target.value)} placeholder="搜索" />
                                      <div>
                                        {items.map(props => (
                                          <ListItem {...props} />
                                        ))}
                                      </div>
                                    </>
                                )}
                            </div> */}
                            </Drawer>
                        </Hidden>
                    </nav>
                    <main style={{marginLeft:'15.5%',width:'84%' }}>
                    {/* <div  className={classes.toolbarRight} /> */} 
                        <TablesPrivilegeManagement label={label} history={history} three={three}/>
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