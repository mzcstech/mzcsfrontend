import React from 'react';
import SkyLight from 'react-skylight';
import { SERVER_URL } from '../../constants.js';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import FormLabel from '@material-ui/core/FormLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import Input from '@material-ui/core/Input';

class EditPrivilegeManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            privilegeId: this.props.privilegeId,
            privilegeName:'',
            privilegetype:'',
            privilegesubtype:'',
            findPrivilegeTypes:[],
            findPrivilegSubTypes:[]

        };
        this.findPrivilegeTypes     = this.findPrivilegeTypes.bind(this)
        this.findById               = this.findById.bind(this)
        this.handleChange           = this.handleChange.bind(this)
        this.handleChangegrouptype  = this.handleChangegrouptype.bind(this)
        this.handleChanegesubtype   = this.handleChanegesubtype.bind(this)
    }
    handleChange = (event) => {
        this.setState(
            { privilegeName: event.target.value }
        );
    }
    handleChangegrouptype=(event) =>{
        this.setState(
            { privilegetype: event.target.value }
        );
    }
    handleChanegesubtype=(event) =>{
        this.setState(
            { privilegesubtype: event.target.value }
        );
    }
    //下拉菜单数据初始化
    componentWillMount(){
        this.findPrivilegeTypes()
        this.findPrivilegSubTypes()
    }
    //获取下拉框类型查询
    findPrivilegeTypes= () => {
    fetch(SERVER_URL + '/privilege/findPrivilegeTypes',
        {
            mode: "cors",
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': '*/*'
            }
        })
        .then(res => res.json())
        .then((responseData) => {
            this.setState({
                findPrivilegeTypes:responseData
            })
        })
        .catch(err =>
            this.setState({ open: true, message: 'Error when 修改详情' })
        )
    }
    //获取下拉框类型查询子类型
    findPrivilegSubTypes= () => {
        fetch(SERVER_URL + '/privilege/findPrivilegeSubTypes',
            {
                mode: "cors",
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': '*/*'
                }
            })
            .then(res => res.json())
            .then((responseData) => {
                this.setState({
                    findPrivilegSubTypes:responseData
                })
            })
            .catch(err =>
                this.setState({ open: true, message: 'Error when 修改详情' })
            )
        }
    //提示框 
    handleClose = (event, reason) => {
        this.setState({ open: false });
    };      
    // Save car and close modal form
    handleSubmit = (event) => {
        event.preventDefault();
        var privilegeInformationVo = {
            privilegeId:this.state.privilegeId,
            name: this.state.privilegeName,
            type: this.state.privilegetype,
            subType: this.state.privilegesubtype,
        };
        
        this.props.editTemplate(privilegeInformationVo);
        this.refs.editDialog.hide();
        this.setState({
            open: true,
            message: '修改成功'
        })
    }
    //查询详情，并展示详情页
    findById = (event) => {
        event.preventDefault();
        var privilegeId = this.state.privilegeId;
        console.log(privilegeId,'privilegeId')
        fetch(SERVER_URL + '/privilege/findById?id=' + privilegeId,
            {
                mode: "cors",
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': '*/*'
                },
            })
            
            .then(res => res.json())
            .then((responseData) => {
                this.setState({
                    privilegeName: responseData.data.name,
                    privilegetype: responseData.data.type,
                    privilegesubtype: responseData.data.subType,
                    },()=>{
                        
                    })
            })
            .catch(err =>
                this.setState({ open: true, message: 'Error when 查询详情' }) 
            )
        this.refs.editDialog.show();
    }
    // Cancel and close modal form
    cancelSubmit = (event) => {
        event.preventDefault();
        this.refs.editDialog.hide();    
    }   
    render(){
        return (
            <div>
                <SkyLight hideOnOverlayClicked ref="editDialog">
                    <h3>原件管理公司信息-编辑</h3>
                    <form>
                        <div className="OutermostBox">
                            <div className="tow-row" >
                                <div className="InputBox">
                                    <FormLabel className="InputBox-text">名称:</FormLabel>
                                    <Input   style={{ width:'70%'}}  className="InputBox-text" className="Input"    onChange={this.handleChange} value={this.state.privilegeName}  />
                                </div>    
                                <div className="InputBox">
                                    <FormLabel className="InputBox-text">类型:</FormLabel>
                                    <NativeSelect      
                                        style={{ width:'70%'}}                                  
                                        native
                                        value={this.state.privilegetype}
                                        onChange={this.handleChangegrouptype}
                                        name='privilegetype' 
                                        input={<Input name="privilegetype" id="privilegetype" />}
                                        >
                                        <option value=""/> 
                                        {this.state.findPrivilegeTypes.map((item,index) => {
                                            return (<option value={item.name} key={index}>{item.name}</option>)
                                        })
                                        } 
                                    </NativeSelect>
                                </div>
                                <div className="InputBox">
                                        <FormLabel className="InputBox-text">子类型:</FormLabel>
                                        <NativeSelect      
                                            style={{ width:'70%'}}                                  
                                            native
                                            value={this.state.privilegesubtype}
                                            onChange={this.handleChanegesubtype}
                                            name='privilegesubtype' 
                                            input={<Input name="privilegesubtype" id="privilegesubtype" />}
                                            >
                                            <option value=""/> 
                                            {this.state.findPrivilegSubTypes.map((item,index) => {
                                                return (<option value={item.name} key={index}>{item.name}</option>)
                                            })
                                            }
                                    </NativeSelect>
                                </div>
                                <div className="InputBox">
                        
                                </div>
                                {/* <div className="InputBox">
                                
                                </div> */}
                            </div>
                            <div className="button">
                                <Button className="button-class" variant="outlined" color="secondary" onClick={this.handleSubmit}>保存</Button>
                                <Button className="button-class" variant="outlined" color="secondary" onClick={this.cancelSubmit}>取消</Button>
                            </div>
                        </div>
                    </form>
                </SkyLight>
                <Button variant="contained" color="primary" style={{ 'margin': '10px,0', background: '#286090' }} onClick={this.findById}>修改</Button>
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

export default EditPrivilegeManagement;