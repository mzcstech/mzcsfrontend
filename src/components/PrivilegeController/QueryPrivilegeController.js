import React,{ Component }from 'react';
import { SERVER_URL } from '../../constants.js'
import { connect } from 'react-redux'
import Input  from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
// import './styles/CompanyInformationQuery.css'
import Button from '@material-ui/core/Button';

//模糊查询

class QueryPrivilegeController extends Component{
    constructor(props){
        super(props)
        this.handcompanyNameChange       = this.handcompanyNameChange.bind(this)
        this.findAllUser                 = this.findAllUser.bind(this)
        this.handsearchBth               = this.handsearchBth.bind(this)
        this.state={
            usergroupId:'',
            originalHolder:'',
            originalOutStatus:'',
            singleElectionData:[],
            queryList:[]
        }
    }

    findAllUser() {
        let usergroupId = this.state.usergroupId
        fetch(SERVER_URL + '/usergroup/findById?usergroupId='+ usergroupId,
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
        this.setState({usergroupId :e.target.value},()=>{
        })
    }
    handsearchBth(){
        this.props.fetchTemplate(this.state.queryList)
    }
    render(){
        return(
            <div className="box">
                <Input style={{width:'175px'}} className="Input" value={this.state.usergroupId}  onChange={this.handcompanyNameChange} placeholder="ID"/>
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
export default connect(mapStateToprops,mapDispathToProps)(QueryPrivilegeController);