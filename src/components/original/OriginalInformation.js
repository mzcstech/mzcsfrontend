import React from 'react';
import TextField from '@material-ui/core/TextField';
import NativeSelect from '@material-ui/core/NativeSelect';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import store from '../../store'
import FormLabel from '@material-ui/core/FormLabel';
import Input from '@material-ui/core/Input';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { SERVER_URL } from '../../constants.js';
let i = 0;
let str = "";
let originalInformations = []
class OriginalInformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            originalName: '',
            originalHoldStatus:'',
            bianma: '',
            remark:'',
            id: '',
            personInformation: {},
            personinformations: [],
            userList:[],
            singleElectionData:[],
            id:'',
            originalInformation:[]
        }
        this.getValue(props);
    }
    getValue = (event) => {
        //console.log(event.personalInformation);
    }
    //保存值到redux
    saveValueToRedux = (params) => {

    }
    //获取name
    findByName= () => { 
        var originalId = this.state.originalId;
        fetch(SERVER_URL + '/dictionaries/findChildlListByBianma?bianma=ORIGINAL_TYPE',
            {
                mode: "cors",
                method: 'GET',
                credentials: 'include',
                // bianma:'ORIGINAL_TYPE',
                headers: {
                    'Accept': '*/*'
                }
            })
            .then(res => res.json())
            .then((responseData) => {
                this.setState({ 
                    userList: responseData.data
                });
            })
            .catch(err =>
                this.setState({ open: true, message: 'Error when 修改详情' })
            )
    }
    //添加状态
    handleChangeRodio = (event) => {
        this.setState(
            { originalHoldStatus: event.target.value }
        );
    }    
    //持有状态
    componentWillMount(){
        fetch(SERVER_URL + '/dictionaries/findChildlListByBianma?bianma=ORIGINAL_HOLD_STATUS',
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
        this.findByName()
    }
    handleChange = (event) => {
        let originalInformation = {};
        this.setState({ [event.target.name]: event.target.value }, () => {
            originalInformation = {
                companyInformationId:this.props.companyInformationId,
                originalName: this.state.originalName,
                originalHoldStatus: this.state.bianma,
                remark: this.state.remark,
            };

        // originalInformations.push(originalInformation)
        // if(originalInformations.length>0){
        //     let hasObj = false;//数组是否存在对象
        //     originalInformations.forEach((item) =>{
        //         if(item.id == originalInformation.id){
        //              hasObj = true;
        //             //如果存在，替换数组对象 
        //             originalInformations.splice(originalInformations.findIndex(item => item.id === originalInformation.id), 1)
        //             originalInformations.push(originalInformation)
        //         }
        //     })
        //     if (!hasObj) {
        //         originalInformations.push(originalInformation)
        //     }else{
        //         originalInformations.push(originalInformation)
        //     }
        // }
        
        this.setState({
            originalInformation:originalInformation
        },()=>{
            this.props.savedata(this.state.originalInformation)
        })
        }
        );
    }


render() {
    let linkStyle = { backgroundColor: '#D9534f', color: '#ffffff', height: '36px',marginTop:'1%',marginLeft:'3%'};    
    return (
        <div className="tow-row" style={{borderBottom:'1px dashed #949494',paddingBottom:'15px'}}>
        <div className="InputBox">
                <FormLabel className="InputBox-text">原件名称:</FormLabel>
                <NativeSelect      
                    style={{ width:'70%'}}
                    value={this.state.originalName}
                    onChange={this.handleChange}
                    name='originalName' 
                    id={this.props.index}
                    input={<Input name="name" id="name" />
                }
                    >
                    <option value="" /> 
                    {
                    this.state.userList.map(item => {
                        return (<option value={item.name}>{item.name}</option>)
                    })
                    }
                </NativeSelect>
            </div>
                <div className="InputBox">
                <div className="singleElection-text">持有状态:</div>
                    <div className="singleElection-next" style={{width:'50%'}}>
                        {this.state.singleElectionData.map(item=>{
                            return (
                                <FormControlLabel control={
                                <Radio
                                    checked={this.state.bianma  === item.bianma}
                                    key={item.bianma}
                                    onChange={this.handleChange}
                                    value={item.bianma}
                                    name='bianma'
                                    aria-label={item.name}
                                    id={this.props.index}
                                />} label={item.name} />
                                )
                            })  
                        }
                    </div>
               
                </div>
                <div style={{width:"100%",display:'flex'}}>
                    <TextField style={{width:'70%',marginLeft:'10%'}}  label="备注" placeholder="备注" multiline={true} rows={2}
                    name="remark" value={this.state.remark} onChange={this.handleChange} id={this.props.index} />
                    
                 </div>
              </div>
    )
}
}

const mapStateToprops =(state)=>{
    return{
        personinformations:state.get('SocialSecurity').get('personinformations')
    }
}
const mapDispathToProps =(dispatch)=>{
    return{
        EDIT_PERSONINFORMATIONS(personInformation){
            const action = {
                type: "EDIT_PERSONINFORMATIONS",
                personInformation:personInformation
            }
            store.dispatch(action);
        }
    }
}
export default connect(mapStateToprops,mapDispathToProps)(OriginalInformation);
