import React from 'react';
import SkyLight from 'react-skylight';
import { SERVER_URL } from '../../constants.js';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import './styles/FollowUpProcess.css'

function stableSort(array) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    return stabilizedThis.map(el => el[0]);
}


class ViewFollowUpProcess extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            procInstId: this.props.procInstId,
            processVoList: [],
            open: false,
            fullWidth: true,
            maxWidth: 'xl',
        };
    }


    //查询详情，并展示详情页
    findByProcInstId = (event) => {
        event.preventDefault();
        var procInstId = this.props.procInstId;
        fetch(SERVER_URL + '/ruprocdef/viewProcess?procInstId=' + procInstId,
            {
                mode: "cors",
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept': '*/*'
                }
            })
            .then(res => res.json())
            .then((responseData) => {
                this.setState({
                    processVoList: responseData.data
                });
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
        const processVoList = this.state.processVoList
        return (
            <div>
                {/* <SkyLight hideOnOverlayClicked ref="editDialog" overlayStyles> */}
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth={this.state.fullWidth}
                    maxWidth={this.state.maxWidth} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title" onClose={this.handleClose}>查看流程记录</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <TableHead>
                                <TableRow >
                                    <TableCell style={{color:'black',fontSize:'16px',borderTop:'2px solid #EDEDED'}} className="TableCell" align="center" padding="none" title="任务节点">任务节点</TableCell>
                                    <TableCell style={{color:'black',fontSize:'16px',borderTop:'2px solid #EDEDED'}} className="TableCell" align="center" padding="none" title="办理人">办理人</TableCell>
                                    <TableCell style={{color:'black',fontSize:'16px',borderTop:'2px solid #EDEDED'}} className="TableCell" align="center" padding="none" title="审批开始时间">审批开始时间</TableCell>
                                    <TableCell style={{color:'black',fontSize:'16px',borderTop:'2px solid #EDEDED'}} className="TableCell" align="center" padding="none" title="审批结束时间">审批结束时间</TableCell>
                                    <TableCell style={{color:'black',fontSize:'16px',borderTop:'2px solid #EDEDED'}} className="TableCell" align="center" padding="none" title="用时">用时</TableCell>
                                    <TableCell style={{color:'black',fontSize:'16px',borderTop:'2px solid #EDEDED'}} className="TableCell" align="center" padding="none" title="审批意见">审批意见</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody >
                                {stableSort(this.state.processVoList)
                                    .map((n,index) => {
                                        // 便利显示列表页面
                                        return (
                                            <TableRow key={index}>
                                                <TableCell className="TableCell" align="center" padding="none" title={n.actName}>{n.actName}</TableCell>
                                                <TableCell className="TableCell" align="center" padding="none" title={n.assignee}>{n.assignee}</TableCell>
                                                <TableCell className="TableCell" align="center" padding="none" title={n.startTime}>{n.startTime}</TableCell>
                                                <TableCell className="TableCell" align="center" padding="none" title={n.endTime}>{n.endTime}</TableCell>
                                                <TableCell className="TableCell" align="center" padding="none" title={n.durationCN}>{n.durationCN}</TableCell>
                                                <TableCell className="TableCell" align="center" padding="none" title={n.text}>{n.text}</TableCell>
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
                <Button variant="contained" color="primary" style={{ 'margin': '10px,0', background: '#31b0d5' }} onClick={this.findByProcInstId}>流程信息</Button>
            </div>

        );
    }   


}

export default ViewFollowUpProcess;