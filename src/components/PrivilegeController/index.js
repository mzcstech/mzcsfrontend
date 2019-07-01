import React from 'react';
import { SERVER_URL } from '../../constants.js'
import Topbar from '../Topbar';
import { connect } from 'react-redux'

import QueryPrivilegeController from './QueryPrivilegeController.js';
import TablesPrivilegeController from './TablesPrivilegeController.js';
import AddPrivilegeController from './AddPrivilegeController.js';
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
import './styles/style.css'


  class PrivilegeController extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          open:'true',
          page: 0,
          rowsPerPage: 10,
          total: 0,
          threekey:'',
          Refresh:'',
          postParentId:''
        }
        this.addTemplate                = this.addTemplate.bind(this)
        this.postParentId               = this.postParentId.bind(this)
    }
    //父组件调用子组件刷新
    onRef = (ref) =>{
      this.child = ref
    }
    // 新增
    addTemplate(params) {
      let companyinformationVo = new FormData()
      if (params) {
        for (let key in params) {
          companyinformationVo.append(key, params[key])
        }
      }    
      fetch(SERVER_URL + '/privilege/insert',
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
          this.getUsergroupFindByParentId()
          this.child.fetchTemplate()
        })
        .catch(err => console.error(err))
    }
    //根据点击查询列表
    postParentId(e){
         console.log(e.key)
         let Neweparent =e.parent
         this.child.fetchTemplate(Neweparent)
    }
    
    //点击节点渲染列表
    render(){

        const { three,threekey,postParentId} = this.state
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
                    {/* <div className="QueryTemplateInto" >
                      <QueryPrivilegeController fetchTemplate={this.fetchTemplate} />
                    </div> */}
                </Toolbar>
               
            </AppBar> 
            
            <AddPrivilegeController three={three}  addTemplate={this.addTemplate}></AddPrivilegeController>
            <div className="nav_box" style={{width:"100%"}}>
                <div style={{marginRight:'0.5%',width:'99%',float:"right",marginLeft:"0.5%" }}>
                    <main>
                        <TablesPrivilegeController  onRef={this.onRef} threekey={threekey} history={history} three={three} 
                        postParentId={postParentId} getUsergroupFindByParentId={this.getUsergroupFindByParentId} />
                    </main>
                </div>
            </div>
        </Paper> 
        )
    } 
}
PrivilegeController.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToprops =(state)=>{
    return{
    }
}
const mapDispathToProps =(dispatch)=>{
    return{

    }
}
export default connect(mapStateToprops,mapDispathToProps)(PrivilegeController);
// export default withStyles( { withTheme: true })(PrivilegeController);