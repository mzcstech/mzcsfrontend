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
import Dialog from '@material-ui/core/Dialog';
//整体样式
class OriginalProcessRecords extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            OriginalId:'',
            data:[],
            originalFromUsername:'',
            originalFromTime:'',
            originalFromUsername:'',
            originalOutTime:'',
        };
    }    
    // 保存id
    componentWillMount(){
        let recvParam;
        if(this.props.location.query != undefined){
            recvParam = this.props.location.query.OriginalId
            sessionStorage.setItem('data',recvParam);
        }else{
            recvParam=sessionStorage.getItem('data');
        }
        this.setState({OriginalId:recvParam},()=>{
        var OriginalId = this.props.OriginalId;
        fetch(SERVER_URL + '/originalprocessrecords/list?originalId=' + '1f34588a6367488682df918ba73b7905',
            {
                mode: "cors",
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept': '*/*'
                }
            })
            .then((response) => response.json())
            .then(res =>{
                this.setState({data:res.data.list},()=>{
                    
                })
            })
            .catch(err =>
                this.setState({ open: true, message: 'Error when 查询详情' })
            )
        })
      }
    render() {      
        return (
            <div>
                <SkyLight hideOnOverlayClicked ref="editDialog">
                    <h3>原件管理公司信息-查看</h3>
                    <form>
                       <div className="OutermostBox">
                       <div className="tow-row" >
                                <div className="InputBox">                            
                                    <div className="InputBox-text">原件名称:</div>
                                    <TextField className="InputBox-next" name="原件名称"  value={this.state.companyName}  title="原件名称"/>
                                </div>
                                <div className="InputBox">                            
                                    <div className="InputBox-text">原件持有人:</div>
                                    <TextField className="InputBox-next"name="原件持有人"  value={this.state.companyName}  title="原件持有人"/>
                                </div>
                                <div className="InputBox">                            
                                    <div className="InputBox-text">借出时间:</div>
                                    <TextField className="InputBox-next"name="借出时间"  value={this.state.companyName}  title="借出时间"/>
                                </div>
                                <div className="InputBox">                            
                                    <div className="InputBox-text">借入人:</div>
                                    <TextField className="InputBox-next"name="借入人"  value={this.state.companyName}  title="借入人"/>
                                </div>
                                <div className="InputBox">                            
                                    <div className="InputBox-text">借入时间:</div>
                                    <TextField className="InputBox-next"name="借入时间"  value={this.state.companyName}  title="借入时间"/>
                                </div>
                                <div className="InputBox">                            
                                    {/* <div className="InputBox-text"></div>
                                    <TextField className="InputBox-next"name="借入时间"  value={this.state.companyName}  title="借入时间"/> */}
                                </div>
                       </div>     
                    </div>
                </form>
            </SkyLight>
        
             </div>
            
        );
    }

} 

export default OriginalProcessRecords;