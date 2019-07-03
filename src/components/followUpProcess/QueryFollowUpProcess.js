import React, { Component } from 'react';
import { SERVER_URL } from '../../constants.js'
import Input from '@material-ui/core/Input';
import Badge from '@material-ui/core/Badge';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
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
    }

    //根据选择业务类型跳转页面
    handleProcessUrl (event){
        this.setState({processUrl: event.target.value});
        if(event.target){       
            this.props.handleUrl(event.target.value)
        }
    }
 
    // handleChange = (event) => {
    //     this.setState(
    //         { [event.target.name]: event.target.value }
    //     );
    // }

    handValueChange(e) { 
        this.setState({companyName: e.target.value});
        
    }
    handsearchBth(){   
            this.props.handleValue(this.state.companyName)
    }
    render() {
        return ( 
            <div className="box">
                <div className="singleElection-text">业务类型:</div>
                <div className="singleElection-next">
                    <FormControlLabel control={
                        <Radio  
                            checked={this.state.processUrl === '/commerce/listProcessByUser'}
                            onChange={this.handleProcessUrl}
                            value="/commerce/listProcessByUser"
                            name="processUrl"
                            aria-label="工商注册"
                        />
                    } label="工商注册" />
                     <Badge className="number"  badgeContent={this.props.map.commerceNum} color="secondary">
                    </Badge>
               
                    <FormControlLabel control={
                        <Radio
                            checked={this.state.processUrl === '/tally/listProcessByUser'}
                            onChange={this.handleProcessUrl}
                            value="/tally/listProcessByUser"
                            name="processUrl"
                            aria-label="代理记账"
                        />} label="代理记账" /> 
                        <Badge className="number"  badgeContent={this.props.map.tallyNum} color="secondary">
                        </Badge>
                    <FormControlLabel control={
                        <Radio
                            checked={this.state.processUrl === '/gShangChange/listProcessByUser'}
                            onChange={this.handleProcessUrl}
                            value="/gShangChange/listProcessByUser"
                            name="processUrl"
                            aria-label="工商变更"
                        />} label="工商变更" />
                        <Badge className="number"  badgeContent={this.props.map.gShangChangeNum} color="secondary">
                    </Badge>
                    <div>{this.props.name}</div>
                </div>
                <div style={{position:'absolute',right:'30px',display:'flex'}}>
                    <Input  className="Input"  value={this.state.companyName} onChange={this.handValueChange} placeholder="公司名称搜索" />
                    <div className="Separate"></div>
                    <Button onClick={this.handsearchBth} variant="contained" color="primary" >搜索</Button>
                </div>
            </div>
        )
    }
}
export default QueryTemplate;