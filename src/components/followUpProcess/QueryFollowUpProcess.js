import React, { Component } from 'react';
import { SERVER_URL } from '../../constants.js'
import Input from '@material-ui/core/Input';
import Avatar from '@material-ui/core/Avatar';

import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import './styles/FollowUpProcess.css'

//模糊查询

class QueryTemplate extends Component {
   
    constructor(props) {
        super(props)
        this.handleProcessUrl = this.handleProcessUrl.bind(this)
        this.handleChange = this.handleChange.bind(this);
        this.handValueChange = this.handValueChange.bind(this);
        this.state = {
            valueInput: '',
            responseData: {},
            processUrl:'/commerce/listProcessByUser',
        }
    }

    //根据选择业务类型跳转页面
    handleProcessUrl (event){
        this.setState({processUrl: event.target.value});
        if(event.target){       
            this.props.handleUrl(event.target.value)
        }
        
    }

    handleChange = (event) => {
        this.setState(
            { [event.target.name]: event.target.value }
        );
    }

    handValueChange(e) {
        this.setState({valueInput: e.target.value});
        if(e.target){       
            this.props.handleValue(e.target.value)
        }
    }
  
    render() {
       
        console.log(this.props.map)
        return (
            <div className="box">
                {/* <FormControlLabel control={<FormLabel>单选框</FormLabel>} /> */}
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
                </div>
                <Input style={{position:'absolute',right:'30px'}} className="Input" onChange={this.handValueChange} placeholder="公司名称搜索" />
                {/* <Button onClick={this.props.handleSearch} style={{ background: '#61bafb', color: '#ffffff', marginLeft: '20px' }}>搜索</Button> */}
            </div>
        )
    }
    componetDidMont() {
        console.log('componetWillMont')
    }
}
export default QueryTemplate;