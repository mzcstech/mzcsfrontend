import React, { Component } from 'react';
import { SERVER_URL } from '../../constants.js'
import Input from '@material-ui/core/Input';
import Badge from '@material-ui/core/Badge';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import './styles/privilegeSubordinate.css'

//模糊查询

class QueryPrivilegeSubordinate extends Component {
   
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
        return (
            <div className="box">
                {/* <FormControlLabel control={<FormLabel>单选框</FormLabel>} /> */}
                <div className="singleElection-text">权限管理:</div>
                <div className="singleElection-next">
            
                    <FormControlLabel control={
                        <Radio  
                            checked={this.state.processUrl === '/commerce/listProcessByUser'}
                            onChange={this.handleProcessUrl}
                            value="/commerce/listProcessByUser"
                            name="processUrl"
                            aria-label="所属人员"
                        />
                    } label="所属人员" />
                     <Badge className="number"  color="secondary">
                    </Badge>
               
                    <FormControlLabel control={
                        <Radio
                            checked={this.state.processUrl === '/tally/listProcessByUser'}
                            onChange={this.handleProcessUrl}
                            value="/tally/listProcessByUser"
                            name="processUrl"
                            aria-label="所属工作组"
                        />} label="所属工作组" />
                        <Badge className="number" color="secondary">
                        </Badge>
                </div>
                <Input style={{position:'absolute',right:'30px'}} className="Input" onChange={this.handValueChange} placeholder="公司名称搜索" />
                {/* <Button onClick={this.props.handleSearch} style={{ background: '#61bafb', color: '#ffffff', marginLeft: '20px' }}>搜索</Button> */}
            </div>
        )
    }
    componetDidMont() {
        console.log('QueryPrivilegeSubordinate')
    }
}
export default QueryPrivilegeSubordinate;