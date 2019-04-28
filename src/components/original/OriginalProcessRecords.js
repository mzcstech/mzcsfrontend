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
//整体样式
const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
    },
    table: {
      minWidth: 1020,
    },
    tableWrapper: {
      overflowX: 'auto',
    },
  });
  function stableSort(array) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    return stabilizedThis.map(el => el[0]);
  }
class OriginalProcessRecords extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            OriginalId:'',
            originalFromUsername:'',
            originalFromTime:'',
            originalFromUsername:'',
            originalOutTime:'',

            
        };
    }    
    // // 保存id
    // componentWillMount(){
    //     let recvParam;
    //     if(this.props.location.query != undefined){
    //         recvParam = this.props.location.query.companyInformationId
    //         sessionStorage.setItem('data',recvParam);
    //     }else{
    //         recvParam=sessionStorage.getItem('data');
    //     }
    //     this.setState({
    //         OriginalId:recvParam
    //     })
    //   }
    //查询详情，并展示详情页
    findById = (event) => {
        event.preventDefault();
        var OriginalId = this.state.OriginalId;
        fetch(SERVER_URL + '/originalprocessrecords/list?originalId=' + OriginalId,
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
                console.log(res.data.list,'OriginalProcessRecords')
            })
            // .then((responseData) => {
            //     // this.setState({
            //     //     companyInformationVo: responseData.data,
            //     //     companyName: responseData.data.companyName,
            //     //     remark: responseData.data.remark,
            //     //     companyInformationId:responseData.data.companyInformationId
            //     // });                 
            //     console.log(this.state.responseData)
            // })
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
            <Button  variant="contained" color="primary"  style={{ 'margin':'10px,0',background:'#31b0d5' }} onClick={this.findById}>查看</Button>
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

export default OriginalProcessRecords;