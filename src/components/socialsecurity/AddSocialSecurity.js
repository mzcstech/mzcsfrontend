import React from 'react';
import SkyLight from 'react-skylight';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import NativeSelect from '@material-ui/core/NativeSelect';
import { SERVER_URL } from '../../constants.js';
// import { Input } from 'material-ui-icons';
require('./styles/SocialSecurity.css')
class AddTemplate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isNewCustomer: '',//是否是新客户
            companyName: '',
            customer: '',
            customerPhone: '',//客户联系方式
            registeredArea: '',//注册区域
            address: '',//注册地址
            fees: '',//收费金额
            saler: '',//签单人
            buyStartMonth: '',//购买起始月
            isCreditCard: '',//是否告知客户首次需要刷卡购买
            openAccount: '',//银行是否开户
            backAccount: '',//开户账号
            buyType: '',//购买类型（首次购买，非首次购买）
            personalInformation: '',//购买人员信息
            isLegalPersonBuy: '',//法人是否已参保
            legalPersonCertificate: '',//法人参保证明（已提供，未提供）
            isClerkStopBuyInsurance: '',//参保人员是否已停保（是，否）
            identityCardNumber: '',//已收集身份证原件数量
            error: false,
            customerList: [],
            registerAreaList: [],
            registerAreaList1: [],
            registerAreaList2: [],
            level1: '',
            level2: '',
            level3: '',
            userList: []

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
    findAllUser(params) {
        let user = new FormData()
        if (params) {
            for (let key in params) {
                user.append(key, params[key])
            }
        }
        fetch(SERVER_URL + '/user/listAll',
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
                console.log(res.data)
                this.setState({
                    registerAreaList: res.data.childTreeList
                });

            })
            .catch(err =>
                this.setState({ open: true, message: 'Error when 获取注册区域列表' })
            )
    }
    showAdd = (event) => {
        this.getCustomerList();
        this.getRegisterArea();
        this.findAllUser();
        this.refs.addDialog.show();
    }
    // Save car and close modal form
    handleSubmit = (event) => {
        var templateVo = {}
        if (this.state.level1 != '' && this.state.level2 != '' && this.state.level3 != '') {
            templateVo.registeredArea = this.state.level1 + "-" + this.state.level2 + "-" + this.state.level3
        } else {
            this.setState({
                error: true,
                open: true,
                message: '请填写注册区域'
            })
        }
        if (this.state.companyName != '') {
            templateVo = {
                companyName: this.state.companyName,
                isNewCustomer: this.state.isNewCustomer,
                customer: this.state.customer,
                customerPhone: this.state.customerPhone,//客户联系方式                
                address: this.state.address,//注册地址
                fees: this.state.fees,//收费金额
                saler: this.state.saler,//签单人
                buyStartMonth: this.state.buyStartMonth,//购买起始月
                isCreditCard: this.state.isCreditCard,//是否告知客户首次需要刷卡购买
                openAccount: this.state.openAccount,//银行是否开户
                backAccount: this.state.backAccount,//开户账号
                buyType: this.state.buyType,//购买类型（首次购买，非首次购买）
                personalInformation: this.state.personalInformation,//购买人员信息
                isLegalPersonBuy: this.state.isLegalPersonBuy,//法人是否已参保
                legalPersonCertificate: this.state.legalPersonCertificate,//法人参保证明（已提供，未提供）
                isClerkStopBuyInsurance: this.state.isClerkStopBuyInsurance,//参保人员是否已停保（是，否）
                identityCardNumber: this.state.identityCardNumber
            };
            this.props.addTemplate(templateVo);
            this.refs.addDialog.hide();
            this.setState({
                companyName: '',
                remark: '',
                error: false,
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
    // Cancel and close modal form
    cancelSubmit = (event) => {
        this.setState({
            error: false,
        })
        event.preventDefault();
        this.refs.addDialog.hide();
    }
    render() {
        let registerAreaList = this.state.registerAreaList;
        let registerAreaList1 = this.state.registerAreaList1;
        let registerAreaList2 = this.state.registerAreaList2;
        let userList = this.state.userList;

        return (

            <div>
                <SkyLight style={{ position: 'relative' }} hideOnOverlayClicked ref="addDialog">
                    <h3 className="title">社保工单-新增</h3>
                    <form>
                        <div className="OutermostBox">
                            <div className="tow-row">
                                <div className="InputBox">
                                    <div className="InputBox-text">是否是新客户:</div>
                                    <FormControlLabel control={
                                        <Radio
                                            checked={this.state.isNewCustomer === '是'}
                                            onChange={this.handleChange}
                                            value="是"
                                            name="isNewCustomer"
                                            aria-label="是"
                                        />} label="是" />
                                    <FormControlLabel control={
                                        <Radio
                                            checked={this.state.isNewCustomer === '否'}
                                            onChange={this.handleChange}
                                            value="否"
                                            name="isNewCustomer"
                                            aria-label="否"
                                        />} label="否" />

                                </div>
                                <div className="InputBox">
                                    <div className="InputBox-text">公司名称:</div>
                                    {this.state.isNewCustomer == "否" ? (
                                        <NativeSelect
                                            style={{ width: '70%' }}
                                            native
                                            value={this.state.companyName}
                                            onChange={this.handleChange}
                                            name='companyName'
                                        >
                                            <option value="" />
                                            {this.state.customerList.map(item => {
                                                return (<option value={item.companyName}>{item.companyName}</option>)
                                            })
                                            }
                                        </NativeSelect >
                                    ) : (
                                            <TextField className="InputBox-next" placeholder="请输入新客户公司名称"
                                                error={this.state.error} value={this.state.companyName} ref="companyName" name="companyName" onChange={this.handleChange} />
                                        )}

                                </div>

                            </div>
                            <div className="tow-row">
                                <div className="InputBox">
                                    <div className="InputBox-text">注册区域:</div>
                                    <NativeSelect
                                        style={{ width: '70%' }}
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
                                        style={{ width: '70%' }}
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
                                        style={{ width: '70%' }}
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
                                <div className="InputBox">
                                    <div className="InputBox-text">客户联系方式:</div>
                                    <TextField className="InputBox-next" placeholder="请输入客户联系方式"
                                        error={this.state.error} value={this.state.customerPhone} ref="customerPhone" name="customerPhone" onChange={this.handleChange} />
                                </div>
                            </div>
                            <div className="tow-row">
                                <div className="InputBox">
                                    <div className="InputBox-text">公司地址:</div>
                                    <TextField className="InputBox-next" placeholder="请输入公司地址"
                                        error={this.state.error} value={this.state.address} ref="address" name="address" onChange={this.handleChange} />
                                </div>
                                <div className="InputBox">
                                    <div className="InputBox-text">收费金额:</div>
                                    <TextField className="InputBox-next" placeholder="请输入收费金额"
                                        error={this.state.error} value={this.state.fees} ref="fees" name="fees" onChange={this.handleChange} />
                                </div>
                            </div>
                            <div className="tow-row">
                                <div className="InputBox">
                                    <div className="InputBox-text">签单人:</div>
                                    <NativeSelect
                                        style={{ width: '70%' }}
                                        native
                                        value={this.state.saler}
                                        onChange={this.handleChange}
                                        name='saler'
                                    >
                                        <option value="" />
                                        {userList.map(item => {
                                            return (<option value={item.username}>{item.name}</option>)
                                        })}
                                    </NativeSelect >

                                </div>
                                <div className="InputBox">
                                    <div className="InputBox-text">购买起始月:</div>
                                    <TextField
                                        id="buyStartMonth"
                                        name="buyStartMonth"
                                        onChange={this.handleChange}
                                        type="month"
                                        defaultValue="2019-05"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="tow-row">
                                <div className="InputBox">
                                    <div className="InputBox-text">告知客户首次需要刷卡:</div>
                                    <FormControlLabel control={
                                        <Radio
                                            checked={this.state.isCreditCard === '是'}
                                            onChange={this.handleChange}
                                            value="是"
                                            name="isCreditCard"
                                            aria-label="是"
                                        />} label="是" />
                                    <FormControlLabel control={
                                        <Radio
                                            checked={this.state.isCreditCard === '否'}
                                            onChange={this.handleChange}
                                            value="否"
                                            name="isCreditCard"
                                            aria-label="否"
                                        />} label="否" />
                                </div>
                                <div className="InputBox">
                                    <div className="InputBox-text">银行是否开户:</div>
                                    <FormControlLabel control={
                                        <Radio
                                            checked={this.state.openAccount === '是'}
                                            onChange={this.handleChange}
                                            value="是"
                                            name="openAccount"
                                            aria-label="是"
                                        />} label="是" />
                                    <FormControlLabel control={
                                        <Radio
                                            checked={this.state.openAccount === '否'}
                                            onChange={this.handleChange}
                                            value="否"
                                            name="openAccount"
                                            aria-label="否"
                                        />} label="否" />
                                </div>
                            </div>
                            <div className="tow-row">
                                <div className="InputBox">
                                    <div className="InputBox-text">购买类型:</div>
                                    <FormControlLabel control={
                                        <Radio
                                            checked={this.state.openAccount === '首次购买'}
                                            onChange={this.handleChange}
                                            value="首次购买"
                                            name="openAccount"
                                            aria-label="首次购买"
                                        />} label="首次购买" />
                                    <FormControlLabel control={
                                        <Radio
                                            checked={this.state.openAccount === '非首次购买'}
                                            onChange={this.handleChange}
                                            value="非首次购买"
                                            name="openAccount"
                                            aria-label="非首次购买"
                                        />} label="非首次购买" />
                                </div>
                                <div className="InputBox">
                                    <div className="InputBox-text">开户账号:</div>
                                    <TextField className="InputBox-next" placeholder="请输入开户账号"
                                        error={this.state.error} value={this.state.backAccount} ref="backAccount" name="backAccount" onChange={this.handleChange} />
                                </div>
                            </div>
                            <div className="tow-row">
                                <div className="InputBox">
                                    <Button variant="contained" color="primary" style={{ 'margin': '10px' }}  >添加人员</Button>
                                </div>
                            </div>
                            <div className="tow-row">
                                <div className="InputBox">
                                    {/* {this.state.lists.map((data) => {
                                        console.log(data);
                                        return <List key={data.id} index={data.id} info={data.value} delete={this.delete} />
                                    })} */}


                                </div>
                            </div>
                            <div className="tow-row">
                                <div className="InputBox">
                                    <div className="InputBox-text">法人已参保:</div>
                                    <FormControlLabel control={
                                        <Radio
                                            checked={this.state.isLegalPersonBuy === '是'}
                                            onChange={this.handleChange}
                                            value="是"
                                            name="isLegalPersonBuy"
                                            aria-label="是"
                                        />} label="是" />
                                    <FormControlLabel control={
                                        <Radio
                                            checked={this.state.isLegalPersonBuy === '否'}
                                            onChange={this.handleChange}
                                            value="否"
                                            name="isLegalPersonBuy"
                                            aria-label="否"
                                        />} label="否" />
                                </div>
                                <div className="InputBox">
                                    <div className="InputBox-text">参保证明:</div>
                                    <FormControlLabel control={
                                        <Radio
                                            checked={this.state.legalPersonCertificate === '已提供'}
                                            onChange={this.handleChange}
                                            value="已提供"
                                            name="legalPersonCertificate"
                                            aria-label="已提供"
                                        />} label="已提供" />
                                    <FormControlLabel control={
                                        <Radio
                                            checked={this.state.legalPersonCertificate === '未提供'}
                                            onChange={this.handleChange}
                                            value="未提供"
                                            name="legalPersonCertificate"
                                            aria-label="未提供"
                                        />} label="未提供" />
                                </div>
                            </div>
                            <div className="tow-row">
                                <div className="InputBox">
                                    <div className="InputBox-text">参保人员已停保:</div>
                                    <FormControlLabel control={
                                        <Radio
                                            checked={this.state.isClerkStopBuyInsurance === '是'}
                                            onChange={this.handleChange}
                                            value="是"
                                            name="isClerkStopBuyInsurance"
                                            aria-label="是"
                                        />} label="是" />
                                    <FormControlLabel control={
                                        <Radio
                                            checked={this.state.isClerkStopBuyInsurance === '否'}
                                            onChange={this.handleChange}
                                            value="否"
                                            name="isClerkStopBuyInsurance"
                                            aria-label="否"
                                        />} label="否" />
                                </div>
                                <div className="InputBox">
                                    <div className="InputBox-text">已收身份证原件数量:</div>
                                    <TextField className="InputBox-next" placeholder="请输入已收身份证原件数量"
                                        error={this.state.error} value={this.state.identityCardNumber} ref="identityCardNumber" name="identityCardNumber" onChange={this.handleChange} />

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