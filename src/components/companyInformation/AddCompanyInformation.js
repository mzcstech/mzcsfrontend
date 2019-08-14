import React from 'react';
import SkyLight from 'react-skylight';
import { SERVER_URL } from '../../constants.js'
import { Select } from 'antd';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import InputLabel from '@material-ui/core/InputLabel';
// import { Input } from 'material-ui-icons';
require('./styles/CompanyInformation.css')
const { Option } = Select;
class AddTemplate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            customerId: '',
            remark: '',
            error:false,
            corporateData:[]
        };
        this.corporatename = this.corporatename.bind(this)
        this.handChangecorporatename = this.handChangecorporatename.bind(this)
        this.uploadBusinessexcel     = this.uploadBusinessexcel.bind(this)
        this.uploadFinanceexcel      = this.uploadFinanceexcel.bind(this)
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
    handChangecorporatename(value){
        this.setState({customerId :`${value}`},()=>{ 
        })
    }
    //多选框事件
    handleChangeCheckbox = name => event => {
        this.setState({ [name]: event.target.checked });
        let checkedbox = this.state.TEMPLATE_CHECKBOX
        if (checkedbox !== null && checkedbox !== "") {
            //判断TEMPLATE_CHECKBOX是否包含当前点击选项，如果包含，则移除，如果不包含，则添加
            if (checkedbox.indexOf(event.target.value) >= 0) {
                checkedbox = checkedbox.replace(event.target.value + ",fh,", "");
                this.setState(
                    { TEMPLATE_CHECKBOX: checkedbox }
                )
            } else {
                checkedbox = checkedbox + event.target.value + ",fh,";
                this.setState(
                    { TEMPLATE_CHECKBOX: checkedbox }
                )
            }
        } else {
            checkedbox = event.target.value + ",fh,"
            this.setState(
                { TEMPLATE_CHECKBOX: checkedbox }
            )
        }
    };
    // Save car and close modal form
    handleSubmit = (event) => {
        if(this.state.customerId != ''){
            var templateVo = {
                customerId: this.state.customerId,
                remark: this.state.remark
            };
            this.props.addTemplate(templateVo);
            this.refs.addDialog.hide();
            this.setState({
                customerId:'',
                remark:'',
                error:false,
                open: true,
                message: '新增成功'
            })
        }else{
            this.setState({
                error:true,
                open: true,
                message: '请填写公司名称'
            })
        }  
    }
    // Cancel and close modal form
    cancelSubmit = (event) => {
        this.setState({
            error:false,
        })
        event.preventDefault();
        this.refs.addDialog.hide();
    }
    componentDidMount(){
        this.corporatename()
    }
    //获取所有公司名称
    corporatename(){
        fetch(SERVER_URL + '/companyInformation/requeyAllFormalCompany',
        {
          mode: "cors",
          method: 'POST',
          credentials: 'include',
          headers: {
            "Accept": "*/*"
          },
        }
      )
        .then((response) => response.json())
        .then(res =>{
            this.setState({
                corporateData:res.data
            },()=>{
                
            })
        })
        .catch(err => console.error(err,'err'))
    
        // this.findAllUser()
    }
     //上传工商excel
     uploadBusinessexcel(e){
        e.preventDefault();
        let file = e.target.files[0];
        let formdata = new FormData();
        formdata.append('xlsx', file);
        for (var value of formdata.values()) {
          if(value.name.substring(value.name.length-3) =='xls' ){
            fetch(SERVER_URL + '/companyInformation/importBusinessExcel',{
                method: 'POST',
                body: formdata,
                credentials: 'include',
                headers: {
                    "Accept": "*/*"
                },
            }).then(res => res.json())
            
                 .then((res) => {
                    console.log(res)
                    this.setState({
                        message:'上传成功',
                        open:true
                    })
                    formdata=""
            })
            .catch(error => console.log(error));
          }else{
            alert('必须上传后缀为.xls文件')
           
          }
        }
    };
    //上传财务excel
    uploadFinanceexcel(e){
        e.preventDefault();
        let file = e.target.files[0];
        let formdata = new FormData();
        formdata.append('xlsx', file);
        for (var value of formdata.values()) {
            if(value.name.substring(value.name.length-3) =='xls' ){
                fetch(SERVER_URL + '/companyInformation/importFinanceExcel',{
                    method: 'POST',
                    body: formdata,
                    credentials: 'include',
                    headers: {
                        "Accept": "*/*"
                    },
                }).then(res => res.json())
                    .then((res) => {
                    this.setState({
                        message:'上传成功',
                        open:true
                    })
                    formdata=""            
                })
                  .catch(error => console.log(error));
            }else{
                alert('必须上传后缀为.xls文件')
            }
        }
       
    };
    render() {
        return (
            <div>
                <SkyLight style={{position:'relative'}} hideOnOverlayClicked ref="addDialog">
                    <h3 className="title">原件管理公司信息-新增</h3>
                    <form>
                        <div className="OutermostBox">
                            <div className="tow-row">
                            <div className="InputBox">
                            <div className="InputBox-text">原件公司:</div>
                                  <Select
                                    className="InputBox-next"
                                    showSearch
                                    style={{height:'30px',marginTop:'14px'}}
                                    placeholder="可输入搜索内容"
                                    optionFilterProp="children"
                                    onChange={this.handChangecorporatename}
                                    onSearch={this.onSearch}
                                    optionFilterProp="children"
                                    // input={<Input name="companyName" id="companyName"  />}
                                    filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    >
                                    {this.state.corporateData.map(item => {
                                        return (<Option  value={item.customerId}>{item.companyName}</Option>)
                                    })
                                    }  
                                 </Select>
                                    {/* <TextField className="InputBox-next" placeholder="请输入公司名称"
                                     error={this.state.error}  value={this.state.companyName} ref="companyName"  name="companyName" onChange={this.handleChange} /> */}
                               </div>
                                <div className="InputBox">
                                    <div className="InputBox-text">备注:</div>
                                    <TextField className="InputBox-next"  value={this.state.remark} placeholder="备注" multiline={true} 
                                        name="remark" onChange={this.handleChange} />
                                </div>
                            </div>
                                <div className="button">
                                    <Button className="button-class" variant="outlined" color="secondary" onClick={this.handleSubmit}>保存</Button>
                                    <Button className="button-class" variant="outlined" color="secondary" onClick={this.cancelSubmit}>取消</Button>
                                </div>
                        </div>
                    </form> 
                </SkyLight>
                <div className="addexcel">
                    <Button variant="contained" color="primary" style={{ 'margin': '10px' }} onClick={() => this.refs.addDialog.show()}>新增</Button>
                    <div className="addexcel">
                        <div>导入工商原件:</div>
                        <input style={{color:'#31b0d5',height:'36px',paddingLeft:'10px'}} type="file" name="pic" id="pic" onChange={this.uploadBusinessexcel} />
                    </div>
                    <div className="addexcel">
                        <div>导入财务原件:</div>
                        <input style={{color:'#31b0d5',height:'36px',paddingLeft:'10px'}} type="file" name="pic" id="pic" onChange={this.uploadFinanceexcel} />
                    </div>
                </div>
                <Snackbar
                    style={{ width: 300, color: 'green' }}
                    open={this.state.open}
                    onClose={this.handleClose}
                    autoHideDuration={3000}
                    message={this.state.message}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                />
            </div>
        );
    }
}
export default AddTemplate;