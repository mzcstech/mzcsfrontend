import React from 'react';
import SkyLight from 'react-skylight';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
// import { Input } from 'material-ui-icons';
require('./styles/CompanyInformation.css')
class AddTemplate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            companyName: '',
            remark: '',
            error:false
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
    //多选框事件
    handleChangeCheckbox = name => event => {
        this.setState({ [name]: event.target.checked });
        let checkedbox = this.state.TEMPLATE_CHECKBOX
        if (checkedbox !== null && checkedbox !== "") {
            //判断TEMPLATE_CHECKBOX是否包含当前点击选项，如果包含，则移除，如果不包含，则添加
            if (checkedbox.indexOf(event.target.value) >= 0) {
                checkedbox = checkedbox.replace(event.target.value + ",fh,", "");
                this.setState(
                    { TEMPLATE_CHECKBOX: checkedbox }
                )
            } else {
                checkedbox = checkedbox + event.target.value + ",fh,";
                this.setState(
                    { TEMPLATE_CHECKBOX: checkedbox }
                )
            }
        } else {
            checkedbox = event.target.value + ",fh,"
            this.setState(
                { TEMPLATE_CHECKBOX: checkedbox }
            )
        }
    };
    // Save car and close modal form
    handleSubmit = (event) => {
        if(this.state.companyName != ''){
            var templateVo = {
                companyName: this.state.companyName,
                remark: this.state.remark
            };
            this.props.addTemplate(templateVo);
            this.refs.addDialog.hide();
            this.setState({
                companyName:'',
                remark:'',
                error:false,
                open: true,
                message: '新增成功'
            })
        }else{
            this.setState({
                error:true,
                open: true,
                message: '请填写公司名称'
            })
        }  
    }
    // Cancel and close modal form
    cancelSubmit = (event) => {
        this.setState({
            error:false,
        })
        event.preventDefault();
        this.refs.addDialog.hide();
    }
    render() {
       
        return (
            <div>
                <SkyLight style={{position:'relative'}} hideOnOverlayClicked ref="addDialog">
                    <h3 className="title">原件管理公司信息-新增</h3>
                    <form>
                        <div className="OutermostBox">
                            <div className="tow-row">
                                <div className="InputBox">
                                    <div className="InputBox-text">公司名称:</div>
                                    <TextField className="InputBox-next" placeholder="请输入公司名称"
                                     error={this.state.error}  ref="companyName"  name="companyName" onChange={this.handleChange} />
                                </div>
                                <div className="InputBox">
                                    <div className="InputBox-text">备注:</div>
                                    <TextField className="InputBox-next" placeholder="备注" multiline={true} 
                                        name="remark" onChange={this.handleChange} />
                                </div>
                            </div>
                                <div className="button">
                                    <Button className="button-class" variant="outlined" color="secondary" onClick={this.handleSubmit}>保存</Button>
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