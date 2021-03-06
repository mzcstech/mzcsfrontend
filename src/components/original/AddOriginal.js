import React from 'react';
import SkyLight from 'react-skylight';
import { SERVER_URL } from '../../constants.js';
import OriginalInformation from './OriginalInformation'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import Input from '@material-ui/core/Input';
import Dialog from '@material-ui/core/Dialog';
require('./styles/Original.css')
let addline = 1;
class AddTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {            
            originalName:'',
            originalHoldStatus:'',
            remark:'',
            companyInformationId:this.props.companyInformationId,
            singleElectionData:[],
            error:false,
            userList:[],
            personDoms:[1],
            openDialog:false,
            fullWidth:true,
            maxWidth: 'lg',
            originalInformations:[]
        };
     
        this.savedata    =this.savedata.bind(this)
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
    //打开弹框
       showAdd = (event) => {
        this.setState({
            openDialog:true
        })
    }
    savedata(originalInformations){
        this.setState({
            originalInformations:originalInformations
        },()=>{
           
        })
        
    }
    // Save car and close modal form
    handleSubmit = (event) => {
        event.preventDefault();
            this.props.addTemplate(this.state.originalInformations);
            // this.refs.addDialog.hide();
            this.setState({
                originalInformations:'',
                originalName:'',
                originalHoldStatus:'',
                remark:'',
                open:true,
                message:'新增成功',
                openDialog: false,
             })
        }
    // }
    // Cancel and close modal form
    cancelSubmit = (event) => {
        this.setState({
            openDialog: false,
        })
    }
    
    render() {    
    
        let link2Style = { backgroundColor: '#31b0d5', width:'69px',color: '#ffffff', height: '36px', position:'relative',zIndex:'99' }
        let linkReadonlyStyle = { backgroundColor: '#303F9F', color: '#ffffff', height: '36px',poistion:'relative', }
        return (
            <div>
                <Dialog open={this.state.openDialog} fullWidth={this.state.fullWidth} maxWidth={this.state.maxWidth} ref="editDialog" aria-labelledby="form-dialog-title">
                    <h3 className="title">原件管理-新增</h3>
                    <form>
                        <div className="" style={{margin:'0 auto'}}>
                                {this.state.personDoms.map((item) =>
                                    <OriginalInformation key={item} index={item} personDoms={this.state.personDoms} deleteOriginalInformation={this.deleteOriginalInformation}
                                    savedata={this.savedata} companyInformationId={this.state.companyInformationId}></OriginalInformation>
                                )}
                        </div>
                        <div style={{paddingTop:'40px',width:'100%',textAlign:'center',paddingBottom:'20px'}}>
                            <Button className="Generalbutton-class" variant="outlined" color="secondary" onClick={this.handleSubmit}>保存</Button>
                            <Button className="Generalbutton-class" variant="outlined" color="secondary" onClick={this.cancelSubmit}>取消</Button>
                        </div>
                    </form>
                </Dialog> 
                <div >
                    <Button  variant="contained" color="primary" style={{ 'margin': '10px',zIndex:'99' }} onClick={this.showAdd}>新增</Button>
                    {/* <Button size="small" style={link2Style} variant="text" disabled="true" onClick={this.batchimport} >批量导入</Button> */}
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
export default AddTemplate;