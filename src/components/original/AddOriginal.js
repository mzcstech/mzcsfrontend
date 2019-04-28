import React from 'react';
import SkyLight from 'react-skylight';
import { SERVER_URL } from '../../constants.js';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

require('./styles/Original.css')
class AddTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {            
            originalName:'',
            originalHoldStatus:'',
            remark:'',
            open:false,
            companyInformationId:this.props.companyInformationId,
            singleElectionData:[],
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
    // Save car and close modal form
    handleSubmit = (event) => {
        event.preventDefault();
        var original = {
            originalName:this.state.originalName,
            originalHoldStatus:this.state.originalHoldStatus,
            remark:this.state.remark,    
            companyInformationId:this.state. companyInformationId      
        };
        this.props.addTemplate(original);
        this.refs.addDialog.hide();
        this.setState({
            open:true,
            message:'新增成功'
        })
    }
    // Cancel and close modal form
    cancelSubmit = (event) => {
        event.preventDefault();
        this.refs.addDialog.hide();
    }
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
    }
   
    render() {   
        console.log(this.state.singleElectionData)
        // for(var index=0;index<this.state.singleElectionData.length;index++) {
        //     console.log(this.state.singleElectionData[index])
        // }
        
        return (
            <div>
                <SkyLight hideOnOverlayClicked ref="addDialog">
                    <h3 className="title">原件管理-新增</h3>
                    <form>
                        <div className="OutermostBox">                        
                        <div className="tow-row">
                            <div className="InputBox">
                                <div className="InputBox-text">原件名称:</div>
                                <TextField className="InputBox-next" placeholder="原件名称"
                                    name="originalName" onChange={this.handleChange} />
                            </div>            

                        <div className="singleElection">
                            {/* <FormControlLabel className="singleElection-text" control={<FormLabel >单选框:</FormLabel>} /> */}
                            <div className="singleElection-text">持有状态:</div>
                            <div className="singleElection-next">
                                {this.state.singleElectionData.map(item=>{
                                    
                                    return (
                                        <FormControlLabel control={
                                        <Radio
                                            checked={this.state.originalHoldStatus  === item.bianma}
                                            key={item.dictionariesId}
                                            onChange={this.handleChangeRodio}
                                            value={item.bianma}
                                            name={item.bianma}
                                            aria-label={item.name}
                                        />} label={item.name} />
                                        )
                                    })  
                                }
                            </div>
                         </div>                         
                      </div>
                        {/* <FormControlLabel control={<Checkbox checked={this.state.checkedA} onChange={this.handleChangeCheckbox('checkedA')} value="checkedA" />} label="Secondary" />
                        <FormControlLabel control={<Checkbox checked={this.state.checkedB} onChange={this.handleChangeCheckbox('checkedB')} value="checkedB" color="primary" />} label="Primary" />
                        */}
                      
                        <div className="textDomain">    
                            <TextField className="textDomain-class" label="备注" placeholder="备注" multiline={true} rows={2}
                                name="remark" onChange={this.handleChange} />
                        </div>
                        <div className="button">
                            <Button className="button-class"  variant="outlined" color="secondary" onClick={this.handleSubmit}>保存</Button>
                            <Button className="button-class" variant="outlined" color="secondary" onClick={this.cancelSubmit}>取消</Button>
                        </div>    
                </div>
                    </form>
                </SkyLight>
                <div>
                    <Button variant="contained" color="primary" style={{ 'margin': '10px' }} onClick={() => this.refs.addDialog.show()}>新增</Button>
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