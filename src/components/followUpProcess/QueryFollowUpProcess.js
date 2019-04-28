import React, { Component } from 'react';
import { SERVER_URL } from '../../constants.js'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';


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
            processUrl:'/commerce/listProcessByUser'
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
        return (
            <div className="box">
                
                <Input className="Input" onChange={this.handValueChange} placeholder="全局搜索" />
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
                    <FormControlLabel control={
                        <Radio
                            checked={this.state.processUrl === '/tally/listProcessByUser'}
                            onChange={this.handleProcessUrl}
                            value="/tally/listProcessByUser"
                            name="processUrl"
                            aria-label="代理记账"
                        />} label="代理记账" />
                    <FormControlLabel control={
                        <Radio
                            checked={this.state.processUrl === '/gShangChange/listProcessByUser'}
                            onChange={this.handleProcessUrl}
                            value="/gShangChange/listProcessByUser"
                            color="default"
                            name="processUrl"
                            aria-label="工商变更"
                        />} label="工商变更" />
                </div>
                <Button onClick={this.props.handleSearch} style={{ background: '#61bafb', color: '#ffffff', marginLeft: '20px' }}>搜索</Button>
            </div>
        )
    }
    componetDidMont() {
        console.log('componetWillMont')
    }
}
export default QueryTemplate;