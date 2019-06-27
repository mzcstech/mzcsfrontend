import React from 'react';
import { SERVER_URL } from '../../constants.js'
import Topbar from '../Topbar';
import { connect } from 'react-redux'
import QuerychangeUserPribilege from './QuerychangeUserPribilege.js';
import TableschangeUserPribilege from './TableschangeUserPribilege.js';
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
// import './styles/style.css'


  class changeUserPribilege extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          open:'true',
          page: 0,
          rowsPerPage: 10,
          total: 0,
          threekey:'',
          Refresh:'',
        }
        this.postUserName= this.postUserName.bind(this)
        this.onRef       = this.onRef.bind(this)
    }
    //父组件调用子组件刷新
    onRef = (ref) =>{
      this.child = ref
    } 
    //根据点击查询列表
    postUserName(UserName){
        this.child.fetchTemplate(UserName)
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
                        用户权限移接管理
                    </Typography>
                    <div className="QueryTemplateInto" >
                      <QuerychangeUserPribilege   postUserName={this.postUserName} />
                    </div>
                </Toolbar>
            </AppBar> 
            <div variant="contained" color="primary" style={{ 'margin': '10px' }} ></div>
            <div className="nav_box" style={{width:"100%"}}>
                <div style={{marginRight:'0.5%',width:'99%',float:"right",marginLeft:"0.5%" }}>
                    <main>
                        <TableschangeUserPribilege  onRef={this.onRef} />
                    </main>
                </div>
            </div>
        </Paper> 
        )
    }
}
changeUserPribilege.propTypes = {
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
export default connect(mapStateToprops,mapDispathToProps)(changeUserPribilege);
// export default withStyles( { withTheme: true })(PrivilegeController);