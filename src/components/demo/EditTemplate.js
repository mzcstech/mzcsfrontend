import React from 'react';
import SkyLight from 'react-skylight';
import { SERVER_URL } from '../../constants.js';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import Snackbar from '@material-ui/core/Snackbar';
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
            templateVo: null,
            open:false,
        };
    }
    handleChange = (event) => {
        this.setState(
            { [event.target.name]: event.target.value }
        );
    }
    //提示框
    handleClose = (event, reason) => {
        this.setState({ open: false });
    };
    //多选框事件
    handleChangeCheckbox = name => event => {
        this.setState({ [name]: event.target.checked });
        // console.log("name:" + name + "       " + "value:" + event.target.value)
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
        this.setState({
            open:true,
            message:'修改成功'
        })
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
                       <div className="OutermostBox">
                        <div   className="tow-row" >
                          <div className="InputBox">
                            <input type="hidden" value={this.state.templeteId} name="TEMPLATE_ID"></input>
                            <FormLabel className="InputBox-text">输入框:</FormLabel>
                            <TextField className="InputBox-next" placeholder="USER_ID"name="USER_ID" onChange={this.handleChange} value={this.state.USER_ID} />
                           </div>
                           <div className="downBox">
                                <InputLabel className="downBox-text" htmlFor="age-simple">下拉框:</InputLabel>
                                <Select
                                    className="downBox-form"
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
                                </Select>
                            </div>
                            <div className="dateChoice">
                                <FormLabel className="dateChoice-text">日期选择:</FormLabel>
                                <TextField className="dateChoice-form" type="date" value={this.state.TEMPLATE_DATE} onChange={this.handleChange} name="TEMPLATE_DATE" InputLabelProps={{ shrink: true, }} />
                            </div>
                            <div className="dateChoice">
                                <FormLabel className="dateChoice-text">时间选择:</FormLabel>
                                <TextField  className="dateChoice-form" type="datetime-local" value={this.state.TEMPLATE_DATETIME} onChange={this.handleChange} name="TEMPLATE_DATETIME" InputLabelProps={{ shrink: true, }} />
                            </div>

                            <div className="singleElection">
                                {/* <FormControlLabel control={<FormLabel>单选框</FormLabel>} /> */}
                                <div className="singleElection-text">单选框:</div>
                                <div className="singleElection-next">
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
                                  </div>
                            </div>
                            <div className="singleElection">
                            {/* <FormControlLabel control={<FormLabel>多选框</FormLabel>} /> */}
                                <div className="singleElection-text">多选框:</div>
                                <div className="singleElection-next">
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
                            </div>
                        </div>
                        {/* <FormControlLabel control={<Checkbox checked={this.state.checkedA} onChange={this.handleChangeCheckbox('checkedA')} value="checkedA" />} label="Secondary" />
                        <FormControlLabel control={<Checkbox checked={this.state.checkedB} onChange={this.handleChangeCheckbox('checkedB')} value="checkedB" color="primary" />} label="Primary" />
                        */}
                       <div className="textDomain">
                            <TextField  className="textDomain-class" label="文本域" placeholder="TEMPLATE_TEXTAREA" multiline={true} rows={2}
                            name="TEMPLATE_TEXTAREA" onChange={this.handleChange} value={this.state.TEMPLATE_TEXTAREA}/>
                       </div>
                       <div className="button">
                           <Button className="button-class" variant="outlined" color="secondary" onClick={this.handleSubmit}>保存</Button>
                           <Button className="button-class" variant="outlined" color="secondary" onClick={this.cancelSubmit}>取消</Button>
                        </div>
                    </div>
                </form>
            </SkyLight>
            <Button  variant="contained" color="primary"  style={{  'margin':'10px,0',background:'#286090'}} onClick={this.findById}>修改</Button>
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

export default EditTemplate;