import React from 'react';
import SkyLight from 'react-skylight';
import { SERVER_URL } from '../../constants.js';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import FormLabel from '@material-ui/core/FormLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import Input from '@material-ui/core/Input';

class EditOriginal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {            
            originalName:'',
            originalHoldStatus:'',
            remark:'',
            open:false,
            originalId:this.props.id,
            singleElectionData:[],
            error:false,
            userList:[]
        };
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
    //获取单选框
    componentWillMount(){
        fetch(SERVER_URL + '/dictionaries/findChildlListByBianma?bianma=ORIGINAL_HOLD_STATUS',
        {
          mode: "cors",
          method: 'GET',
          credentials: 'include',
          headers: {
            "Accept": "*/*"
          },
        }
      )
        .then((response) => response.json())
        .then(res =>{
            this.setState({
                singleElectionData:res.data
            })
        })
        .catch(err => console.error(err,'err'))
        this.findByName()
    }
    //获取下拉框
    findByName= () => {
        fetch(SERVER_URL + '/dictionaries/findChildlListByBianma?bianma=ORIGINAL_TYPE',
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
                    userList: responseData.data
                });
            })
            .catch(err =>
                this.setState({ open: true, message: 'Error when 修改详情' })
            )
    }
    // Cancel and close modal form
    findById = (event) => {
        event.preventDefault();
        var originalId = this.state.originalId;
        fetch(SERVER_URL + '/original/findById/' + originalId, 
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
                    originalName: responseData.data.originalName,
                    originalHoldStatus:responseData.data.originalHoldStatus ,
                    remark: responseData.data.remark,
                });
            })
            .catch(err =>
                this.setState({ open: true, message: 'Error when 修改详情' })
            )
         
         this.refs.addDialog.show(); 
    }
    editTemplate = (event) => {
        event.preventDefault();
            var original = {
                originalName: this.state.originalName,
                originalHoldStatus:this.state.originalHoldStatus ,
                remark: this.state.remark,    
                originalId:this.state.originalId      
            };
            this.props.editTemplate(original);
            this.refs.addDialog.hide();
            this.setState({
                open:true,
                message:'修改成功'
             })
        }
  
    cancelSubmit = (event) => {
        event.preventDefault();
        this.refs.addDialog.hide();
    }
    render() {    
        let linkStyletwo = { backgroundColor: '#7087AD', color: '#ffffff', height: '36px' }
        return (
            <div>
                <SkyLight hideOnOverlayClicked ref="addDialog">
                    <h3 className="title">原件管理-修改</h3>
                    <form>
                        <div className="OutermostBox">                         
                        <div className="tow-row">
                            <div className="InputBox">
                                {/* <TextField className="InputBox-next" placeholder="原件名称"
                                  error={this.state.error} value={this.state.originalName}  name="originalName" onChange={this.handleChange} /> */}
                                    <FormLabel className="InputBox-text">原件名称:</FormLabel>
                                    <NativeSelect      
                                        style={{ width:'70%'}}                                  
                                        native
                                        value={this.state.originalName}
                                        onChange={this.handleChange}
                                        name='originalName' 
                                        input={<Input name="originalName" id="originalName" />}
                                        >
                                        <option value="" /> 
                                        {this.state.userList.map(item => {
                                            return (<option value={item.name} >{item.name}</option>)
                                        })
                                        }
                                    </NativeSelect>
                            </div>            

                        <div className="singleElection">
                            {/* <FormControlLabel className="singleElection-text" control={<FormLabel >单选框:</FormLabel>} /> */}
                            <div className="singleElection-text">持有状态:</div>
                            <div className="singleElection-next">
                                   <FormControlLabel control={
                                        <Radio
                                            checked={this.state.originalHoldStatus  === "0"}
                                           
                                            onChange={this.handleChangeRodio}
                                            value="0"
                                            name="0"
                                            aria-label="0"
                                        />} label="无" />
                                         <FormControlLabel control={
                                    <Radio
                                        checked={this.state.originalHoldStatus  === "1"}
                                      
                                        onChange={this.handleChangeRodio}
                                        value="1"
                                        name="1"
                                        aria-label="1"
                                    />} label="在客户处" />
                                        <FormControlLabel control={
                                    <Radio
                                        checked={this.state.originalHoldStatus  === "2"}
                                       
                                        onChange={this.handleChangeRodio}
                                        value="2"
                                        name="2"
                                        aria-label="2"
                                    />} label="在公司内部" />
                            </div>
                         </div>                         
                      </div>
                      <div className="textDomain">    
                         <TextField className="textDomain-class" label="备注" placeholder="备注" multiline={true} rows={2}
                          value={this.state.remark} name="remark" onChange={this.handleChange} />
                      </div>
                      <div className="button">
                         <Button className="button-class"  variant="outlined" color="secondary" onClick={this.editTemplate}>保存</Button>
                         <Button className="button-class"  variant="outlined" color="secondary" onClick={this.cancelSubmit}>取消</Button>
                      </div>    
                      </div>
                    </form>
                </SkyLight>
                <div>
                    <Button style={linkStyletwo} variant="contained" color="primary" onClick={this.findById} >修改</Button>
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

export default EditOriginal;