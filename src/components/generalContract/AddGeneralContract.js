import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import NativeSelect from '@material-ui/core/NativeSelect';
import { SERVER_URL } from '../../constants.js';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Dialog from '@material-ui/core/Dialog';
// import { Input } from 'material-ui-icons';
require('./styles/GeneralContract.css')
class AddTemplate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            companyName: '',//公司 
            customerId:'',
            registerArea: '',//注册区域    
            contractCreateDate: '2019-06-04',//合同登记日期  
            contractDate: '2019-06-04',//合同签订日期
            hasContract: '',//是否签订合同
            industry: '',//行业
            drawerDepartment: '',//出单人部门
            drawer: '',//出单人
            signPerson: '',//签单人
            sourceOfCustomer: '',//客户来源
            linkman: '',//客户联系人
            contractType: '',//合同类型
            contractPrice: '',//合同价款
            advancesReceived: '',//预收款
            finalPayment: '',//尾款
            deadline: '2019-06-04',//约定结办日期 
            remark: '',//备注
            error: false,
            industryList: [],
            customerList: [],
            registerAreaList: [],
            registerAreaList1: [],
            registerAreaList2: [],
            level1: '',
            level2: '',
            level3: '',
            userList: [],
            openDialog:false,
            maxWidth: 'lg',
            fullWidth:true
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
    getCustomerList() {
        fetch(SERVER_URL + '/customer/listAll',
            {
                mode: "cors",
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': '*/*'
                }
            })
            .then(res => res.json())
            .then((res) => {
                this.setState({
                    customerList: res.data
                });

            })
            .catch(err =>
                this.setState({ open: true, message: 'Error when 获取客户列表' })
            )
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
    //选择公司名称后执行
    handleChangeCompanyInformation = (event) => {
        this.setState(
            { [event.target.name]: event.target.value }
        );
        var customer = {}
        this.state.customerList.forEach((item) => {
            if (item.companyName == event.target.value) {
                customer = item;
            }
        })
        this.getIndustry(customer.insdutry);
        //其它公司信息回显
        if(event.target.value != ""&& customer.registerArea !=null && customer.registerArea !=""){
            this.setState({
                level1: customer.registerArea.split('-')[0],
                level2: customer.registerArea.split('-')[1],
                level3: customer.registerArea.split('-')[2]
            })
        }
        if(event.target.value != ''){
            this.setState(
                {  // industry:customer.insdutry,//行业                
                    linkman: customer.linkman,
                    customerId:customer.customerId
                }, () => {
                    this.getRegisterAreaList();
    
                });
        }else{
            this.setState({
                companyName:'',
                customerId:'',
                level1:'',
                level2:'',
                level3:'',
                industry:'',
                drawerDepartment:'',
                drawer:'',
                signPerson:'',
                sourceOfCustomer:'',
                linkman:'',
                contractType:'',
                contractPrice:'',
                advancesReceived:'',
                finalPayment:'',
                remark:'',
            })
        }
    }
    getIndustry = (event) => {
        this.state.industryList.forEach(element => {
            console.log(element.dictionariesId + "-----" + event)
            if (element.dictionariesId == event) {
                this.setState(
                    { industry: element.name })
            }
        });
    }
    //从数据字典中获取
    findIndustryList = (event) => {
        fetch(SERVER_URL + '/dictionaries/findChildlTreeListByBianma?bianma=0',
            {
                mode: "cors",
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept': '*/*'
                }
            })
            .then(res => res.json())
            .then((res) => {
                this.setState({
                    industryList: res.data.childTreeList
                });
            })
            .catch(err =>
                this.setState({ open: true, message: 'Error when 获取行业列表' })
            )
    }
    // Save car and close modal form
    handleSubmit = (event) => {
        if (this.state.companyName != '') {
            var templateVo = {
                companyName: this.state.companyName,//公司
                customerId:this.state.customerId,
                registerArea: this.state.level1+'-'+this.state.level2+'-'+this.state.level3,//注册区域    
                contractCreateDate: this.state.contractCreateDate,//合同登记日期  
                contractDate: this.state.contractDate,//合同签订日期
                hasContract: this.state.hasContract,//是否签订合同
                industry: this.state.industry,//行业
                drawerDepartment: this.state.drawerDepartment,//出单人部门
                drawer: this.state.drawer,//出单人
                signPerson: this.state.signPerson,//签单人
                sourceOfCustomer: this.state.sourceOfCustomer,//客户来源
                linkman: this.state.linkman,//客户联系人
                contractType: this.state.contractType,//合同类型               
                contractPrice: this.state.contractPrice,//合同价款
                advancesReceived: this.state.advancesReceived,//预收款
                finalPayment: this.state.finalPayment,//尾款
                deadline: this.state.deadline,//约定结办日期
                remark: this.state.remark//备注
            };
            this.props.addTemplate(templateVo);
            this.setState({
                companyName: '',
                remark: '',
                openDialog: false,
                open: true,
                message: '新增成功'
            })
        } else {
            this.setState({
                error: true,
                open: true,
                message: '请填写公司名称'
            })
        }
    }
    findAllUser(params) {
        let user = new FormData()
        if (params) {
            for (let key in params) {
                user.append(key, params[key])
            }
        }
        fetch(SERVER_URL + '/user/listAllAndSelf',
            {
                mode: "cors",
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': '*/*'
                },
                body: user
            })
            .then(res => res.json())
            .then((res) => {
                this.setState({
                    userList: res.data
                });
            })
            .catch(err =>
                this.setState({ open: true, message: 'Error when 获取User列表' })
            )
    }
    //回显地址下拉
    getRegisterAreaList = () => {
        let level1 = this.state.level1;
        let level2 = this.state.level2;
        if (level1 != '') {
            let registerAreaList = this.state.registerAreaList;
            var registerList1 = [];
            registerAreaList.forEach(reg => {
                if (reg.name == level1) {
                    registerList1 = reg.childTreeList
                }
            });
            this.setState({ registerAreaList1: registerList1 }, () => {
                if (level2 != '') {
                    let registerAreaList1 = this.state.registerAreaList1;
                    let registerList2 = [];
                    registerAreaList1.forEach(reg => {
                        if (reg.name == level2) {
                            registerList2 = reg.childTreeList
                        }
                    });
                    this.setState({ registerAreaList2: registerList2 });
                }
            });
        }

    }
    getRegisterArea() {
        fetch(SERVER_URL + '/dictionaries/findChildlTreeListByBianma?bianma=003',
            {
                mode: "cors",
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept': '*/*'
                }
            })
            .then(res => res.json())
            .then((res) => {
                this.setState({
                    registerAreaList: res.data.childTreeList
                });
                this.getRegisterAreaList();
            })
            .catch(err =>
                this.setState({ open: true, message: 'Error when 获取注册区域列表' })
            )
    }
    handleChangeRegisterArea = (event) => {
        this.setState(
            { [event.target.name]: event.target.value }
        );
        let registerAreaList = this.state.registerAreaList;
        registerAreaList.forEach(reg => {
            if (reg.name == event.target.value) {
                this.setState({
                    registerAreaList1: reg.childTreeList
                })
            }
        });
    }
    handleChangeRegisterArea1 = (event) => {
        this.setState(
            { [event.target.name]: event.target.value }
        );
        let registerAreaList1 = this.state.registerAreaList1;
        registerAreaList1.forEach(reg => {
            if (reg.name == event.target.value) {
                this.setState({
                    registerAreaList2: reg.childTreeList
                })
            }
        });
    }
    showAdd = (event) => {
        this.setState({
            openDialog:true
        })
        this.getCustomerList();
        this.getRegisterArea();
        this.findAllUser();
        this.findIndustryList();
        // this.refs.addDialog.show();
    }
    // Cancel and close modal form
    cancelSubmit = (event) => {
        this.setState({
            error: false,
            openDialog:false,
            companyName:'',
            level1:'',
            level2:'',
            level3:'',
            industry:'',
            drawerDepartment:'',
            drawer:'',
            signPerson:'',
            sourceOfCustomer:'',
            linkman:'',
            contractType:'',
            contractPrice:'',
            advancesReceived:'',
            finalPayment:'',
            remark:'',
        })
        event.preventDefault();
    }
    render() {
        let registerAreaList = this.state.registerAreaList;
        let registerAreaList1 = this.state.registerAreaList1;
        let registerAreaList2 = this.state.registerAreaList2;
        let userList = this.state.userList;
        return (
            <div>
                <Dialog open={this.state.openDialog} fullWidth={this.state.fullWidth} 
                            maxWidth={this.state.maxWidth} ref="editDialog" aria-labelledby="form-dialog-title">
                {/* <SkyLight  style={{ position: 'relative' }} hideOnOverlayClicked ref="addDialog"> */}
                    <h3 className="title">合同-新增</h3>
                    <form>
                        <div className="OutermostBox">
                            <div className="tow-row">
                                <div className="InputBox">
                                    <div className="GeneralInputBox-text">公司名称:</div>
                                    <NativeSelect
                                        className="GeneralInputBox-next"
                                        native
                                        value={this.state.companyName}
                                        onChange={this.handleChangeCompanyInformation}
                                        name='companyName'
                                    >
                                        <option value="" />
                                        {this.state.customerList.map(item => {
                                            return (<option value={item.companyName}>{item.companyName}</option>)
                                        })
                                        }
                                    </NativeSelect >
                                </div>
                                <div className="InputBox">
                                    <div className="GeneralInputBox-text">注册区域:</div>
                                    <div className="GeneralInputBox-next">
                                        <NativeSelect
                                            style={{width:"30%",marginRight:'3.33%'}}
                                            native
                                            value={this.state.level1}
                                            onChange={this.handleChangeRegisterArea}
                                            name='level1'
                                        >
                                            <option value="" />
                                            {registerAreaList.map(item => {
                                                return (<option value={item.binama}>{item.name}</option>)
                                            })}
                                        </NativeSelect >
                                        <NativeSelect
                                            style={{width:"30%",marginRight:'3.33%'}}
                                            native
                                            value={this.state.level2}
                                            onChange={this.handleChangeRegisterArea1}
                                            name='level2'
                                        >
                                            <option value="" />
                                            {registerAreaList1.map(item => {
                                                return (<option value={item.binama}>{item.name}</option>)
                                            })}
                                        </NativeSelect >
                                        <NativeSelect
                                            style={{width:"30%"}}
                                            native
                                            value={this.state.level3}
                                            onChange={this.handleChange}
                                            name='level3'
                                        >
                                            <option value="" />
                                            {registerAreaList2.map(item => {
                                                return (<option value={item.binama}>{item.name}</option>)
                                            })}
                                        </NativeSelect >
                                    </div>
                                </div>
                            </div>
                            <div className="tow-row">
                                <div className="InputBox">
                                    <div className="GeneralInputBox-text">合同签订日期:</div>
                                    <TextField
                                        className="GeneralInputBox-next"
                                        id="contractDate"
                                        name="contractDate"
                                        onChange={this.handleChange}
                                        type="date"
                                        defaultValue="2019-06-04"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>
                                <div className="InputBox">
                                    <div className="GeneralInputBox-text">合同登记日期 :</div>
                                    <TextField
                                        className="GeneralInputBox-next"
                                        id="contractCreateDate"
                                        name="contractCreateDate"
                                        onChange={this.handleChange}
                                        type="date"
                                        defaultValue="2019-06-04"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="tow-row">
                                <div className="InputBox">
                                    <div className="GeneralInputBox-text">是否签订合同:</div>
                                        <div className="GeneralInputBox-next">
                                            <FormControlLabel control={
                                                <Radio
                                                    checked={this.state.hasContract === '是'}
                                                    onChange={this.handleChange}
                                                    value="是"
                                                    name="hasContract"
                                                    aria-label="是"
                                                />} label="是" />
                                            <FormControlLabel control={
                                                <Radio
                                                    checked={this.state.hasContract === '否'}
                                                    onChange={this.handleChange}
                                                    value="否"
                                                    name="hasContract"
                                                    aria-label="否"
                                                />} label="否" />
                                        </div>
                                    </div>
                                <div className="InputBox">
                                    <div className="GeneralInputBox-text">行业:</div>
                                    <NativeSelect
                                        className="GeneralInputBox-next"
                                        native
                                        value={this.state.industry}
                                        onChange={this.handleChange}
                                        name='industry'
                                    >
                                        <option value="" />
                                        {this.state.industryList.map(item => {
                                            return (<option value={item.name}>{item.name}</option>)
                                        })
                                        }
                                    </NativeSelect >
                                </div>
                            </div>
                            <div className="tow-row">
                                <div className="InputBox">
                                    <div className="GeneralInputBox-text">出单人部门:</div>
                                    <TextField className="GeneralInputBox-next"
                                        error={this.state.error} value={this.state.drawerDepartment} ref="drawerDepartment" name="drawerDepartment" onChange={this.handleChange} />
                                </div>
                                <div className="InputBox">
                                    <div className="GeneralInputBox-text">出单人:</div>
                                    <NativeSelect
                                        className="GeneralInputBox-next"
                                        native
                                        value={this.state.drawer}
                                        onChange={this.handleChange}
                                        name='drawer'
                                    >
                                        <option value="" />
                                        {userList.map(item => {
                                            return (<option value={item.username}>{item.name}</option>)
                                        })}
                                    </NativeSelect >
                                </div>
                            </div>
                            <div className="tow-row">
                                <div className="InputBox">
                                    <div className="GeneralInputBox-text">签单人:</div>
                                    <NativeSelect
                                        style={{padding:'0'}}
                                        className="GeneralInputBox-next"
                                        native
                                        value={this.state.signPerson}
                                        onChange={this.handleChange}
                                        name='signPerson'
                                    >
                                        <option value="" />
                                        {userList.map(item => {
                                            return (<option value={item.username}>{item.name}</option>)
                                        })}
                                    </NativeSelect >
                                </div>
                                <div className="InputBox">
                                    <div className="GeneralInputBox-text">客户来源:</div>
                                    <TextField className="GeneralInputBox-next" value={this.state.sourceOfCustomer} multiline={true}
                                        name="sourceOfCustomer" onChange={this.handleChange} />
                                </div>
                            </div>
                            <div className="tow-row">
                                <div className="InputBox">
                                    <div className="GeneralInputBox-text">客户联系人:</div>
                                    <TextField className="GeneralInputBox-next"
                                        error={this.state.error} value={this.state.linkman} ref="linkman" name="linkman" onChange={this.handleChange} />
                                </div>
                                <div className="InputBox">
                                    <div className="GeneralInputBox-text">合同类型:</div>
                                    <TextField className="GeneralInputBox-next" value={this.state.contractType} multiline={true}
                                        name="contractType" onChange={this.handleChange} />
                                </div>
                            </div>
                            <div className="tow-row">
                                <div className="InputBox">
                                    <div className="GeneralInputBox-text">合同价款:</div>
                                    <TextField className="GeneralInputBox-next"
                                        error={this.state.error} value={this.state.contractPrice} ref="contractPrice" name="contractPrice" onChange={this.handleChange} />
                                </div>
                                <div className="InputBox">
                                    <div className="GeneralInputBox-text">预收款:</div>
                                    <TextField className="GeneralInputBox-next" value={this.state.advancesReceived} multiline={true}
                                        name="advancesReceived" onChange={this.handleChange} />
                                </div>
                            </div>
                            <div className="tow-row">
                                <div className="InputBox">
                                    <div className="GeneralInputBox-text">尾款:</div>
                                    <TextField className="GeneralInputBox-next"
                                        error={this.state.error} value={this.state.finalPayment} ref="finalPayment" name="finalPayment" onChange={this.handleChange} />
                                </div>
                                <div className="InputBox">
                                    <div className="GeneralInputBox-text">约定结办日期:</div>
                                    <TextField
                                        className="GeneralInputBox-next"
                                        id="deadline"
                                        name="deadline"
                                        onChange={this.handleChange}
                                        type="date"
                                        defaultValue="2019-06-04"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="tow-row">
                                <div className="InputBox">
                                    <div className="GeneralInputBox-text">备注:</div>
                                    <TextField className="GeneralInputBox-next"
                                        error={this.state.error} value={this.state.remark} ref="remark" name="remark" onChange={this.handleChange} />
                                </div>
                                <div className="InputBox"></div>
                            </div>

                            <div className="Generalbutton">
                                <Button className="Generalbutton-class" variant="outlined" color="secondary" onClick={this.handleSubmit}>保存</Button>
                                <Button className="Generalbutton-class" variant="outlined" color="secondary" onClick={this.cancelSubmit}>取消</Button>
                            </div>
                        </div>
                    </form>
                    </Dialog>
                {/* </SkyLight> */}
                <div>
                    <Button variant="contained" color="primary" style={{ 'margin': '10px' }} onClick={this.showAdd}>新增</Button>
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