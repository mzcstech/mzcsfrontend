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
            companyInformationId:this.props.companyInformationId,
            singleElectionData:[],
            error:false,
            userList:[],
            maxWidth: 'xl',
            usergroupId:this.props.usergroupId
        };
        this.handleopen = this.handleopen.bind(this)
    }
 //提示框
    handleClose = (event, reason) => {
        this.setState({ open: false });
    };
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
 
    handleopen(){
        this.setState({
            open:true
        })
    }
    componentDidMount(){
        
    }
    render() {    
        return (
            <div>
                  <Dialog open={this.state.open}  fullWidth={this.state.fullWidth}
                    maxWidth={this.state.maxWidth} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title" onClose={this.handleClose}>添加新的成员</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <AddTables usergroupId={this.props.usergroupId}   processUrl={this.props.processUrl}/>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}  style={{ 'margin': '10px,0', background: '#2196F3',color:'#ffffff' }}>
                            添加
                        </Button>
                        <Button onClick={this.handleClose}  style={{ 'margin': '10px,0', background: '#303F9F',color:'#ffffff' }}>
                            关闭
                        </Button>
                    </DialogActions>
                </Dialog>
                <div>
                    <Button variant="contained" color="primary" style={{ 'margin': '10px' }} onClick={this.handleopen}>新增</Button>
                </div> 
                {/* <Snackbar 
                    style={{ width: 300, color: 'green' }}
                    open={this.state.open}
                    onClose={this.handleClose}
                    autoHideDuration={1500}
                    message={this.state.message}
                 /> */}
            </div>
        );
    }
}
export default AddprivilegeSubordinate;