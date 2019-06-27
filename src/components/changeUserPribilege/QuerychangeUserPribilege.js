import React,{ Component }from 'react';
import { SERVER_URL } from '../../constants.js'
import { connect } from 'react-redux'
import Input  from '@material-ui/core/Input';
// import './styles/CompanyInformationQuery.css'
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import { Select } from 'antd';
//模糊查询
const { Option } = Select;
class QuerychangeUserPribilege extends Component{
    constructor(props){
        super(props)
        this.handcompanyNameChange       = this.handcompanyNameChange.bind(this)
        this.findAllUser                 = this.findAllUser.bind(this)
        this.handsearchBth               = this.handsearchBth.bind(this)
        this.state={
            userNmae:'',
            queryList:[]
        }
    }

    findAllUser() {
        let userNmae = this.state.userNmae
        fetch(SERVER_URL + '/user/list?name='+ userNmae,
            {
                mode: "cors",
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': '*/*'
                },
            })
            .then(res => res.json())
            .then((res) => {
                this.setState({queryList: res.data},()=>{
                    this.handsearchBth()
                });                
            }) 
            .catch(err =>
                this.setState({ open: true, message: 'Error when 获取User列表' })
            )
    }
    handcompanyNameChange(e){
        this.setState({userNmae :e.target.value},()=>{
        })
    }
    handsearchBth(){
        this.props.postUserName(this.state.queryList)
    }
    render(){
        return(
            <div className="box">
                <InputLabel  style={{color:'black'}} >人员名称:</InputLabel> 
                <Input style={{ width: 175,marginLeft:'8px' }} className="Input" value={this.state.userNmae}  onChange={this.handcompanyNameChange} placeholder="ID"/>
                    <div className="Separate"></div>
                <Button  onClick={this.findAllUser} variant="contained" color="primary" >搜索</Button>
             </div>
        )
    }
    
}   
const mapStateToprops =(state)=>{
    return{
        
    }
}
const mapDispathToProps =(dispatch)=>{
    return{

    }
}
export default connect(mapStateToprops,mapDispathToProps)(QuerychangeUserPribilege);