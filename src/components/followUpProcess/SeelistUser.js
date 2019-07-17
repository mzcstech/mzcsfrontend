import React from 'react';
import { SERVER_URL } from '../../constants.js';
import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Input from '@material-ui/core/Input';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Select } from 'antd';
import './styles/FollowUpProcess.css'

function stableSort(array) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    return stabilizedThis.map(el => el[0]);
}
const { Option } = Select;
class SeelistUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            procInstId: this.props.procInstId,
            UserList: [], 
            open:false,
            fullWidth: true,
            maxWidth: 'md',
            NewstaffId:'',
            name:''
        };
        this.getlistAllByDepartId = this.getlistAllByDepartId.bind(this)
        this.setStaffIdFordaddyComponent = this.setStaffIdFordaddyComponent.bind(this)
        this.handValueChange             = this.handValueChange.bind(this)
        this.handsearchBth               = this.handsearchBth.bind(this)
    }
    //查询详情，并展示详情页
    getlistAllByDepartId = () => {
        let nameUpVo = new FormData();
        nameUpVo.append("name", this.state.name)
        fetch(SERVER_URL + '/staff/listAllByDepartId?departmentId=' + this.props.Neweparent,
            {
                mode: "cors",
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': '*/*'
                },
            body: nameUpVo
            })
            .then(res => res.json())
            .then((responseData) => {
                console.log(responseData,'responseData')
                this.setState({
                    UserList: responseData.data
                });
            })
            .catch(err =>
                this.setState({ open: true, message: 'Error when 查询详情' })
            )
    }
    handleClose = (event) => {
        this.setOpen(false);
        this.setState({
            name:''
        })
    }
    setOpen = (event) => {  
        this.setState({ open: event }, () => {
        })
    }
    SuperiorComponent(){
        this.getlistAllByDepartId()
        this.setState({ open:true }, () => {
        })
    }
    setStaffIdFordaddyComponent(staffId,name){
        this.setState({
            NewstaffId : staffId
        },()=>{
            this.props.fetchTemplate(this.state.NewstaffId,name)
            this.setState({ open:false }, () => {
            })
        })
    }
    handValueChange(e){
        this.setState({
            name:e.target.value
        })
    }
    handsearchBth(){
        this.getlistAllByDepartId()
    }
    render() { 
        const UserList = this.state.UserList
        return (
            <div>
                {/* <SkyLight hideOnOverlayClicked ref="editDialog" overlayStyles> */}
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth={this.state.fullWidth}
                    maxWidth={this.state.maxWidth} aria-labelledby="form-dialog-title">
                    <div style={{display:'flex',alignItems:'center'}}>
                    <DialogTitle id="form-dialog-title" onClose={this.handleClose}>查看员工信息</DialogTitle>
                    <div  style={{display:'flex',alignItems:'center',position:'absolute',right:'10px'}}> 
                        <Input  className="Input"  value={this.state.name} onChange={this.handValueChange} placeholder="员工查询" />
                        <div className="Separate"></div>
                        <Button onClick={this.handsearchBth} variant="contained" color="primary" >搜索</Button>
                    </div>
                </div>
                    <DialogContent>
                        <DialogContentText>
                            <TableHead>
                                <TableRow >
                                    <TableCell style={{color:'black',fontSize:'16px',borderTop:'2px solid #EDEDED'}} className="TableCell" align="center" padding="none" title="任务节点">人员姓名</TableCell>
                                    <TableCell style={{color:'black',fontSize:'16px',borderTop:'2px solid #EDEDED'}} className="TableCell" align="center" padding="none" title="办理人">查看</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody >
                                {stableSort(UserList)
                                    .map(n => {
                                        // 便利显示列表页面
                                        return (
                                            <TableRow key={n.staffId}>
                                                <TableCell className="TableCell" align="center" padding="none" title={n.actName}>{n.name}</TableCell>
                                                <TableCell className="TableCell" align="center" padding="none">
                                                    <Button onClick={()=>this.setStaffIdFordaddyComponent(n.staffId,n.name)}  style={{ 'margin': '10px,0', background: 'rgb(33, 150, 243)',color:'#ffffff' }}>
                                                        查看人员信息
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}  style={{ 'margin': '10px,0', background: '#303F9F',color:'#ffffff' }}>
                            关闭
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>

        );
    }   


}

export default SeelistUser;