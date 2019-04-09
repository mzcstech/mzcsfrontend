import React from 'react';
import SkyLight from 'react-skylight';
import { SERVER_URL } from '../constants.js';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
class EditTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            templeteId: this.props.templeteId,
            USER_ID: '',
            TEMPLATE_SELECT: '',
            TEMPLATE_DATE: '2019-05-24',
            TEMPLATE_DATETIME: '2019-05-24T10:30',
            TEMPLATE_RADIO: '',
            TEMPLATE_TEXTAREA: '',
            TEMPLATE_CHECKBOX:'',
            checkedA:false,
            checkedB:false,
            templateVo: null
        };
    }
    handleChange = (event) => {
        this.setState(
            { [event.target.name]: event.target.value }
        );

    }
    //多选框事件
    handleChangeCheckbox = name => event => {
        this.setState({ [name]: event.target.checked });
        console.log("name:" + name + "       " + "value:" + event.target.value)
        let checkedbox = this.state.TEMPLATE_CHECKBOX
        if (checkedbox !== null && checkedbox !== "") {            
            //判断TEMPLATE_CHECKBOX是否包含当前点击选项，如果包含，则移除，如果不包含，则添加
            if (checkedbox.indexOf(event.target.value)>=0) { 
                checkedbox = checkedbox.replace(event.target.value+",fh,","");
                this.setState(
                    { TEMPLATE_CHECKBOX: checkedbox }
                )
            } else {                
                checkedbox=checkedbox+event.target.value+",fh,";
                this.setState(
                    { TEMPLATE_CHECKBOX: checkedbox }
                )
            }
        } else {            
            checkedbox = event.target.value+",fh,"
            this.setState(
                { TEMPLATE_CHECKBOX: checkedbox }
            )            
        }       
        console.log(this.state.TEMPLATE_CHECKBOX)

    };
    // Save car and close modal form
    handleSubmit = (event) => {
        event.preventDefault();
        var templateVo = {
            TEMPLATE_ID: this.state.templeteId,           
            USER_ID: this.state.USER_ID,
            TEMPLATE_SELECT: this.state.TEMPLATE_SELECT,
            TEMPLATE_DATE: this.state.TEMPLATE_DATE,
            TEMPLATE_DATETIME: this.state.TEMPLATE_DATETIME,
            TEMPLATE_RADIO: this.state.TEMPLATE_RADIO,
            TEMPLATE_TEXTAREA: this.state.TEMPLATE_TEXTAREA,
            TEMPLATE_CHECKBOX:this.state.TEMPLATE_CHECKBOX
        };       
        this.props.editTemplate(templateVo);
        this.refs.editDialog.hide();
    }
    //查询详情，并展示详情页
    findById = (event) => {
        event.preventDefault();
        var templeteId = this.state.templeteId;
        fetch(SERVER_URL + '/template/findById/' + templeteId,
            {
                mode: "cors",
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept': '*/*'
                }
            })
            .then(res => res.json())
            .then((responseData) => {
                this.setState({
                    templateVo: responseData.data,
                    templeteId: responseData.data.template_ID,
                    USER_ID: responseData.data.user_ID,
                    TEMPLATE_SELECT: responseData.data.template_SELECT,
                    TEMPLATE_DATE: responseData.data.template_DATE,
                    TEMPLATE_DATETIME: responseData.data.template_DATETIME,
                    TEMPLATE_RADIO: responseData.data.template_RADIO,
                    TEMPLATE_TEXTAREA: responseData.data.template_TEXTAREA,
                    TEMPLATE_CHECKBOX:responseData.data.template_CHECKBOX
                });               
                console.log(this.state.templateVo)
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
    render() {   
        //alert(this.state.TEMPLATE_CHECKBOX)     
        return (
            <div>
                <SkyLight hideOnOverlayClicked ref="editDialog">
                    <h3>编辑模板</h3>
                    <form>
                        <input type="hidden" value={this.state.templeteId} name="TEMPLATE_ID"></input>
                        <FormLabel>输入框</FormLabel>
                        <TextField label="输入框" placeholder="USER_ID"
                            name="USER_ID" onChange={this.handleChange} value={this.state.USER_ID} /><br />
                        <InputLabel htmlFor="age-simple">下拉框</InputLabel>
                        <Select
                            value={this.state.TEMPLATE_SELECT}
                            onChange={this.handleChange}
                            inputProps={{
                                name: 'TEMPLATE_SELECT',
                                id: 'TEMPLATE_SELECT',
                            }}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="下拉框1">下拉框1</MenuItem>
                            <MenuItem value="下拉框2">下拉框2</MenuItem>
                            <MenuItem value="下拉框3">下拉框3</MenuItem>
                        </Select><br />
                        <FormLabel>日期选择器</FormLabel>
                        <TextField label="日期选择器" type="date" value={this.state.TEMPLATE_DATE} onChange={this.handleChange} name="TEMPLATE_DATE" InputLabelProps={{ shrink: true, }} />
                        <br />
                        <FormLabel>日期时间选择器</FormLabel>
                        <TextField label="日期时间选择器" type="datetime-local" value={this.state.TEMPLATE_DATETIME} onChange={this.handleChange} name="TEMPLATE_DATETIME" InputLabelProps={{ shrink: true, }} />
                        <br />


                        <FormControlLabel control={<FormLabel>单选框</FormLabel>} />
                        <FormControlLabel control={
                            <Radio
                                checked={this.state.TEMPLATE_RADIO === 'a'}
                                onChange={this.handleChange}
                                value="a"
                                name="TEMPLATE_RADIO"
                                aria-label="A"
                            />
                        } label="A" />
                        <FormControlLabel control={
                            <Radio
                                checked={this.state.TEMPLATE_RADIO === 'b'}
                                onChange={this.handleChange}
                                value="b"
                                name="TEMPLATE_RADIO"
                                aria-label="B"
                            />} label="B" />
                        <FormControlLabel control={
                            <Radio
                                checked={this.state.TEMPLATE_RADIO === 'e'}
                                onChange={this.handleChange}
                                value="e"
                                color="default"
                                name="TEMPLATE_RADIO"
                                aria-label="E"
                                icon={<RadioButtonUncheckedIcon fontSize="small" />}
                                checkedIcon={<RadioButtonCheckedIcon fontSize="small" />}
                            />} label="E" />

                        <br />

                        <FormControlLabel control={<FormLabel>多选框</FormLabel>} />
                        <div>
                            <Checkbox
                                checked={this.state.TEMPLATE_CHECKBOX!==null&&this.state.TEMPLATE_CHECKBOX.indexOf("checkedA")>=0?true:false}
                                onChange={this.handleChangeCheckbox('checkedA')}
                                value="checkedA"
                                name="checkedA"
                            />
                            <Checkbox
                                checked={this.state.TEMPLATE_CHECKBOX!==null&&this.state.TEMPLATE_CHECKBOX.indexOf("checkedB")>=0?true:false}
                                onChange={this.handleChangeCheckbox('checkedB')}
                                value="checkedB"
                                name="checkedB"
                                color="primary"
                            />
                        </div>
                        {/* <FormControlLabel control={<Checkbox checked={this.state.checkedA} onChange={this.handleChangeCheckbox('checkedA')} value="checkedA" />} label="Secondary" />
                        <FormControlLabel control={<Checkbox checked={this.state.checkedB} onChange={this.handleChangeCheckbox('checkedB')} value="checkedB" color="primary" />} label="Primary" />
                        */}
                        <br />
                        <TextField label="文本域" placeholder="TEMPLATE_TEXTAREA" multiline={true} rows={3}
                            name="TEMPLATE_TEXTAREA" onChange={this.handleChange} value={this.state.TEMPLATE_TEXTAREA}/>
                        <br />
                        <Button variant="outlined" color="secondary" onClick={this.handleSubmit}>保存</Button>
                        <Button variant="outlined" color="secondary" onClick={this.cancelSubmit}>取消</Button>
                    </form>
                </SkyLight>
                <div></div>
                <div>
                    <Button variant="contained" color="primary" style={{ 'margin': '10px' }}
                        onClick={this.findById}>修改</Button>
                </div>
            </div>
        );
    }

} export default EditTemplate;