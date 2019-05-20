import React from 'react';
import TextField from '@material-ui/core/TextField';
import NativeSelect from '@material-ui/core/NativeSelect';
import Button from '@material-ui/core/Button';
let i=0;
class PersonInformation extends React.Component {
    constructor(props) {
        super(props);        
         this.state = {
            personName:'',
            idCardNumber:'',
            gongzi:'',
            telephone:'',
            personType:'',
            remark:''
         }
    }
    handleChange = (event) => {
        this.setState(
            { [event.target.name]: event.target.value }
        );        
        var personInformation ={};
        personInformation = {
            personName: this.state.personName,
            idCardNumber: this.state.idCardNumber,
            gongzi: this.state.gongzi,
            telephone: this.state.telephone,
            personType: this.state.personType,
            remark: this.state.remark
        }        
        this.props.childValue(personInformation)
    }
    add() {        
       
    }

    delete() {
        this.props.deletePersonInformation();
        // const index = e.target.getAttribute("data-index");
        // const lists = this.state.lists;
        // document.getElementById(index).remove();
        // this.setState({ lists: lists })

    }

    render() {
        let linkStyle = { backgroundColor: '#303f9f', color: '#ffffff', height: '36px' };
        return (
            <tr>
                <td><TextField className="InputBox-next" placeholder="请输入姓名"
                    error={this.state.error} value={this.state.personName} ref="personName" name="personName" onChange={this.handleChange} />
                </td>
                <td><TextField className="InputBox-next" placeholder="请输入身份证号"
                    error={this.state.error} value={this.state.idCardNumber} ref="idCardNumber" name="idCardNumber" onChange={this.handleChange} />
                </td>
                <td><TextField className="InputBox-next" placeholder="请输入月工资"
                    error={this.state.error} value={this.state.gongzi} ref="gongzi" name="gongzi" onChange={this.handleChange} />
                </td>
                <td><TextField className="InputBox-next" placeholder="请输入联系电话"
                    error={this.state.error} value={this.state.telephone} ref="telephone" name="telephone" onChange={this.handleChange} />
                </td>
                <td> <NativeSelect
                    style={{ width: '110%' }}
                    native
                    value={this.state.personType}
                    onChange={this.handleChange}
                    name='personType'
                >
                <option value=""></option>
                    <option value="增加人员">增加人员</option>
                    <option value="减少人员">减少人员</option>
                    <option value="基数调整">基数调整</option>
                </NativeSelect ></td>
                <td><TextField className="InputBox-next" placeholder="备注"
                     value={this.state.remark} ref="remark" name="remark" onChange={this.handleChange} />
                </td>
                <td><Button size="small" style={linkStyle} variant="text" color="primary" onClick={() => { this.delete() }}>删除</Button></td>
            </tr>
        )
    }
}

export default PersonInformation;

