import React from 'react';
import SkyLight from 'react-skylight';
import { SERVER_URL } from '../../constants.js';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import Snackbar from '@material-ui/core/Snackbar';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
function stableSort(array) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    return stabilizedThis.map(el => el[0]);
}  
class OriginalProcessRecords extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            OriginalId:'',
            data:[],
            open: false,
            fullWidth: true,
            maxWidth: '600sm',
        };
    }  
    
    // 保存id
    componentWillMount(){
        // let recvParam;
        // if(this.props.location.query != undefined){
        //     recvParam = this.props.location.query.OriginalId
        //     sessionStorage.setItem('data',recvParam);
        // }else{
        //     recvParam=sessionStorage.getItem('data');
        // }
        // this.setState({OriginalId:recvParam},()=>{
        // var OriginalId = this.props.OriginalId;
      }
      findByProcInstId = (event) => {
        event.preventDefault();
        fetch(SERVER_URL + '/originalprocessrecords/list?originalId=' + '1f34588a6367488682df918ba73b7905',{
            mode: "cors",
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': '*/*'
            }
        })
        .then((response) => response.json())
        .then(res =>{
            console.log(res.data.list)
            this.setState({data:res.data.list},()=>{
            })
        })
        .catch(err =>
            this.setState({ open: true, message: 'Error when 查询详情' })
        )
         this.setOpen(true);
        }
        handleClickOpen = (event) => {
            this.setOpen(true);
        }

        handleClose = (event) => {
            this.setOpen(false);
        }
        setOpen = (event) => {
            this.setState({ open: event }, () => {
            })
        }
    render() {      
        console.log(this.props.originalName)
        const data = this.state.data
        return (
            <div>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth={this.state.fullWidth}
                    maxWidth={this.state.maxWidth} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title" onClose={this.handleClose}>查看流程记录</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                            <TableHead>
                                <TableRow>
                                    <TableCell className="TableCell" align="center" padding="none" title="原件名称">原件名称</TableCell>
                                    <TableCell className="TableCell" align="center" padding="none" title="原件持有人">原件持有人</TableCell>
                                    <TableCell className="TableCell" align="center" padding="none" title="借出时间">借出时间</TableCell>
                                    <TableCell className="TableCell" align="center" padding="none" title="借入人">借入人</TableCell>
                                    <TableCell className="TableCell" align="center" padding="none" title="借入时间">借入时间</TableCell>
                                    <TableCell className="TableCell" align="center" padding="none" title="状态">状态</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody >
                                {stableSort(data)
                                    .map(n => {
                                        // 便利显示列表页面
                                        return (
                                            <TableRow>
                                                <TableCell className="TableCell" align="center" padding="none" title={this.props.originalName}>{this.props.originalName}</TableCell>
                                                <TableCell className="TableCell" align="center" padding="none" title={n.originalFromUsername}>{n.originalFromUsername}</TableCell>
                                                <TableCell className="TableCell" align="center" padding="none" title={n.originalOutTime}>{n.originalOutTime}</TableCell>
                                                <TableCell className="TableCell" align="center" padding="none" title={n.originalOutUsername}>{n.originalOutUsername}</TableCell>
                                                <TableCell className="TableCell" align="center" padding="none" title={n.originalFromTime}>{n.originalFromTime}</TableCell>
                                                <TableCell className="TableCell" align="center" padding="none" title={n.remark}>{n.remark}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
                 <Button variant="contained" color="primary" style={{ 'margin': '10px,0', background: '#31b0d5' }} onClick={this.findByProcInstId}>查看</Button>
             </div>
        );
    }

} 

export default OriginalProcessRecords;