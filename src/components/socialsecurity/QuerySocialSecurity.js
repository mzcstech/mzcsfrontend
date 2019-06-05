import React,{ Component }from 'react';
import { SERVER_URL } from '../../constants.js'
import Input  from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import './styles/SocialSecurityQuery.css'

import Button from '@material-ui/core/Button';

//模糊查询

class QuerySocialSecurity extends Component{
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
                <Input style={{width:'175px'}} className="Input" value={this.state.companyName}  onChange={this.handcompanyNameChange} placeholder="公司名称"/>                               
                <Button  onClick={this.handsearchBth} variant="contained" color="primary" >搜索</Button>
        </div>
        )
    }
    
}
export default QuerySocialSecurity;