import React from 'react';
import SkyLight from 'react-skylight';
import { SERVER_URL } from '../../constants.js';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import NativeSelect from '@material-ui/core/NativeSelect';
import PersonInformation from './PersonInformation.js';
import store from '../../store'
let addline = 1;
class ViewCompanyInformation extends React.Component {
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
            remark: ''
        };
    }
    //查询详情，并展示详情页
    findById = (event) => {
        this.findAllUser()
        event.preventDefault();
        var housingFundId = this.props.housingFundId;
        fetch(SERVER_URL + '/housingFund/findById/' + housingFundId,
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
                    companyName: responseData.data.companyName,
                    registeredArea: responseData.data.registeredArea,
                    customerPhone:responseData.data.customerPhone,
                    address:responseData.data.address,
                    fees:responseData.data.fees,
                    saler:responseData.data.saler,
                    buyStartMonth:responseData.data.buyStartMonth,
                    isCreditCard:responseData.data.isCreditCard,
                    openAccount:responseData.data.openAccount,
                    buyType:responseData.data.buyType,
                    backAccount:responseData.data.backAccount,
                   // personalInformation:JSON.parse(responseData.data.personalInformation),
                    //遍历人员信息
                    // personName:personalInformation[0].personName,
                    // idCardNumber:personalInformation[0].idCardNumber,
                    // gongzi:personalInformation[0].gongzi,
                    // telephone:personalInformation[0].telephone,
                    // personType:personalInformation[0].personType,
                    // remark:personalInformation[0].remark                    
                    identityCardNumber:responseData.data.identityCardNumber
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
        this.refs.viewDialog.show();
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
    // Cancel and close modal form
    cancelSubmit = (event) => {
        event.preventDefault();
        this.refs.editDialog.hide();
    }
    render() {
        let personalInformation=this.state.personalInformation;
        let userList = this.state.userList;
        let personDoms=[];
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
                <SkyLight hideOnOverlayClicked ref="viewDialog">
                    <h3 className="title">公积金工单-查看</h3>
                    <form>
                        <div className="OutermostBox">
                            <div className="tow-row">
                                
                                <div className="InputBox">
                                    <div className="InputBox-text">公司名称:</div>
                                    <TextField className="InputBox-next" placeholder="请输入新客户公司名称"
                                        error={this.state.error} value={this.state.companyName} ref="companyName" name="companyName" onChange={this.handleChange} />
                                </div>
                                <div className="InputBox">                                    
                                </div>
                            </div>
                            <div className="tow-row">
                                <div className="InputBox">
                                    <div className="InputBox-text">注册区域:</div>
                                    <TextField className="InputBox-next" placeholder="请输入注册区域"
                                        error={this.state.error} value={this.state.registeredArea} ref="registeredArea" name="registeredArea" onChange={this.handleChange} />
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
                                    <TextField className="InputBox-next" placeholder=""
                                        error={this.state.error} value={this.state.buyStartMonth} ref="buyStartMonth" name="buyStartMonth" onChange={this.handleChange} />

                                </div>
                            </div>
                            <div className="tow-row">                                
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
                                <div className="InputBox"></div>
                            </div>
                            <div className="tow-row">
                                <div className="InputBox">
                                    <div className="InputBox-text">购买类型:</div>
                                    <FormControlLabel control={
                                        <Radio
                                            checked={this.state.buyType === '首次购买'}
                                            onChange={this.handleChange}
                                            value="首次购买"
                                            name="buyType"
                                            aria-label="首次购买"
                                        />} label="首次购买" />
                                    <FormControlLabel control={
                                        <Radio
                                            checked={this.state.buyType === '非首次购买'}
                                            onChange={this.handleChange}
                                            value="非首次购买"
                                            name="buyType"
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
                                    <Button variant="contained" color="primary" style={{ 'margin': '10px' }} onClick={this.getPersonInformation}>添加人员</Button>
                                </div>
                            </div>
                            <div className="tow-row">
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
                                        {personDoms}
                                    </tbody>
                                </table>
                            </div>                            
                            <div className="tow-row">                                
                                <div className="InputBox">
                                    <div className="InputBox-text">已收身份证原件数量:</div>
                                    <TextField className="InputBox-next" placeholder="请输入已收身份证原件数量"
                                        error={this.state.error} value={this.state.identityCardNumber} ref="identityCardNumber" name="identityCardNumber" onChange={this.handleChange} />

                                </div>

                            </div>

                        </div>
                    </form>
                </SkyLight>
                <Button variant="contained" color="primary" style={{ 'margin': '10px,0', background: '#31b0d5' }} onClick={this.findById}>查看</Button>
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