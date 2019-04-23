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


class ViewCompanyInformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            companyInformationId: this.props.companyInformationId
            
        };
    }    
    //查询详情，并展示详情页
    findById = (event) => {
        event.preventDefault();
        var companyInformationId = this.state.companyInformationId;
        fetch(SERVER_URL + '/companyInformation/findById/' + companyInformationId,
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
                    companyInformationVo: responseData.data,
                    companyName: responseData.data.companyName,
                    remark: responseData.data.remark,
                    companyInformationId:responseData.data.companyInformationId
                });                 
                console.log(this.state.templateVo)
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
        //alert(this.state.TEMPLATE_CHECKBOX)     
        return (
            <div>
                <SkyLight hideOnOverlayClicked ref="editDialog">
                    <h3>原件管理公司信息-查看</h3>
                    <form>
                       <div className="OutermostBox">
                        <div   className="tow-row" >
                          <div className="InputBox">                            
                                <FormLabel className="InputBox-text">公司名称：</FormLabel>
                                <TextField className="InputBox-next" placeholder="公司名称"name="公司名称"  value={this.state.companyName}  title="公司名称"/>
                           </div>
                        </div>                      
                       <div className="textDomain">
                        <FormLabel className="InputBox-text">备注：</FormLabel>
                            <TextField  className="textDomain-class" placeholder="remark" multiline={true} rows={2}
                            name="备注"  value={this.state.remark}/>
                       </div>
                    </div>
                </form>
            </SkyLight>
            <Button  variant="contained" color="primary"  style={{ 'margin':'10px,0',background:'#31b0d5' }} onClick={this.findById}>查看</Button>
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

export default ViewCompanyInformation;