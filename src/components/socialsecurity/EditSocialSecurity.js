import React from 'react';
import SkyLight from 'react-skylight';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import NativeSelect from '@material-ui/core/NativeSelect';
import { SERVER_URL } from '../../constants.js';
import PersonInformation from './PersonInformation.js'
import store from '../../store'
import Dialog from '@material-ui/core/Dialog';
// import { Input } from 'material-ui-icons';
require('./styles/SocialSecurity.css')
let addline = 1;
class AddTemplate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            customerId:'',
            companyName: '',
            customer: '',
            customerPhone: '',//客户联系方式
            registeredArea: '',//注册区域
            address: '',//注册地址
            fees: '',//收费金额
            saler: '',//签单人
            buyStartMonth: '2019-05',//购买起始月
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
            userList: [],
            personType: '',
            personDoms: [],
            personInformations: [],
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
    //查询详情，并展示详情页
    findById = (event) => {
        //event.preventDefault();
        var socialSecurityId = this.props.socialSecurityId;
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
                    customerId:responseData.data.customerId,
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
                    identityCardNumber: responseData.data.identityCardNumber,
                    level1: responseData.data.registeredArea.split('-')[0],
                    level2: responseData.data.registeredArea.split('-')[1],
                    level3: responseData.data.registeredArea.split('-')[2]
                }, () => {
                    var personinformations = JSON.parse(responseData.data.personalInformation);
                    const action = {
                        type: "EDIT_PERSONINFORMATIONS",
                        personinformations
                    }
                    store.dispatch(action);
                    this.setState({
                        personInformations: personinformations
                    })                    
                });
            })
            .catch(err =>
                this.setState({ open: true, message: 'Error when 查询详情' })
            )
        this.getRegisterAreaList();
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
    //点击添加一行人员信息
    getPersonInformation = () => {
        let arr = this.state.personDoms;
        arr.push(++addline);
        this.setState({
            personDoms: arr
        })
    }
    //点击删除一行人员信息
    deletePersonInformation = (index, personDoms) => {
        let arr = [];
        personDoms.forEach((obj) => {
            if (obj == index) {
            } else {
                arr.push(obj)
            }
        })
        this.setState({
            personDoms: arr
        })
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
        this.setState({
            registerAreaList: [],
            registerAreaList1: [],
            registerAreaList2: [],
            level1: '',
            level2: '',
            level3: ''
        })

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
    //回显地址下拉
    getRegisterAreaList = () => {
        let level1 = this.state.level1;
        let level2 = this.state.level2;
        if (level1 != '') {
            let registerAreaList = this.state.registerAreaList;
            registerAreaList.forEach(reg => {
                if (reg.name == level1) {
                    this.setState({
                        registerAreaList1: reg.childTreeList
                    })
                }
            });
        }
        if (level2 != '') {
            let registerAreaList1 = this.state.registerAreaList1;
            registerAreaList1.forEach(reg => {
                if (reg.name == level2) {
                    this.setState({
                        registerAreaList2: reg.childTreeList
                    })
                }
            });
        }
    }
    componentDidMount() {
        this.getRegisterArea();
    }
    showEdit = (event) => {
        this.setState({
          openDialog:true
        })
        this.getRegisterArea();
        this.getRegisterAreaList();
        this.getCustomerList();
        this.findAllUser();
        this.findById();
    }
    //从redux获取数据PersonInformations,并转成json
    getPersonInformations = () => {
        //store.从redux获取数据personinformations
        var personinformations = store.getState().personinformations;
        var str = '';        
        var persons = [];
        personinformations.forEach((obj) => {            
            var personObj = {
                personName: obj.personName,
                idCardNumber: obj.idCardNumber,
                gongzi: obj.gongzi,
                telephone: obj.telephone,
                personType: obj.personType,
                remark: obj.remark,
                id: obj.id
            }
            JSON.stringify(personObj)
            persons.push(personObj);
        })
        return JSON.stringify(persons);
    }
    // Save and close modal form
    handleSubmit = (event) => {
        var personalInformation = this.getPersonInformations();
        var templateVo = {}
        if (this.state.companyName != '') {
            templateVo = {
                companyName: this.state.companyName,
                customer: this.state.customer,
                customerPhone: this.state.customerPhone,//客户联系方式                
                address: this.state.address,//注册地址
                fees: this.state.fees,//收费金额
                saler: this.state.saler,//签单人
                registeredArea: this.state.level1 + "-" + this.state.level2 + "-" + this.state.level3,//注册区域       
                buyStartMonth: this.state.buyStartMonth,//购买起始月
                isCreditCard: this.state.isCreditCard,//是否告知客户首次需要刷卡购买
                openAccount: this.state.openAccount,//银行是否开户
                backAccount: this.state.backAccount,//开户账号
                buyType: this.state.buyType,//购买类型（首次购买，非首次购买）
                personalInformation: personalInformation,//购买人员信息
                isLegalPersonBuy: this.state.isLegalPersonBuy,//法人是否已参保
                legalPersonCertificate: this.state.legalPersonCertificate,//法人参保证明（已提供，未提供）
                isClerkStopBuyInsurance: this.state.isClerkStopBuyInsurance,//参保人员是否已停保（是，否）
                identityCardNumber: this.state.identityCardNumber,
                socialSecurityId: this.props.socialSecurityId
            };
            this.props.editTemplate(templateVo);
            this.setState({
                companyName: '',
                remark: '',
                openDialog: false,
                open: true,
                message: '修改成功'
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
            openDialog: false,
        })
        event.preventDefault();
    }
    render() {
        let registerAreaList = this.state.registerAreaList;
        let registerAreaList1 = this.state.registerAreaList1;
        let registerAreaList2 = this.state.registerAreaList2;
        let userList = this.state.userList;
        let level1 = this.state.level1;
        let level2 = this.state.level2;
        let level3 = this.state.level3;
        let personDoms = [];
        let personInformations = this.state.personInformations;
        for (var i = 0; i < personInformations.length; i++) {
            personDoms.push(<PersonInformation personInformation={personInformations[i]} index={personInformations[i].id}></PersonInformation>)
        }

        return (

            <div>
                <Dialog open={this.state.openDialog} fullWidth={this.state.fullWidth} 
                            maxWidth={this.state.maxWidth} ref="editDialog" aria-labelledby="form-dialog-title">
                    <h3 className="title">社保工单-修改</h3>
                    <form>
                        <div className="OutermostBox">
                            <div className="tow-row">
                                <div className="InputBox">
                                    <div className="socialsecurity-text">公司名称:</div>
                                    <NativeSelect
                                        className="socialsecurity-next"
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
                                </div>
                                <div className="InputBox">
                                    <div className="socialsecurity-text">注册区域:</div>
                                    <div className="socialsecurity-next">
                                        <NativeSelect
                                            style={{width:"30%",marginRight:'3.33%'}}
                                            native
                                            value={this.state.level1}
                                            onChange={this.handleChangeRegisterArea}
                                            name='level1'
                                        >
                                            <option value="" />
                                            {registerAreaList.map(item => {
                                                return (<option value={item.binama} checked={item.name == level1 ? 'checked' : ''}>{item.name}</option>)
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
                                                return (<option value={item.binama} checked={item.name == level2 ? 'checked' : ''}>{item.name}</option>)
                                            })}
                                        </NativeSelect >
                                        <NativeSelect
                                            style={{width:"30%",marginRight:'3.33%'}}
                                            native
                                            value={this.state.level3}
                                            onChange={this.handleChange}
                                            name='level3'
                                        >
                                            <option value="" />
                                            {registerAreaList2.map(item => {
                                                return (<option value={item.binama} checked={item.name == level3 ? 'checked' : ''}>{item.name}</option>)
                                            })}
                                        </NativeSelect >
                                </div>
                                </div>
                            </div>
                            <div className="tow-row">
                                <div className="InputBox">
                                    <div className="socialsecurity-text">客户联系方式:</div>
                                    <TextField className="socialsecurity-next" placeholder="请输入客户联系方式"
                                        error={this.state.error} value={this.state.customerPhone} ref="customerPhone" name="customerPhone" onChange={this.handleChange} />
                                </div>
                                <div className="InputBox">
                                    <div className="socialsecurity-text">公司地址:</div>
                                    <TextField className="socialsecurity-next" placeholder="请输入公司地址"
                                        error={this.state.error} value={this.state.address} ref="address" name="address" onChange={this.handleChange} />
                                </div>
                            </div>
                            <div className="tow-row">
                                <div className="InputBox">
                                    <div className="socialsecurity-text">收费金额:</div>
                                    <TextField className="socialsecurity-next" placeholder="请输入收费金额"
                                        error={this.state.error} value={this.state.fees} ref="fees" name="fees" onChange={this.handleChange} />
                                </div>
                           
                           
                                <div className="InputBox">
                                    <div className="socialsecurity-text">签单人:</div>
                                    <NativeSelect
                                        className="socialsecurity-next"
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
                            </div>
                            <div className="tow-row">
                                <div className="InputBox">
                                    <div className="socialsecurity-text">购买起始月:</div>
                                    <TextField
                                        className="socialsecurity-next"
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
                                <div className="InputBox">
                                    <div className="socialsecurity-text">告知客户首次需要刷卡:</div>
                                        <div className="socialsecurity-next">
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
                                    </div>
                                </div>
                                <div className="tow-row">
                                    <div className="InputBox">
                                        <div className="socialsecurity-text">银行是否开户:</div>
                                        <div className="socialsecurity-next">
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
                                    <div className="InputBox">
                                        <div className="socialsecurity-text">购买类型:</div>
                                        <div className="socialsecurity-next">
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
                                    </div>
                                </div>
                            <div className="tow-row">
                                <div className="InputBox">
                                    <div className="socialsecurity-text">开户账号:</div>
                                    <TextField className="socialsecurity-next" placeholder="请输入开户账号"
                                        error={this.state.error} value={this.state.backAccount} ref="backAccount" name="backAccount" onChange={this.handleChange} />
                                </div>
                                <div className="InputBox"></div>
                            </div>
                            <div className="tow-row">
                                <div className="InputBox">
                                    <div className="socialsecurity-text">
                                        <Button variant="contained" tyle={{ 'margin': '10px' }} color="primary" onClick={this.getPersonInformation}>添加人员</Button>
                                    </div>  
                                </div>
                                <div className="InputBox"></div>
                            </div>

                            <div className="tow-row" style={{margin:'0 auto'}}>
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
                                            <th>删除</th>
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
                                </div>
                                <div className="InputBox">
                                    <div className="socialsecurity-text">参保证明:</div>
                                    <div className="socialsecurity-next">
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
                            </div>
                            <div className="tow-row">
                                <div className="InputBox">
                                    <div className="socialsecurity-text">参保人员已停保:</div>
                                    <div className="socialsecurity-next">
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
                                </div>
                                <div className="InputBox">
                                    <div className="socialsecurity-text">已收身份证原件数量:</div>
                                    <TextField className="socialsecurity-next" placeholder="请输入已收身份证原件数量"
                                        error={this.state.error} value={this.state.identityCardNumber} ref="identityCardNumber" name="identityCardNumber" onChange={this.handleChange} />

                                </div>

                            </div>
                            <div className="Generalbutton">
                                <Button className="Generalbutton-class" variant="outlined" color="secondary" onClick={this.handleSubmit}>保存</Button>
                                <Button className="Generalbutton-class" variant="outlined" color="secondary" onClick={this.cancelSubmit}>取消</Button>
                            </div>
                        </div>
                    </form>
                </Dialog>
                <div>
                    <Button variant="contained" color="primary" style={{ 'margin': '10px,0', background: '#286090' }} onClick={this.showEdit}>修改</Button>
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