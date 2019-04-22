import React,{ Component }from 'react';
import Input  from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
class QueryTemplate extends Component{
    constructor(props){
        super(props)
        
    }
    render(){
        return(
            <div className="box">
                    <InputLabel style={{color:'black'}} htmlFor="age-simple">下拉框:</InputLabel>
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
                <Input className="Input" placeholder="全局搜索"/>
        </div>
        )
    }
}
export default QueryTemplate;