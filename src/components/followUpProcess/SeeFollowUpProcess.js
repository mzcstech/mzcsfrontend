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
            open:false,
        };
    }
    
 
    //查询详情，并展示详情页
    findByProcInstId = (event) => {
        event.preventDefault();
        var procInstId = this.state.procInstId;
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

        this.refs.editDialog.show();
    }
    // Cancel and close modal form
    cancelSubmit = (event) => {
        event.preventDefault();
        this.refs.editDialog.hide();
    }
    render() {   
        const {processVoList} = this.state;
        //alert(this.state.TEMPLATE_CHECKBOX)     
        return (
            <div>
                <SkyLight hideOnOverlayClicked ref="editDialog">
                    <h3>查看流程记录</h3>
                    <Table  aria-labelledby="tableTitle">
            {/* 头列表页组件展示 */}
            <TableHead>
                <TableRow>
                <TableCell className="TableCell" align="center"   padding="none" title="序号">序号</TableCell>
                      <TableCell className="TableCell" align="center"   padding="none"  title="任务节点">任务节点</TableCell>
                      <TableCell className="TableCell" align="center"  padding="none"  title="办理人">办理人</TableCell>
                      <TableCell className="TableCell" align="center"  padding="none"  title="审批开始时间">审批开始时间</TableCell>
                      <TableCell className="TableCell" align="center"  padding="none"  title="审批结束时间">审批结束时间</TableCell>
                      <TableCell className="TableCell" align="center"  padding="none"  title="用时">用时</TableCell>
                      <TableCell className="TableCell" align="center"  padding="none"  title="审批意见">审批意见</TableCell>
                </TableRow>
            </TableHead>
            <TableBody >
              {stableSort(processVoList)
                .map(n => {
                  // 便利显示列表页面
                  return (
                    <TableRow>
                      <TableCell className="TableCell" align="center"   padding="none" title={n.procInstId}>{n.procInstId}</TableCell>
                      <TableCell className="TableCell" align="center"   padding="none"  title={n.actName}>{n.actName}</TableCell>
                      <TableCell className="TableCell" align="center"  padding="none"  title={n.assignee}>{n.assignee}</TableCell>
                      <TableCell className="TableCell" align="center"  padding="none"  title={n.startTime}>{n.startTime}</TableCell>
                      <TableCell className="TableCell" align="center"  padding="none"  title={n.endTime}>{n.endTime}</TableCell>
                      <TableCell className="TableCell" align="center"  padding="none"  title={n.durationCN}>{n.durationCN}</TableCell>
                      <TableCell className="TableCell" align="center"  padding="none"  title={n.text}>{n.text}</TableCell>
                    
                    </TableRow> 
                  );  
                })}
              
            </TableBody>
          </Table>
            </SkyLight>
            <Button  variant="contained" color="primary"  style={{ 'margin':'10px,0',background:'#31b0d5' }} onClick={this.findByProcInstId}>查看</Button>
            <Snackbar
                 style={{ width: 100, color: 'green' }}
                 open={this.state.open}
                 onClose={this.handleClose}
                 autoHideDuration={1500}
                 message={this.state.message}
                 />
        </div>
            
        );
    }
  

} 

export default ViewFollowUpProcess;