import React from 'react';
import SkyLight from 'react-skylight';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Snackbar from '@material-ui/core/Snackbar';
import Radio from '@material-ui/core/Radio';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
function aa(){
    return(<div className="downBox">
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
</div>)
}

class AddTemplate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            USER_ID: '',
            TEMPLATE_SELECT: '',
            TEMPLATE_DATE: '2019-05-24',
            TEMPLATE_DATETIME: '2019-05-24T10:30',
            TEMPLATE_RADIO: '',
            checkedA: false,
            checkedB: false,
            TEMPLATE_TEXTAREA: '',
            TEMPLATE_CHECKBOX: "",
            open:false
        };
    }
 //提示框
    handleClose = (event, reason) => {
        this.setState({ open: false });
    };
    handleChange = (event) => {
        this.setState(
            { [event.target.name]: event.target.value }
        );

    }
    //多选框事件
    handleChangeCheckbox = name => event => {
        this.setState({ [name]: event.target.checked });
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
            USER_ID: this.state.USER_ID,
            TEMPLATE_SELECT: this.state.TEMPLATE_SELECT,
            TEMPLATE_DATE: this.state.TEMPLATE_DATE,
            TEMPLATE_DATETIME: this.state.TEMPLATE_DATETIME,
            TEMPLATE_RADIO: this.state.TEMPLATE_RADIO,
            TEMPLATE_TEXTAREA: this.state.TEMPLATE_TEXTAREA,
            TEMPLATE_CHECKBOX: this.state.TEMPLATE_CHECKBOX            
        };
        
        this.props.addTemplate(templateVo);
        this.refs.addDialog.hide();
        this.setState({
            open:true,
            message:'新增成功'
        })
    }

    // Cancel and close modal form
    cancelSubmit = (event) => {
        event.preventDefault();
        this.refs.addDialog.hide();
    }

    render() {
        return (
            <div>
                <SkyLight hideOnOverlayClicked ref="addDialog">
                    <h3 className="title">查看模板</h3>
                    <form>
                        <div className="OutermostBox">
                        <div className="tow-row">
                            <div className="InputBox">
                                <div className="InputBox-text">输入框:</div>
                                <TextField className="InputBox-next" placeholder="USER_ID"
                                    name="USER_ID" onChange={this.handleChange} />
                            </div>                        
                        {/* <div className="downBox">
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
                        </div> */}
                        <aa></aa>
                        <div className="dateChoice">
                            <FormLabel className="dateChoice-text">日期选择:</FormLabel>
                            <TextField className="dateChoice-form"  type="date" defaultValue="2019-05-24" onChange={this.handleChange} name="TEMPLATE_DATE" InputLabelProps={{ shrink: true, }} />
                        </div>
                        <div className="dateChoice">
                            <FormLabel className="dateChoice-text">日期时间选择:</FormLabel>
                            <TextField className="dateChoice-form"  type="datetime-local" defaultValue="2019-05-24T10:30" onChange={this.handleChange} name="TEMPLATE_DATETIME" InputLabelProps={{ shrink: true, }} />
                        </div>

                        <div className="singleElection">
                            {/* <FormControlLabel className="singleElection-text" control={<FormLabel >单选框:</FormLabel>} /> */}
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
                                checked={this.state.checkedA}
                                onChange={this.handleChangeCheckbox('checkedA')}
                                value="checkedA"
                                name="checkedA"
                            />
                            <Checkbox
                                checked={this.state.checkedB}
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
                            <TextField className="textDomain-class" label="文本域" placeholder="TEMPLATE_TEXTAREA" multiline={true} rows={2}
                                name="TEMPLATE_TEXTAREA" onChange={this.handleChange} />
                        </div>
                        <div className="button">
                            <Button className="button-class"  variant="outlined" color="secondary" onClick={this.handleSubmit}>保存</Button>
                            <Button className="button-class" variant="outlined" color="secondary" onClick={this.cancelSubmit}>取消</Button>
                        </div>    
                </div>
                    </form>
                </SkyLight>
                <div>
                    <Button variant="contained" color="primary" style={{ 'margin': '10px' }} onClick={() => this.refs.addDialog.show()}>新增</Button>
                </div>
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
export default AddTemplate;