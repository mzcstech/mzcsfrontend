import React,{ Component }from 'react';
import { SERVER_URL } from '../../constants.js'
import { Input } from 'antd';
// import Input  from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import { Select } from 'antd';
import './styles/CompanyInformationQuery.css'
import 'antd/dist/antd.css'
import Button from '@material-ui/core/Button';

//模糊查询
const { Option } = Select;
class QueryCompanyInformationl extends Component{
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
    handoriginalHolderChange(value){
        this.setState({originalHolder :`${value}`},()=>{
        })
    }
    handoriginalOutStatusChange(value){
        this.setState({originalOutStatus :`${value}`},()=>{ 
        })
    }
    handsearchBth(){
        this.props.fetchTemplate(this.state.companyName,this.state.originalHolder,this.state.originalOutStatus)
    }

    render(){
        return(
            <div className="box">
                <Input style={{width:'175px'}} className="Input" value={this.state.companyName}  onChange={this.handcompanyNameChange} placeholder="公司名称"/>
                <div className="Separate"></div>
                <InputLabel  style={{color:'black'}} >原件持有人:</InputLabel> 
                 <Select
                    showSearch
                    style={{ width: 175,marginLeft:'8px' }}
                    placeholder="可输入搜索内容"
                    optionFilterProp="children"
                    onChange={this.handoriginalHolderChange}
                    onSearch={this.onSearch}
                    // input={<Input name="name" id="name"  />}
                    filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    >
                    {this.state.userList.map(item => {
                        return (<Option  value={item.username}>{item.name}</Option>)
                    })
                    }
                </Select>
                <div className="Separate"></div>
                <InputLabel style={{color:'black'}} htmlFor="age-simple">流转状态:</InputLabel>
                <Select
                    showSearch
                    style={{ width: 175,marginLeft:'8px' }}
                    placeholder="可输入搜索内容"
                    optionFilterProp="children"
                    onChange={this.handoriginalOutStatusChange}
                    filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    >
                   {this.state.singleElectionData.map(item=>{
                        return(<Option  value={item.bianma}>{item.name}</Option>)
                    })
                    }
                </Select>
                <div className="Separate"></div>
                <Button  onClick={this.handsearchBth} variant="contained" color="primary" >搜索</Button>
        </div>
        )
    }
    
}
export default QueryCompanyInformationl;