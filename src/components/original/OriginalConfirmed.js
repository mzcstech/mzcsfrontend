import React from 'react';
import SkyLight from 'react-skylight';
import { SERVER_URL } from '../../constants.js';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Snackbar from '@material-ui/core/Snackbar';
class LoanOriginal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            originalId: this.props.id,
            open: false,
            originalOutTo: '',
            userList: [],
            companyName: '',
            originalName: '',
            originalHolder: ''

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

    //驳回
    handleSubmitReject = (event) => {
        event.preventDefault();
        var original = {
            originalOutTo: this.state.originalOutTo,
            companyName: this.state.companyName,
            originalName: this.state.originalName,
            originalHolder: this.state.originalHolder,
            originalId: this.state.originalId
        };
        this.loanOutReject(original);
        this.refs.editDialog.hide();
        this.setState({
            open: true,
            message: 'success'
        })
    }
    loanOutReject(params) {
        console.log(params)
        let original = new FormData()
        if (params) {
            for (let key in params) {
                original.append(key, params[key])
            }
        }
        console.log(original)
        fetch(SERVER_URL + '/original/reject',
            {
                mode: "cors",
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json,text/plain,*/*'
                },
                body: original
            })
            .then(res => this.props.fetchTemplate())
            .catch(err => console.error(err))
    }

    //确认
    handleSubmit = (event) => {
        event.preventDefault();
        var original = {
            originalOutTo: this.state.originalOutTo,
            companyName: this.state.companyName,
            originalName: this.state.originalName,
            originalHolder: this.state.originalHolder,
            originalId: this.state.originalId
        };
        this.loanOutConfirmed(original);
        this.refs.editDialog.hide();
        this.setState({
            open: true,
            message: '成功'
        })
    }

    loanOutConfirmed(params) {
        console.log(params)
        let original = new FormData()
        if (params) {
            for (let key in params) {
                original.append(key, params[key])
            }
        }
        console.log(original)
        fetch(SERVER_URL + '/original/loanOutConfirmed',
            {
                mode: "cors",
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json,text/plain,*/*'
                },
                body: original
            })
            .then(res => this.props.fetchTemplate())
            .catch(err => console.error(err))
    }

    findAllUser(params) {
        let user = new FormData()
        if (params) {
            for (let key in params) {
                user.append(key, params[key])
            }
        }
        fetch(SERVER_URL + '/user/listAll',
            {
                mode: "cors",
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': '*/*'
                },
                body: user
            })
            .then(res => res.json())
            .then((res) => {
                this.setState({
                    userList: res.data
                });
            })
            .catch(err =>
                this.setState({ open: true, message: 'Error when 获取User列表' })
            )
    }

    //根据输入的姓名过滤userList
    searchUser = (event) => {
        console.log(event.value)

    }
    //查询详情，并展示详情页
    findById = (event) => {
        this.findAllUser(event);
        event.preventDefault();
        var originalId = this.state.originalId;
        fetch(SERVER_URL + '/original/findById/' + originalId,
            {
                mode: "cors",
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept': '*/*'
                }
            })
            .then(res => res.json())
            .then((res) => {
                this.setState({
                    originalOutTo: res.data.originalOutTo,
                    companyName: res.data.companyName,
                    originalName: res.data.originalName,
                    originalHolder: res.data.originalHolder
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
        console.log(this.state.originalOutTo)
        //alert(this.state.TEMPLATE_CHECKBOX)     
        return (
            <div>
                <SkyLight hideOnOverlayClicked ref="editDialog">
                    <h3>确认页面</h3>
                    <form>
                        <div className="OutermostBox">
                            <div className="tow-row" >
                                <div className="InputBox">
                                    <input type="hidden" value={this.state.originalId} name="originalId"></input>
                                    <FormLabel className="InputBox-text">公司名称:</FormLabel>
                                    <TextField className="InputBox-next" placeholder="companyName" disabled='true' name="companyName" onChange={this.handleChange} value={this.state.companyName} />
                                </div>
                                <div className="InputBox">
                                    <FormLabel className="InputBox-text">原件名称:</FormLabel>
                                    <TextField className="InputBox-next" placeholder="originalName" disabled='true' name="originalName" onChange={this.handleChange} value={this.state.originalName} />
                                </div>
                                <div className="InputBox">
                                    <FormLabel className="InputBox-text">当前原件持有人:</FormLabel>
                                    <TextField className="InputBox-next" placeholder="originalHolder" disabled='true' name="originalHolder" onChange={this.handleChange} value={this.state.originalHolder} />
                                </div>
                                <div className="InputBox">
                                    <FormLabel className="InputBox-text">借出对象:</FormLabel>
                                    <TextField className="InputBox-next" placeholder="originalHolder" disabled='true' name="originalHolder" onChange={this.handleChange} value={this.state.originalOutTo} />
                                </div>
                            </div>
                            <div className="button" style={{ position: 'absolute,botton:20px' }}>
                                <Button className="button-class" variant="outlined" color="secondary" onClick={this.handleSubmit}>确认</Button>
                                <Button className="button-class" variant="outlined" color="secondary" onClick={this.handleSubmitReject}>驳回</Button>
                                <Button className="button-class" variant="outlined" color="secondary" onClick={this.cancelSubmit}>取消</Button>
                            </div>
                        </div>
                    </form>
                </SkyLight>
                <Button variant="contained" color="primary" onClick={this.findById}>确认</Button>
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

export default LoanOriginal;