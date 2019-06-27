import React from 'react';
import SkyLight from 'react-skylight';
import { SERVER_URL } from '../../constants.js';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import { Input } from 'antd';

import { Select } from 'antd';
// require('./styles/CompanyInformation.css')
const { Option } = Select;
class ChangeUserPribliege extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            companyInformationId: this.props.companyInformationId,
            newUserId:'',
            data:[]        
        };
        this.fetchTemplate = this.fetchTemplate.bind(this)
        this.handChangenewUserId =this.handChangenewUserId.bind(this)
    }
    componentDidMount(){
        this.fetchTemplate()
    }
    //获取Newuserid数据
   fetchTemplate = () => { 
    fetch(SERVER_URL + '/user/listAllAndSelf' , {
      mode: "cors",
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json,text/plain,*/*'
      },  
    })  
      .then((response) => response.json())
      .then((responseData)  => {
          if(responseData.status !== 500){
            this.setState({
              data: responseData.data,
            });
          }else{
            alert('无子节点数据')
          }
      })
      .catch(err => console.error(err));
    }
    handleChange = (event) => {
        this.setState(
            { [event.target.name]: event.target.value }
        );
    }
    handChangenewUserId(value){
        this.setState({newUserId :`${value}`},()=>{ 
        })
    }
    //提示框 
    handleClose = (event, reason) => {
        this.setState({ open: false });
    };   
    // Save car and close modal form
    handleSubmit = (event) => {
        event.preventDefault();
        var userInforPribilegeVo = {
            oldUserId:this.props.oldUserId,
            newUserId: this.state.newUserId,
        };
        this.props.editTemplate(userInforPribilegeVo);
        this.refs.editDialog.hide();
        this.setState({
            open: true,
            message: '修改成功'
        })
    }
    
    //查询详情，并展示详情页
    findById = (event) => {
        this.setState({ open: true, message: '修改用户权限' }) 
        this.refs.editDialog.show();
    }
    // Cancel and close modal form
    cancelSubmit = (event) => {
        this.refs.editDialog.hide();
    }
    render() {
        return (
            <div>
                <SkyLight hideOnOverlayClicked ref="editDialog">
                    <h3>修改当前人员权限</h3>
                    <form>
                        <div className="OutermostBox">
                            <div className="tow-row" >
                                    <div className="InputBox"> 
                                        <div className="InputBox-text">姓名:</div>
                                        <Input className="InputBox-next" style={{height:'30px',marginTop:'14px'}} placeholder="name" name="Name"  value={this.props.name} title="name" />
                                    </div>
                                    <div className="InputBox">
                                        <div className="InputBox-text">当前ID:</div>
                                        <Input className="InputBox-next" style={{height:'30px',marginTop:'14px'}}  onChange={this.handleChange} multiline={true} 
                                        name="oldUserId" value={this.props.oldUserId}  />
                                    </div>
                                    <div className="InputBox">
                                        <div className="InputBox-text">修改目标名:</div>
                                        <Select
                                        className="InputBox-next"
                                        style={{height:'30px',marginTop:'14px'}} 
                                        showSearch
                                        placeholder="可输入搜索内容"
                                        optionFilterProp="children"
                                        onChange={this.handChangenewUserId}
                                        filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        >
                                        {this.state.data.map(item=>{
                                            return(<Option value={item.userId}>{item.name}</Option>)
                                        })
                                        }
                                        </Select>
                                    </div>
                                    <div className="InputBox"></div>
                            </div> 
                            <div className="button">
                                <Button className="button-class" variant="outlined" color="secondary" onClick={this.handleSubmit}>保存</Button>
                                <Button className="button-class" variant="outlined" color="secondary" onClick={this.cancelSubmit}>取消</Button>
                            </div>
                        </div>
                    </form>
                </SkyLight>
                <Button variant="contained" color="primary" style={{ 'margin': '10px,0', background: '#2196F3' }} onClick={this.findById}>修改权限</Button>
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

export default ChangeUserPribliege;