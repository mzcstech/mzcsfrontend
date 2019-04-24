import React, { Component } from 'react';
import { SERVER_URL } from '../../constants.js'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';

//模糊查询

class QueryTemplate extends Component {
    constructor(props) {
        super(props)
        this.handValueChange = this.handValueChange.bind(this)
        this.state = {
            valueInput: '',
            processUrl: '',
            responseData: {}
        }
    }

    handleChange = (event) => {
        this.setState(
            { [event.target.name]: event.target.value }
        );
    }

    handValueChange(e) {
        this.setState({
            valueInput: e.target.value
        })
    }

    render() {
        console.log(this.props.NewresponseData, '子组件')
        console.log(this.state.valueInput)
        // console.log(this.state.responseData,'responseData')
        return (
            <div className="box">
                <InputLabel style={{ color: 'black' }} htmlFor="age-simple">下拉框:</InputLabel>
                <Select
                    className="downBox-form"
                    // value={this.state.TEMPLATE_SELECT}
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
                <div className="Separate"></div>
                <Input className="Input" onChange={this.handValueChange} placeholder="全局搜索" />
                {/* <FormControlLabel control={<FormLabel>单选框</FormLabel>} /> */}
                <div className="singleElection-text">业务类型:</div>
                <div className="singleElection-next">
                    <FormControlLabel control={
                        <Radio
                            checked={this.state.processUrl === '/commerce/listProcessByUser'}
                            onChange={this.handleChange}
                            value="commerce"
                            name="processUrl"
                            aria-label="工商注册"
                        />
                    } label="工商注册" />
                    <FormControlLabel control={
                        <Radio
                            checked={this.state.processUrl === '/tally/listProcessByUser'}
                            onChange={this.handleChange}
                            value="tally"
                            name="processUrl"
                            aria-label="代理记账"
                        />} label="代理记账" />
                    <FormControlLabel control={
                        <Radio
                            checked={this.state.processUrl === '/gShangChange/listProcessByUser'}
                            onChange={this.handleChange}
                            value="gShangChange"
                            color="default"
                            name="processUrl"
                            aria-label="工商变更"
                            icon={<RadioButtonUncheckedIcon fontSize="small" />}
                            checkedIcon={<RadioButtonCheckedIcon fontSize="small" />}
                        />} label="工商变更" />
                </div>
                <Button style={{ background: '#61bafb', color: '#ffffff', marginLeft: '10px' }}>搜索</Button>
            </div>
        )
    }
    componetDidMont() {
        console.log('componetWillMont')
    }
}
export default QueryTemplate;