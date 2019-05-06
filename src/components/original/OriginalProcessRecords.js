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
            Snackbaropen:false,
            message:''
        };
    }  
    
    // 保存id
    componentWillMount(){
        // this.setState({
        //     OriginalId:this.props.id
        // })
        fetch(SERVER_URL + '/originalprocessrecords/list?originalId=' + this.props.id,{
            mode: "cors",
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': '*/*'
            }
        })
        .then((response) => response.json())
        .then(res =>{
            this.setState({data:res.data.list},()=>{
            })
        })
        .catch(err =>
            this.setState({ open: true, message: 'Error when 查询详情' })
        )
      }
      findByProcInstId = () => {
        // let OriginalId = this.state.OriginalId
        // event.preventDefault();
        
         if( this.state.data.length > 0){
            this.setOpen(true);
         }else{
            this.setState({ Snackbaropen: true, message: '本条数据无流转记录' })
         }
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
        //提示框的显示判断
        automaticClose = (event, reason) => {
         this.setState({ Snackbaropen: false });
        };
    render() {     
   
        const data = this.state.data
        return (
            <div>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth={this.state.fullWidth}
                    maxWidth={this.state.maxWidth} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title" onClose={this.handleClose}>查看流程记录</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                            <TableHead>
                                <TableRow >
                                    <TableCell style={{color:'black',fontSize:'16px'}} className="TableCellProcessRecordsTop" align="center" padding="none" title="原件名称">原件名称</TableCell>
                                    <TableCell style={{color:'black',fontSize:'16px'}} className="TableCellProcessRecordsTop" align="center" padding="none" title="原件持有人">原件持有人</TableCell>
                                    <TableCell style={{color:'black',fontSize:'16px'}} className="TableCellProcessRecordsTop" align="center" padding="none" title="借出时间">借出时间</TableCell>
                                    <TableCell style={{color:'black',fontSize:'16px'}} className="TableCellProcessRecordsTop" align="center" padding="none" title="借入人">借入人</TableCell>
                                    <TableCell style={{color:'black',fontSize:'16px'}} className="TableCellProcessRecordsTop" align="center" padding="none" title="借入时间">借入时间</TableCell>
                                    <TableCell style={{color:'black',fontSize:'16px'}} className="TableCellProcessRecordsTop" align="center" padding="none" title="状态">状态</TableCell>
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
                    <DialogActions>
                        <Button onClick={this.handleClose}  style={{ 'margin': '10px,0', background: '#303F9F',color:'#ffffff' }}>
                            关闭
                        </Button>
                    </DialogActions>
                </Dialog>
                 <Button variant="contained" color="primary" style={{ 'margin': '10px,0', background: '#31b0d5' }} onClick={this.findByProcInstId}>查看</Button>
                 <Snackbar
              style={{ width: 300, color: 'green' }}
              open={this.state.Snackbaropen}
              onClose={this.automaticClose}
              autoHideDuration={1500}
              message={this.state.message}
          />
             </div>
             
        );
    }

} 

export default OriginalProcessRecords;