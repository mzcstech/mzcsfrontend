import React from 'react';
import SkyLight from 'react-skylight';
import AddTables from './AddTables'
import { SERVER_URL } from '../../constants.js';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// require('./styles/Original.css')
class AddprivilegeSubordinate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {            
            originalName:'',
            originalHoldStatus:'',
            remark:'',
            open:false,
            openDialog:false,
            companyInformationId:this.props.companyInformationId,
            singleElectionData:[],
            error:false,
            userList:[],
            maxWidth: 'xl',
            usergroupId:this.props.usergroupId,
            addUserid:[],
            message:'',
            emptyArray:true,
        };
        this.handleopen        = this.handleopen.bind(this)
        this.addTemplate       = this.addTemplate.bind(this)
        this.addTemplate       = this.addTemplate.bind(this)
        this.addTemplateData   = this.addTemplateData.bind(this)
        this.handleClose       = this.handleClose.bind(this)
        this.handleCloseDialog = this.handleCloseDialog.bind(this)
     
    }
 //提示框
    handleClose = (event, reason) => {
        this.setState({ open: false });
    };
    handleopen(){
        this.setState({
            openDialog:true,
            emptyArray:true
        })
    }
    handleCloseDialog(){
        this.setState({
            openDialog:false,
            emptyArray:false,
        })
    }
    handleChange = (event) => {
        this.setState(
            { [event.target.name]: event.target.value }
        );
    }    
    handleChangeRodio = (event) => {
        this.setState(
            { originalHoldStatus: event.target.value }
        );
    }      
    //存储新增数据
    addTemplateData(addUserid){
        if(addUserid != undefined){
            this.setState({addUserid:addUserid},()=>{
            })
        }
    }
    // 新增
    addTemplate=()=>{
        let obj=new FormData();
        let Requestaddress = ''
        //对请求地址进行判断
        if(this.props.processUrl === '/usergroup/findUsersByUsergroup?usergroupId='){
            Requestaddress = "/usergroup/addUser2Usergroup"
            obj.append("userIds",this.state.addUserid)
        }else{
            Requestaddress = "/usergroup/addPrivilege2Usergroup"
            obj.append("privileges",this.state.addUserid)
        }

       let write =[]
       for(let i=0;i<this.state.addUserid.length;i++){
            write.push('write')
       }
        obj.append("usergroupId",this.props.usergroupId)
        obj.append("operations",write)
        fetch(SERVER_URL + Requestaddress,
          {
            mode: "cors",
            method: 'POST',
            credentials: 'include',
            headers: {
              'Accept': 'application/json,text/plain,*/*'
            },
            body: obj
          }
        )
        .then((response) => response.json())
        .then((responseData) => { 
            this.setState({ 
                open: true,
                openDialog:false,
                message:'新增成功',
                addUserid:[],
                emptyArray:false,
            });
        this.props.childfetchTemplate()
        })
        .catch(err => console.error(err))
        
      } 
    render() { 
        return (
                 <div>
                        <Dialog open={this.state.openDialog} fullWidth={this.state.fullWidth} 
                            maxWidth={this.state.maxWidth} ref="editDialog" aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">添加新的成员</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    <AddTables usergroupId={this.props.usergroupId}   processUrl={this.props.processUrl} addTemplateData={this.addTemplateData}
                                    emptyArray={this.state.emptyArray}
                                    />
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.addTemplate}  style={{ 'margin': '10px,0', background: '#2196F3',color:'#ffffff' }}>
                                    添加
                                </Button>
                                <Button onClick={this.handleCloseDialog}  style={{ 'margin': '10px,0', background: '#303F9F',color:'#ffffff' }}>
                                    关闭
                                </Button>
                            </DialogActions>
                    </Dialog>
             
                <div>
                    <Button variant="contained" color="primary" style={{ 'margin': '10px' }} onClick={this.handleopen}>新增</Button>
                </div> 
                 <Snackbar 
                    style={{ width: 300, color: 'green' }}
                    open={this.state.open}
                    onClose={this.handleClose}
                    autoHideDuration={1500}
                    message={this.state.message}
                />
            </div>
            
        );
    }
}
export default AddprivilegeSubordinate;