import React from 'react';
import SkyLight from 'react-skylight';
import { SERVER_URL } from '../../constants.js';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
require('./styles/CompanyInformation.css')
class EditCompanyInformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            companyInformationId: this.props.companyInformationId
        };
    }
    handleChange = (event) => {
        this.setState(
            { [event.target.name]: event.target.value }
        );
    }
    //提示框 
    handleClose = (event, reason) => {
        this.setState({ open: false });
    };   
    // Save car and close modal form
    handleSubmit = (event) => {
        event.preventDefault();
        var companyInformationVo = {
            companyInformationId: this.state.companyInformationId,
            companyName: this.state.companyName,
            remark: this.state.remark,
            companyInformationId: this.state.companyInformationId
        };
        this.props.editTemplate(companyInformationVo);
        this.refs.editDialog.hide();
        this.setState({
            open: true,
            message: '修改成功'
        })
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
                    companyInformationId: responseData.data.companyInformationId
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
        return (
            <div>
                <SkyLight hideOnOverlayClicked ref="editDialog">
                    <h3>原件管理公司信息-编辑</h3>
                    <form>
                        <div className="OutermostBox">
                            <div className="tow-row" >
                                    <div className="InputBox"> 
                                        <div className="InputBox-text">公司名称:</div>
                                        <TextField className="InputBox-next" placeholder="公司名称" name="companyName"  onChange={this.handleChange} value={this.state.companyName} title="公司名称" />
                                    </div>
                                    <div className="InputBox">
                                        <div className="InputBox-text">备注:</div>
                                        <TextField className="InputBox-next" placeholder="remark"  onChange={this.handleChange} multiline={true} 
                                        name="remark" value={this.state.remark}  />
                                    </div>
                            </div> 
                            <div className="button">
                                <Button className="button-class" variant="outlined" color="secondary" onClick={this.handleSubmit}>保存</Button>
                                <Button className="button-class" variant="outlined" color="secondary" onClick={this.cancelSubmit}>取消</Button>
                            </div>
                        </div>
                    </form>
                </SkyLight>
                <Button variant="contained" color="primary" style={{ 'margin': '10px,0', background: '#286090' }} onClick={this.findById}>修改</Button>
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

export default EditCompanyInformation;