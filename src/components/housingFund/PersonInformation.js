import React from 'react';
import TextField from '@material-ui/core/TextField';
import NativeSelect from '@material-ui/core/NativeSelect';
import Button from '@material-ui/core/Button';
import store from '../../store'
let i = 0;
let str = "";
class PersonInformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            personName: '',
            idCardNumber: '',
            gongzi: '',
            telephone: '',
            personType: '',
            remark: '',
            id: '',
            personInformation: {},
            personinformations: []
        }
        this.getValue(props);
    }
    getValue = (event) => {
        //console.log(event.personalInformation);
        // var personinformations = store.getState().personinformations;
    }

    handleChange = (event) => {
        var id = event.target.id;
        var personInformation = {};
        var personinformations = store.getState().personinformations;
        personinformations.forEach((perinformation) => {
            if (perinformation.id == id) {                
                this.setState({
                    personName: perinformation.personName,
                    idCardNumber: perinformation.idCardNumber,
                    gongzi: perinformation.gongzi,
                    telephone: perinformation.telephone,
                    personType: perinformation.personType,
                    remark: perinformation.remark,
                    id: id
                })
            }
        })
        this.setState({ [event.target.name]: event.target.value }, () => {
            personInformation = {
                personName: this.state.personName,
                idCardNumber: this.state.idCardNumber,
                gongzi: this.state.gongzi,
                telephone: this.state.telephone,
                personType: this.state.personType,
                remark: this.state.remark,
                id: id
            };

            //判断personinformations是否存在personInformation
            if (personinformations.length > 0) {
                var hasObj = false;//数组是否存在对象
                personinformations.forEach((perinformation) => {
                    if (perinformation.id == personInformation.id) {
                        hasObj = true;
                        //如果存在，替换数组对象                      
                        personinformations.splice(personinformations.findIndex(item => item.id === personInformation.id), 1)
                        personinformations.push(personInformation)
                    }
                })
                if (!hasObj) {
                    personinformations.push(personInformation)
                }
            } else {
                personinformations.push(personInformation)
            }
            //将personInformation 放到store.getState().personinformations里
            const action = {
                type: "EDIT_PERSONINFORMATIONS",
                personinformations
            }
            store.dispatch(action);
            //console.log(store.getState().personinformations, "getStore")
            this.setState.personinformations = personinformations

        }
        );
    }
    add() {

    }
    //删除一行
    delete = (index) => {
        var personinformations = store.getState().personinformations;
        personinformations.splice(personinformations.findIndex(item => item.id === index), 1);
        this.props.deletePersonInformation(index, this.props.personDoms);
    }

    render() {
        let linkStyle = { backgroundColor: '#303f9f', color: '#ffffff', height: '36px' };
        var perinformation = this.props.personInformation;

        var perinformationIsNull = true;
        if (perinformation != null) {
            perinformationIsNull = false;
        }

        return (
            <tr key={this.props.key} >
                <td><TextField className="InputBox-next" placeholder="请输入姓名"
                    error={this.state.error} value={this.state.personName == '' && !perinformationIsNull ? perinformation.personName : this.state.personName} ref="personName" name="personName" id={this.props.index} onChange={this.handleChange} />
                </td>
                <td><TextField className="InputBox-next" placeholder="请输入身份证号"
                    error={this.state.error} value={this.state.idCardNumber == '' && !perinformationIsNull ? perinformation.idCardNumber : this.state.idCardNumber} ref="idCardNumber" name="idCardNumber" id={this.props.index} onChange={this.handleChange} />
                </td>
                <td><TextField className="InputBox-next" placeholder="请输入月工资"
                    error={this.state.error} value={this.state.gongzi == '' && !perinformationIsNull ? perinformation.gongzi : this.state.gongzi} ref="gongzi" name="gongzi" id={this.props.index} onChange={this.handleChange} />
                </td>
                <td><TextField className="InputBox-next" placeholder="请输入联系电话"
                    error={this.state.error} value={this.state.telephone == '' && !perinformationIsNull ? perinformation.telephone : this.state.telephone} ref="telephone" name="telephone" id={this.props.index} onChange={this.handleChange} />
                </td>
                <td> <NativeSelect
                    style={{ width: '110%' }}
                    native
                    value={this.state.personType == '' && !perinformationIsNull ? perinformation.personType : this.state.personType}
                    onChange={this.handleChange}
                    id={this.props.index}
                    name='personType'
                >
                    <option value=""></option>
                    <option value="增加人员">增加人员</option>
                    <option value="减少人员">减少人员</option>
                    <option value="基数调整">基数调整</option>
                </NativeSelect ></td>
                <td><TextField className="InputBox-next" placeholder="备注"
                    value={this.state.remark == '' && !perinformationIsNull ? perinformation.remark : this.state.remark} ref="remark" name="remark" id={this.props.index} onChange={this.handleChange} />
                </td>
                <td><Button size="small" style={linkStyle} variant="text" color="primary" onClick={() => { this.delete(this.props.index) }}>删除</Button></td>
            </tr>
        )
    }
}

export default PersonInformation;

