import React,{ Component }from 'react';
import { SERVER_URL } from '../../constants.js'
import Input  from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
// import './styles/CompanyInformationQuery.css'
import Button from '@material-ui/core/Button';

//模糊查询

class QueryPrivilegeManagement extends Component{
    constructor(props){
        super(props)
        this.handcompanyNameChange       = this.handcompanyNameChange.bind(this)
        this.handoriginalHolderChange    = this.handoriginalHolderChange.bind(this)
        this.handoriginalOutStatusChange = this.handoriginalOutStatusChange.bind(this)
        this.handsearchBth               = this.handsearchBth.bind(this)
        this.state={
            companyName:'',
            originalHolder:'',
            originalOutStatus:'',
            singleElectionData:[],
            userList:[]
        }
    }
    componentWillMount(){
        fetch(SERVER_URL + '/dictionaries/findChildlListByBianma?bianma=ORIGINAL_OUT_STATUS',
        {
          mode: "cors",
          method: 'GET',
          credentials: 'include',
          headers: {
            "Accept": "*/*"
          },
        }
      )
        .then((response) => response.json())
        .then(res =>{
            this.setState({
                singleElectionData:res.data
            })
        })
        .catch(err => console.error(err,'err'))
        // this.findByName()
        this.findAllUser()
    }
    findAllUser() {
        fetch(SERVER_URL + '/user/listAll',
            {
                mode: "cors",
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': '*/*'
                },
                // body: user
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
    handcompanyNameChange(e){
        this.setState({companyName :e.target.value},()=>{
        })
    }
    handoriginalHolderChange(e){
        this.setState({originalHolder :e.target.value},()=>{
        })
    }
    handoriginalOutStatusChange(e){
        this.setState({originalOutStatus :e.target.value},()=>{
        })
    }
    handsearchBth(){
        this.props.fetchTemplate(this.state.companyName,this.state.originalHolder,this.state.originalOutStatus)
    }

    render(){
        return(
            <div className="box">
               
                <Input style={{width:'175px'}} className="Input" value={this.state.companyName}  onChange={this.handcompanyNameChange} placeholder="名称"/>
                <div className="Separate"></div>
                <InputLabel  style={{color:'black'}} >子类型:</InputLabel>
                    <NativeSelect    
                        style={{textAlign:'center',width:'175px'}}
                        native
                        value={this.state.originalHolder}
                        onChange={this.handoriginalHolderChange}
                        name='originalHolder' 
                        input={<Input name="name" id="name"  />}
                        >
                        {/* <option value="" /> 
                        {this.state.userList.map(item => {
                            return (<option  value={item.name}>{item.name}</option>)
                        })
                        } */}
                  </NativeSelect>
                <div className="Separate"></div>
                <InputLabel style={{color:'black'}} htmlFor="age-simple">code:</InputLabel>
                <NativeSelect
                    style={{textAlign:'center',width:'175px'}}
                    native
                    className="downBox-form"
                    value={this.state.originalOutStatus}
                    onChange={this.handoriginalOutStatusChange}
                    name='originalOutStatus' 
                    input={<Input name="name" id="name"  />}
                >
                    {/* <option value="" /> 
                    {
                        this.state.singleElectionData.map(item=>{
                            return(
                                <option value={item.bianma}>{item.name}</option>
                            )
                        })
                    } */}
                </NativeSelect>
                <div className="Separate"></div>
                <Button  onClick={this.handsearchBth} variant="contained" color="primary" >搜索</Button>
        </div>
        )
    }
    
}
export default QueryPrivilegeManagement;