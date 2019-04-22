import React,{ Component }from 'react';
import Input  from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { SERVER_URL } from '../../constants.js'
//模糊查询

class QueryTemplate extends Component{
    constructor(props){
        super(props)
        this.handValueChange = this.handValueChange.bind(this)
        this.state={
            valueInput:'',
            responseData:{}
        }
    }
  
    handValueChange(e){
        this.setState({
            valueInput :e.target.value
        })
    }
  
    // vagueQuery(){
    //     let templateVo = new FormData()
    //     let NewresponseData={}
    //     templateVo.append('TEMPLATE_DATE', '2019-05-24')
    //     fetch(SERVER_URL + '/template/list',
    //     {
    //         mode: "cors",
    //         method: 'POST',
    //         credentials: 'include',
    //         headers: {
    //             'Accept': '*/*'                  
    //         },
    //         body: templateVo
    //     })
    //     .then((response) => response.json())
    //     .then((responseData) => {
    //         NewresponseData:responseData.data.list
    //     })
    //     .catch(err =>{
    //         console.log(err,'失败')
    //     })
    // }
    render(){
        // console.log(this.props,'NewresponseData')
        console.log(this.state.valueInput)
        // console.log(this.state.responseData,'responseData')
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
                <Input className="Input"  onChange={this.handValueChange} placeholder="全局搜索"/>
        </div>
        )
    }
    componetDidMont(){
        console.log('componetWillMont')
    }
}
export default QueryTemplate;