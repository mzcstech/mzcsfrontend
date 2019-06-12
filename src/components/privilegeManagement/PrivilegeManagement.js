import React from 'react';
import { SERVER_URL } from '../../constants.js'
import Topbar from '../Topbar';
// import QueryPrivilegeManagement from './QueryPrivilegeManagement.js';
import TablesPrivilegeManagement from './TablesPrivilegeManagement.js';
import AddPrivilegeManagement from './AddPrivilegeManagement.js';

import TreeMenu from 'react-simple-tree-menu'
import 'react-dropdown-tree-select/dist/styles.css'
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
    // boxbotton:{
    //     [theme.breakpoints.up('sm')]: {
    //         width: `calc(100% - ${drawerWidth}px)`,
    //     },
    // },
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
        top:`calc(21.5%)`,
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
          threekey:'',
          Refresh:''
        }
        this.getUsergroupFindByParentId = this.getUsergroupFindByParentId.bind(this)
        this.addTemplate                = this.addTemplate.bind(this)
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
    // 新增
    addTemplate(params) {
      let companyinformationVo = new FormData()
      if (params) {
        for (let key in params) {
          companyinformationVo.append(key, params[key])
        }
      }    
      fetch(SERVER_URL + '/usergroup/save',
        {
          mode: "cors",
          method: 'POST',
          credentials: 'include',
          headers: {
            'Accept': 'application/json,text/plain,*/*'
          },
          body: companyinformationVo
        }
      )
        .then(res => {
          this.child.fetchTemplate()
        })
        .catch(err => console.error(err))
    }
    //父组件调用子组件刷新
    onRef = (ref) =>{
      this.child = ref
    }
    //点击节点渲染列表
    render(){
        const { three,threekey} = this.state
        const { classes ,theme ,history} = this.props;
        const currentPath = this.props.location.pathname; 
        return(
        <Paper>
            <Topbar currentPath={currentPath} />
            <AppBar style={{height:'60px'}} position="static"  color="default" >
                <Toolbar>
                    <Typography style={{paddingLeft:'28px'}} variant="h7" color="inherit" noWrap>
                    权限管理
                    </Typography>
                </Toolbar>
            </AppBar> 
            <AddPrivilegeManagement addTemplate={this.addTemplate}></AddPrivilegeManagement>
            <div className="nav_box" style={{width:"100%"}}>
                <List classNmae="left_boxs" style={{maxWidth:'15%',maxHeight: 600,position: 'relative', overflow: 'auto',
                color:"rgba(0,0,0,.87)",borderTop:' 1px solid rgba(0,0,0,.05)',boxShadow:'0 5px 8px rgba(0,0,0,.15)',marginTop:'24px',marginLeft:"0.5%"}}>
                     <TreeMenu data={three} onClickItem={true}></TreeMenu>
                </List>
                <div style={{marginRight:'0.5%',width:'83.5%',float:"right",marginLeft:"0.5%" }}>
                    <main>
                        <TablesPrivilegeManagement  onRef={this.onRef} threekey={threekey} history={history} three={three}  />
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