import React, { Component } from 'react';
import { SERVER_URL } from '../../constants.js'
import Input from '@material-ui/core/Input';
import Badge from '@material-ui/core/Badge';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import './styles/privilegeSubordinate.css'

//模糊查询

class QueryPrivilegeSubordinate extends Component {
   
    constructor(props) {
        super(props)
        this.handleProcessUrl = this.handleProcessUrl.bind(this)
        // this.handleChange = this.handleChange.bind(this);
        // this.handValueChange = this.handValueChange.bind(this);
        this.state = {
            // valueInput: '',
            // responseData: {},
            processUrl:'/usergroup/findUsersByUsergroup?usergroupId=',
            name:'',
            username:'',
            jurisdictionName:'',
            subtype:'',
            code:''

        }
    }

    //根据选择业务类型跳转页面
    handleProcessUrl (event){
        this.setState({processUrl: event.target.value});
        if(event.target){       
            this.props.gethandleUrl(event.target.value)
        }
    }
    handleChange = (e) => {
        switch(e.target.name){  
            case "name":
            this.setState({
                name:e.target.value
            })
            break;
            case "username":
            this.setState({
                username:e.target.value
            })
            break;
            case "jurisdictionName":
            this.setState({
                jurisdictionName:e.target.value
            })
            break;
            case "subtype":
            this.setState({
                subtype:e.target.value
            })
            break;
            case "code":
            this.setState({
                code:e.target.value
            })
            break;
        }
    }
    // handValueChange(e) {
    //     this.setState({valueInput: e.target.value});
    //     if(e.target){       
    //         this.props.handleValue(e.target.value)
    //     }
    // }
    render() { 
        const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;
        const { name,username,jurisdictionName,subtype,code } = this.state
        return (
            <div className="box"> 
                {/* <FormControlLabel control={<FormLabel>单选框</FormLabel>} /> */}
                <div className="singleElection-text">权限管理 :</div>
                <div className="singleElection-next">
                    <FormControlLabel control={
                        <Radio  
                            checked={this.state.processUrl === '/usergroup/findUsersByUsergroup?usergroupId='}
                            onChange={this.handleProcessUrl}
                            value="/usergroup/findUsersByUsergroup?usergroupId="
                            name="processUrl"
                            aria-label="所属人员"
                        />
                    } label="所属人员" />
                     <Badge className="number"  color="secondary">
                    </Badge>
               
                    <FormControlLabel control={
                        <Radio
                            checked={this.state.processUrl === '/usergroup/findPrivilegesByUsergroup?usergroupId='}
                            onChange={this.handleProcessUrl}
                            value="/usergroup/findPrivilegesByUsergroup?usergroupId="
                            name="processUrl"
                            aria-label="所属权限"
                        />} label="所属权限" />
                        <Badge className="number" color="secondary">
                        </Badge>
                </div>
                {
                    (this.state.processUrl === '/usergroup/findUsersByUsergroup?usergroupId=')?
                    <div style={{position:'absolute',right:'30px',display:'flex'}}>
                        <Input className="Input" onChange={this.handleChange} value={name}     name="name" placeholder="人员姓名搜索" />
                        <div className="Separate"></div>
                        <Input className="Input" onChange={this.handleChange} value={username} name="username" placeholder="USERNAME" />
                        <div className="Separate"></div>
                        <Button  onClick={this.handsearchBth} variant="contained" color="primary" >搜索</Button>
                    </div>
                    :
                    <div style={{position:'absolute',right:'30px',display:'flex'}}>
                        <Input className="Input" onChange={this.handleChange}  value={jurisdictionName} name="jurisdictionName" placeholder="名称" />
                        <div className="Separate"></div>
                        <Input className="Input" onChange={this.handleChange}  value={subtype}          name="subtype" placeholder="子类型" />
                        <div className="Separate"></div>
                        <Input className="Input" onChange={this.handleChange}  value={code}             name="code" placeholder="code" />
                        <div className="Separate"></div>
                        <Button  onClick={this.handsearchBth} variant="contained" color="primary" >搜索</Button>
                    </div>
                }
            </div>
        )
    }
    componetDidMont() {
        console.log('QueryPrivilegeSubordinate')
    }
}
export default QueryPrivilegeSubordinate;