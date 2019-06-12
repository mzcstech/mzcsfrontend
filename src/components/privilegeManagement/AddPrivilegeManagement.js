import React from 'react';
import SkyLight from 'react-skylight';
import { SERVER_URL } from '../../constants.js';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import FormLabel from '@material-ui/core/FormLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import List from '@material-ui/core/List';
import TreeMenu from 'react-simple-tree-menu';

class AddPrivilegeManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usergroupId:'',
            usergroupName:'',
            usergrouptype:'',
            usergroupsubtype:'',
            usergroupparentId:'',
            usergroupcode:'',
            findPrivilegeTypes:[],
            findPrivilegSubTypes:[],
            showThreeusergroup:false,
            showThreeparentId:false,
            three:[]

        };
        this.findPrivilegeTypes     = this.findPrivilegeTypes.bind(this)
        this.findById               = this.findById.bind(this)
        this.handleChange           = this.handleChange.bind(this)
        this.handleChangegrouptype  = this.handleChangegrouptype.bind(this)
        this.handleChanegesubtype   = this.handleChanegesubtype.bind(this)
        this.handleChangegeparentId = this.handleChangegeparentId.bind(this)
        this.getUsergroupFindByParentId=this.getUsergroupFindByParentId.bind(this)
        this.getUsergroupId            =this.getUsergroupId.bind(this)
        this.showThreeparentId         =this.showThreeparentId.bind(this)
        this.showThreeusergroup        =this.showThreeusergroup.bind(this)
        this.getparentId               = this.getparentId.bind(this)
    }
    handleChange = (event) => {
        this.setState(
            { usergroupName: event.target.value }
        );
    }
    handleChangegrouptype=(event) =>{
        this.setState(
            { usergrouptype: event.target.value }
        );
    }
    handleChanegesubtype=(event) =>{
        this.setState(
            { usergroupsubtype: event.target.value }
        );
    }
    handleChangegeusergroupId=(event) =>{
        this.setState(
            { usergroupId: event.target.value }
        );
    }
    handleChangegeparentId=(event) =>{
        this.setState(
            { usergroupparentId: event.target.value }
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
            this.setState({ open: true, message: 'Error when 新增详情' })
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
                this.setState({ open: true, message: 'Error when 新增详情' })
            )
        }
    //提示框 
    handleClose = (event, reason) => {
        this.setState({ open: false });
    };      
    // Save car and close modal form
    handleSubmit = (event) => {
        event.preventDefault();
        var usergroupInformationVo = {
            usergroupId:this.state.usergroupId,
            name: this.state.usergroupName,
            parentId:this.state.usergroupparentId,
            type: this.state.usergrouptype,
            subtype: this.state.usergroupsubtype,
        };
        this.props.addTemplate(usergroupInformationVo);
        this.refs.editDialog.hide();
        this.setState({
            open: true,
            message: '新增成功'
        })
    }
    //查询详情，并展示详情页
    findById = (event) => {
        this.refs.editDialog.show();
    }
    // Cancel and close modal form
    cancelSubmit = (event) => {
        event.preventDefault();
        this.refs.editDialog.hide();
    }
    componentDidMount(){
        this.getUsergroupFindByParentId()
    }
    //获取用户组树
    getUsergroupFindByParentId(){
        fetch(SERVER_URL + '/usergroup/findByParentId',{
          mode: "cors",
          method: 'POST',
          credentials: 'include',
          headers: {
            'Accept': 'application/json,text/plain,*/*'
          },
        })
        .then((response) => response.json())
        .then((responseData) => {
             this.setState({
               three:responseData.data
             })
        })
        .catch(err => console.error(err));
    }
    //修改树显示
    showThreeusergroup(){
        let NewshowThree = this.state.showThreeusergroup
         this.setState({
            showThreeusergroup:!NewshowThree
         })
    }
    showThreeparentId(){
        let NewshowThree = this.state.showThreeparentId
         this.setState({
            showThreeparentId:!NewshowThree
         })
    }
    getUsergroupId(e){
        console.log(e.parent)
        this.setState({
            usergroupId:e.parent
        })
    }
    getparentId(e){
        this.setState({
            usergroupparentId:e.parent
        })
    }
    render(){
        return (
            <div>
                <SkyLight  hideOnOverlayClicked ref="editDialog">
                    <h3>权限管理用户组-新增</h3>
                    <form>
                        <div className="OutermostBox">
                            <div className="tow-row" >
                                <div className="InputBox">
                                    <FormLabel className="InputBox-text">名称:</FormLabel>
                                    <Input   style={{ width:'70%'}}  className="InputBox-text" className="Input"    onChange={this.handleChange} value={this.state.usergroupName}  />
                                </div>    
                                <div className="InputBox">
                                    <FormLabel className="InputBox-text">类型:</FormLabel>
                                    <NativeSelect      
                                        style={{ width:'70%'}}                                  
                                        native
                                        value={this.state.usergrouptype}
                                        onChange={this.handleChangegrouptype}
                                        name='usergrouptype' 
                                        input={<Input name="usergrouptype" id="usergrouptype" />}
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
                                            value={this.state.usergroupsubtype}
                                            onChange={this.handleChanegesubtype}
                                            name='usergroupsubtype' 
                                            input={<Input name="usergroupsubtype" id="usergroupsubtype" />}
                                            >
                                            <option value=""/> 
                                            {this.state.findPrivilegSubTypes.map((item,index) => {
                                                return (<option value={item.name} key={index}>{item.name}</option>)
                                            })
                                            }
                                    </NativeSelect>
                                </div>
                                <div className="InputBox">
                                        <FormLabel className="InputBox-text">usergroupId:</FormLabel>
                                        <Input style={{ width:'75%'}}  className="InputBox-text" className="Input"    
                                        onChange={this.handleChangegeusergroupId}  value={this.state.usergroupId} onClick={this.showThreeusergroup} />
                                        <IconButton  onClick={this.showThreeusergroup} aria-label="Search">
                                                <SearchIcon />
                                        </IconButton>
                                </div>
                                <div className="InputBox">
                                        <FormLabel className="InputBox-text">parentId:</FormLabel>
                                        <Input style={{ width:'70%'}}  className="InputBox-text" className="Input"    
                                        onChange={this.handleChangegeparentId}  value={this.state.usergroupparentId} onClick={this.showThreeparentId} />
                                        <IconButton  onClick={this.showThreeparentId} aria-label="Search">
                                                <SearchIcon/>
                                        </IconButton>
                                </div>
                                    {
                                        (this.state.showThreeusergroup !== false)?
                                        <div className="InputBox" style={{height:'200px'}} >
                                        <List classNmae="left_boxs" style={{ width:'70%',maxHeight: 600,position: 'relative', overflow: 'auto',
                                            color:"rgba(0,0,0,.87)",borderTop:' 1px solid rgba(0,0,0,.05)',boxShadow:'0 5px 8px rgba(0,0,0,.15)',marginLeft:"30%"}}>
                                            <TreeMenu data={this.state.three} onClickItem={this.getusergroupId} ></TreeMenu>
                                        </List>    
                                        </div>
                                        :
                                        <div className="InputBox"></div>
                                    }
                                    {
                                        (this.state.showThreeparentId !== false)?
                                        <div className="InputBox" style={{height:'200px'}} >
                                        <List classNmae="left_boxs" style={{ width:'70%',maxHeight: 600,position: 'relative', overflow: 'auto',
                                            color:"rgba(0,0,0,.87)",borderTop:' 1px solid rgba(0,0,0,.05)',boxShadow:'0 5px 8px rgba(0,0,0,.15)',marginLeft:"30%"}}>
                                            <TreeMenu data={this.state.three} onClickItem={this.getparentId} ></TreeMenu>
                                        </List>    
                                        </div>
                                        :
                                        <div className="InputBox"></div>
                                    }
                                    <div className="InputBox"></div>
                            </div>
                            <div style={{height:'100px'}}></div>
                            <div className="button">
                                <Button className="button-class" variant="outlined" color="secondary" onClick={this.handleSubmit}>保存</Button>
                                <Button className="button-class" variant="outlined" color="secondary" onClick={this.cancelSubmit}>取消</Button>
                            </div>
                        </div>
                    </form>
                </SkyLight>
                <Button variant="contained" color="primary"  style={{ 'margin': '10px' }}  onClick={this.findById}>新增</Button>
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

export default AddPrivilegeManagement;