import React, { Component } from 'react';
import { SERVER_URL } from '../../constants.js'
import Input from '@material-ui/core/Input';
import Badge from '@material-ui/core/Badge';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import './styles/FollowUpProcess.css'

//模糊查询
class QueryTemplate extends Component {
    constructor(props) {
        super(props)
        this.handleProcessUrl= this.handleProcessUrl.bind(this)
        // this.handleChange    = this.handleChange.bind(this);
        this.handValueChange = this.handValueChange.bind(this);
        this.handsearchBth   = this.handsearchBth.bind(this)
        this.state = {
            valueInput: '',
            responseData: {},
            processUrl:'/commerce/listProcessByUser',
            companyName:''
        }
        this.handjudge = this.handjudge.bind(this)
        this.handValueChange = this.handValueChange.bind(this)
        this.handsearchBth = this.handsearchBth.bind(this)
    }

    //根据选择业务类型跳转页面
    handleProcessUrl (event){
        this.setState({processUrl: event.target.value});
        if(event.target){       
            this.props.handleUrl(event.target.value)
        }
    }

    handValueChange(e) { 
        this.setState({companyName: e.target.value});
    }

    handsearchBth(){   
        this.props.handleValue(this.state.companyName)
    }
    handjudge(){
        this.props.judgeFatherFun()
    }
    render() {
        return ( 
            <div className="box">
                <div className="singleElection-text">业务类型:</div>
                <div className="singleElection-next">
                    <FormControlLabel control={
                        <Radio  
                            checked={this.state.processUrl === '/commerce/listProcessByDepartmentId'}
                            onChange={this.handleProcessUrl}
                            value='/commerce/listProcessByDepartmentId'
                            name="processUrl"
                            aria-label="工商注册"
                        />
                    } label="工商注册" />
                     <Badge className="number"  badgeContent={this.props.map.commerceNum} color="secondary"></Badge>
                    <FormControlLabel control={
                        <Radio
                            checked={this.state.processUrl === '/tally/listProcessByDepartmentId'}
                            onChange={this.handleProcessUrl}
                            value="/tally/listProcessByDepartmentId"
                            name="processUrl"
                            aria-label="代理记账"
                        />} label="代理记账" /> 
                        <Badge className="number"  badgeContent={this.props.map.tallyNum} color="secondary"></Badge>
                    <FormControlLabel control={
                        <Radio
                            checked={this.state.processUrl === '/gShangChange/listProcessByDepartmentId'}
                            onChange={this.handleProcessUrl}
                            value="/gShangChange/listProcessByDepartmentId"
                            name="processUrl"
                            aria-label="工商变更"
                        />} label="工商变更" />
                        <Badge className="number" badgeContent={this.props.map.gShangChangeNum} color="secondary"></Badge>
                       
                </div>
                <Button onClick={this.handjudge} variant="contained" color="primary" style={{whiteSpace:'nowrap',marginLeft:'10px'}} >查看当前账号</Button>
                <div style={{position:'absolute',right:'30px',display:'flex'}}>
                    <Input  className="Input"  value={this.state.companyName} onChange={this.handValueChange} placeholder="签单人搜索" />
                    <div className="Separate"></div>
                    <Button onClick={this.handValueChange} variant="contained" color="primary" >搜索</Button>
                </div>
            </div>
        )
    }
}
export default QueryTemplate;