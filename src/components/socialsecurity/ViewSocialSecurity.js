import React from 'react';
import SkyLight from 'react-skylight';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import NativeSelect from '@material-ui/core/NativeSelect';
import { SERVER_URL } from '../../constants.js';
import Dialog from '@material-ui/core/Dialog';
import store from '../../store'
// import { Input } from 'material-ui-icons';
require('./styles/SocialSecurity.css')
let addline = 1;
class AddTemplate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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
            personalInformation: [],//购买人员信息
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
            userList: [],
            personType: '',
            personDoms: [],
            personName: '',
            idCardNumber: '',
            gongzi: '',
            telephone: '',
            personType: '',
            remark: '',
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

    childValue = (param) => {
        this.setState({
            personName: param.personName,
            idCardNumber: param.idCardNumber,
            gongzi: param.gongzi,
            telephone: param.telephone,
            personType: param.personType,
            remark: param.remark
        })
    }
    //查询详情，并展示详情页
    findById = (event) => {
        this.findAllUser()
        event.preventDefault();
        var socialSecurityId ="";
        try {
            socialSecurityId = this.props.match.params.socialSecurityId;
        } catch(e) {
            socialSecurityId =this.props.socialSecurityId;
        }
        //var socialSecurityId = this.props.match.params.socialSecurityId==undefined?this.props.socialSecurityId:this.props.match.params.socialSecurityId;
        fetch(SERVER_URL + '/socialSecurity/findById/' + socialSecurityId,
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
                    openDialog:true,
                    companyName: responseData.data.companyName,
                    registeredArea: responseData.data.registeredArea,
                    customerPhone: responseData.data.customerPhone,
                    address: responseData.data.address,
                    fees: responseData.data.fees,
                    saler: responseData.data.saler,
                    buyStartMonth: responseData.data.buyStartMonth,
                    isCreditCard: responseData.data.isCreditCard,
                    openAccount: responseData.data.openAccount,
                    buyType: responseData.data.buyType,
                    backAccount: responseData.data.backAccount,
                    // personalInformation:JSON.parse(responseData.data.personalInformation),
                    //遍历人员信息
                    // personName:personalInformation[0].personName,
                    // idCardNumber:personalInformation[0].idCardNumber,
                    // gongzi:personalInformation[0].gongzi,
                    // telephone:personalInformation[0].telephone,
                    // personType:personalInformation[0].personType,
                    // remark:personalInformation[0].remark
                    isLegalPersonBuy: responseData.data.isLegalPersonBuy,
                    legalPersonCertificate: responseData.data.legalPersonCertificate,
                    isClerkStopBuyInsurance: responseData.data.isClerkStopBuyInsurance,
                    identityCardNumber: responseData.data.identityCardNumber
                }, () => {
                    var personinformations = JSON.parse(responseData.data.personalInformation);
                    const action = {
                        type: "EDIT_PERSONINFORMATIONS",
                        personinformations
                    }
                    store.dispatch(action);
                });

            })
            .catch(err =>
                this.setState({ open: true, message: 'Error when 查询详情' })
            )
    }
    //'personName='+this.state.personName+',fh,idCardNumber='+this.state.idCardNumber
    //+',fh,gongzi='+this.state.gongzi+',fh,telephone='+this.state.telephone+',fh,personType='
    // +this.state.personType+',fh,remark='+this.state.remark;

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

    // Save and close modal form

    // Cancel and close modal form
    cancelSubmit = (event) => {
        this.setState({
            openDialog:false,
        })
        event.preventDefault();
    }
    render() {
        let registerAreaList = this.state.registerAreaList;
        let registerAreaList1 = this.state.registerAreaList1;
        let registerAreaList2 = this.state.registerAreaList2;
        let personalInformation = this.state.personalInformation;
        let userList = this.state.userList;
        let personDoms = [];

        var personinformations = store.getState().personinformations;
        for (var i = 0; i < personinformations.length; i++) {
            personDoms.push(<tr key={this.props.key}>
                <td><TextField className="InputBox-next" placeholder="请输入姓名"
                    error={this.state.error} value={personinformations[i].personName} ref="personName" name="personName"/>
                </td>
                <td><TextField className="InputBox-next" placeholder="请输入身份证号"
                    error={this.state.error} value={personinformations[i].idCardNumber} ref="idCardNumber" name="idCardNumber"/>
                </td>
                <td><TextField className="InputBox-next" placeholder="请输入月工资"
                    error={this.state.error} value={personinformations[i].gongzi} ref="gongzi" name="gongzi"/>
                </td>
                <td><TextField className="InputBox-next" placeholder="请输入联系电话"
                    error={this.state.error} value={personinformations[i].telephone} ref="telephone" name="telephone" />
                </td>
                <td> <TextField className="InputBox-next" placeholder="请输入联系电话"
                    error={this.state.error} value={personinformations[i].personType} ref="personType" name="personType"/>
                </td>
                <td><TextField className="InputBox-next" placeholder="备注"
                    value={personinformations[i].remark} ref="remark" name="remark" />
                </td>
                <td></td>
            </tr>)
        }
        return (
            <div>
                <Dialog open={this.state.openDialog} fullWidth={this.state.fullWidth} 
                            maxWidth={this.state.maxWidth} ref="editDialog" aria-labelledby="form-dialog-title">
                    <h3 className="title">社保工单查看-新增</h3>
                    <form>
                        <div className="OutermostBox">
                            <div className="tow-row">
                                <div className="InputBox">
                                    <div className="socialsecurity-text">公司名称:</div>
                                    <TextField className="socialsecurity-next" placeholder="请输入新客户公司名称"
                                        error={this.state.error} value={this.state.companyName} ref="companyName" name="companyName"  />
                                </div>
                                <div className="InputBox">
                                    <div className="socialsecurity-text">注册区域:</div>
                                    <TextField className="socialsecurity-next" placeholder="请输入注册区域"
                                        error={this.state.error} value={this.state.registeredArea} ref="registeredArea" name="registeredArea" />
                                </div>
                            </div>
                            <div className="tow-row">
                                <div className="InputBox">
                                    <div className="socialsecurity-text">客户联系方式:</div>
                                    <TextField className="socialsecurity-next" placeholder="请输入客户联系方式"
                                        error={this.state.error} value={this.state.customerPhone} ref="customerPhone" name="customerPhone"  />
                                </div>
                                <div className="InputBox">
                                    <div className="socialsecurity-text">公司地址:</div>
                                    <TextField className="socialsecurity-next" placeholder="请输入公司地址"
                                        error={this.state.error} value={this.state.address} ref="address" name="address" />
                                </div>
                            </div>
                            <div className="tow-row">
                                <div className="InputBox">
                                    <div className="socialsecurity-text">收费金额:</div>
                                    <TextField className="socialsecurity-next" placeholder="请输入收费金额"
                                        error={this.state.error} value={this.state.fees} ref="fees" name="fees" />
                                </div>
                                <div className="InputBox">
                                    <div className="socialsecurity-text">签单人:</div>
                                    <NativeSelect
                                        className="socialsecurity-next"
                                        native
                                        value={this.state.saler}
                                        name='saler'
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
                                    <div className="socialsecurity-text">购买起始月:</div>
                                    <TextField className="socialsecurity-next" placeholder=""
                                        error={this.state.error} value={this.state.buyStartMonth} ref="buyStartMonth" name="buyStartMonth" />

                                </div>
                                <div className="InputBox">
                                    <div className="socialsecurity-text">告知客户首次需要刷卡:</div>
                                    <div className="socialsecurity-next">
                                        <FormControlLabel control={
                                            <Radio
                                                checked={this.state.isCreditCard === '是'}
                                                value="是"
                                                name="isCreditCard"
                                                aria-label="是"
                                            />} label="是" />
                                        <FormControlLabel control={
                                            <Radio
                                                checked={this.state.isCreditCard === '否'}
                                                value="否"
                                                name="isCreditCard"
                                                aria-label="否"
                                        />} label="否" />
                                    </div>
                                </div>
                            </div>
                            <div className="tow-row">
                                <div className="InputBox">
                                    <div className="socialsecurity-text">银行是否开户:</div>
                                    <div className="socialsecurity-next">
                                    <FormControlLabel control={
                                        <Radio
                                            checked={this.state.openAccount === '是'}
                                            value="是"
                                            name="openAccount"
                                            aria-label="是"
                                        />} label="是" />
                                    <FormControlLabel control={
                                        <Radio
                                            checked={this.state.openAccount === '否'}
                                            value="否"
                                            name="openAccount"
                                            aria-label="否"
                                        />} label="否" />
                                    </div>
                                </div>
                                <div className="InputBox">
                                    <div className="socialsecurity-text">购买类型:</div>
                                    <div className="socialsecurity-next">
                                    <FormControlLabel control={
                                        <Radio
                                            checked={this.state.buyType === '首次购买'}
                                            value="首次购买"
                                            name="buyType"
                                            aria-label="首次购买"
                                        />} label="首次购买" />
                                    <FormControlLabel control={
                                        <Radio
                                            checked={this.state.buyType === '非首次购买'}
                                            value="非首次购买"
                                            name="buyType"
                                            aria-label="非首次购买"
                                        />} label="非首次购买" />
                                    </div>
                                </div>
                            </div>
                            <div className="tow-row">
                                <div className="InputBox">
                                    <div className="socialsecurity-text">开户账号:</div>
                                    <TextField className="socialsecurity-next" placeholder="请输入开户账号"
                                        error={this.state.error} value={this.state.backAccount} ref="backAccount" name="backAccount" />
                                </div>
                                <div className="InputBox"></div>
                            </div>
                            <div className="tow-row" style={{margin:"0 auto"}}>
                                <input type="hidden" name="personalInformation"></input>
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>姓名</th>
                                            <th>身份证号</th>
                                            <th>月工资</th>
                                            <th>联系电话</th>
                                            <th>类型</th>
                                            <th>备注</th>                                            
                                        </tr>
                                        {/* <PersonInformation deletePersonInformation={this.deletePersonInformation}></PersonInformation>
                                            {this.state.personDoms}                            */}
                                        {personDoms}
                                        
                                    </tbody>
                                </table>
                            </div>
                            <div className="tow-row">
                                <div className="InputBox">
                                    <div className="socialsecurity-text">法人已参保:</div>
                                    <div className="socialsecurity-next">
                                        <FormControlLabel control={
                                            <Radio
                                                checked={this.state.isLegalPersonBuy === '是'}
                                                value="是"
                                                name="isLegalPersonBuy"
                                                aria-label="是"
                                            />} label="是" />
                                        <FormControlLabel control={
                                            <Radio
                                                checked={this.state.isLegalPersonBuy === '否'}
                                                value="否"
                                                name="isLegalPersonBuy"
                                                aria-label="否"
                                            />} label="否" />
                                    </div>
                                </div>
                                <div className="InputBox">
                                    <div className="socialsecurity-text">参保证明:</div>
                                    <div className="socialsecurity-next">
                                    <FormControlLabel control={
                                        <Radio
                                            checked={this.state.legalPersonCertificate === '已提供'}
                                            value="已提供"
                                            name="legalPersonCertificate"
                                            aria-label="已提供"
                                        />} label="已提供" />
                                    <FormControlLabel control={
                                        <Radio
                                            checked={this.state.legalPersonCertificate === '未提供'}
                                            value="未提供"
                                            name="legalPersonCertificate"
                                            aria-label="未提供"
                                        />} label="未提供" />
                                    </div>
                                </div>
                            </div>
                            <div className="tow-row">
                                <div className="InputBox">
                                    <div className="socialsecurity-text">参保人员已停保:</div>
                                    <div className="socialsecurity-next">
                                        <FormControlLabel control={
                                            <Radio
                                                checked={this.state.isClerkStopBuyInsurance === '是'}
                                                value="是"
                                                name="isClerkStopBuyInsurance"
                                                aria-label="是"
                                            />} label="是" />
                                        <FormControlLabel control={
                                            <Radio
                                                checked={this.state.isClerkStopBuyInsurance === '否'}
                                                value="否"
                                                name="isClerkStopBuyInsurance"
                                                aria-label="否"
                                            />} label="否" />
                                    </div>
                                </div>
                                <div className="InputBox">
                                    <div className="socialsecurity-text">已收身份证原件数量:</div>
                                    <TextField className="socialsecurity-next" placeholder="请输入已收身份证原件数量"
                                        error={this.state.error} value={this.state.identityCardNumber} ref="identityCardNumber" name="identityCardNumber" />
                                </div>
                                <div className="Generalbutton">
                                    <Button className="Generalbutton-class" variant="outlined" color="secondary" onClick={this.cancelSubmit}>关闭</Button>
                                </div>
                            </div>

                        </div>
                    </form>
                </Dialog>
                <div>
                    <Button variant="contained" color="primary" style={{ 'margin': '10px,0',backgroundColor:'#2196F3' }} onClick={this.findById}>查看</Button>
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