import React from 'react';

import PropTypes from 'prop-types';
import Topbar from '../Topbar';
import LoanOriginal from './LoanOriginal'
import BorrowOriginal from './BorrowOriginal'
import OriginalTableHead from './OriginalTableHead';
import OriginalProcessRecords from './OriginalProcessRecords';
import EditOriginal from './EditOriginal';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Snackbar from '@material-ui/core/Snackbar';
import AddOriginal from './AddOriginal.js';
import OriginalConfirmed from './OriginalConfirmed.js';
import Button from '@material-ui/core/Button';
import { confirmAlert } from 'react-confirm-alert';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import { SERVER_URL } from '../../constants.js';
import './styles/Original.css'

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
let conpanameID = ''
class EnhancedTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      QX: {
        add: "",
        edit: "",
        del: "",
        cha: ""
      },
      selected: [],
      data: [
      ],
      page: 0,
      rowsPerPage: 5,
      total: 0,
      message: '',
      open: false,
      companyInformationId: '',
      companyName:'',
      href:''
    };
    this.editTemplate = this.editTemplate.bind(this)
    // this.batchimport = this.batchimport.bind(this)
    this.JudgeReturnValue = this.JudgeReturnValue.bind(this)
  }
  // 保存id
  componentWillMount(){
    let recvParam;
    let CdCompanyName;
    if (this.props.location.query != undefined) {
      recvParam = this.props.location.query.companyInformationId
      CdCompanyName = this.props.location.query.companyName
      sessionStorage.setItem('id', recvParam);
      sessionStorage.setItem('name', CdCompanyName);
    } else {
      recvParam = sessionStorage.getItem('id');
      CdCompanyName = sessionStorage.getItem('name');
    }
    this.setState({
      companyInformationId: recvParam,
      companyName :CdCompanyName,
      href:window.location.href
    },()=>{
      conpanameID =this.state.companyInformationId 
    })
  }
  // componentWillUpdate =()=>{
  //   this.state.companyInformationId=this.props.location.query.companyInformationId
  // }

  componentDidMount = () => {
    this.fetchTemplate();
  }
  //提示框的显示判断
  handleClose = (event, reason) => {
    this.setState({ open: false });
  };
  // 新增
  addTemplate(paramObj) {
    let person = []
    person.push(paramObj)
    let param1=  JSON.stringify(person);
    let param = new FormData()
    param.append("param",param1)
    fetch(SERVER_URL + '/original/save',
      {
        mode: "cors",
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json,text/plain,*/*'
        },
        body: param
      }
    )
      .then(res => this.fetchTemplate())
      .catch(err => console.error(err))
      conpanameID = ""
  }
  //修改
  editTemplate(params) {
    let companyInformationVo = new FormData()
    if (params) {
      for (let key in params) {
        companyInformationVo.append(key, params[key])
      }
    }
    fetch(SERVER_URL + '/original/edit',
      {
        mode: "cors",
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json,text/plain,*/*'
        },
        body: companyInformationVo
      })
      .then(res => {
        this.fetchTemplate()
      })
      .catch(err => console.error(err))
  }
  //删除
  onDelClick = (id) => {

    fetch(SERVER_URL + '/original/delete/' + id,
      {
        mode: "cors",
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Accept': '*/*'
        }
      })
      // fetch(SERVER_URL + 'cars/')
      .then(res => {
        this.setState({ open: true, message: '删除成功' });

        this.fetchTemplate()
      })
      .catch(err => {
        this.setState({ open: true, message: 'Error when deleting' });
        console.error(err)
      })
  }
  //确认是否删除
  confirmDelete = (id) => {
    confirmAlert({
      message: '确认是否删除?',
      buttons: [
        {
          label: '是',
          onClick: () => this.onDelClick(id)
        },
        {
          label: '否',
        }
      ]
    })
  }
  //分页
  fetchTemplate = () => {
    let originalQueryVo = new FormData();
    originalQueryVo.append("companyInformationId", this.state.companyInformationId)
    originalQueryVo.append("pageNum", this.state.page + 1)
    originalQueryVo.append("pageSize", this.state.rowsPerPage)
    fetch(SERVER_URL + '/original/list', {
      mode: "cors",
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json,text/plain,*/*'
      },
      body: originalQueryVo
    })
      .then((response) => response.json())
      .then((responseData) => {        
        this.setState({
          QX: {
            add: responseData.data.QX.add,
            edit: responseData.data.QX.edit,
            del: responseData.data.QX.del,
            cha: responseData.data.QX.cha
          },
          data: responseData.data.varList.list,
          page: responseData.data.varList.pageNum - 1,
          rowsPerPage: responseData.data.varList.pageSize,
          total: responseData.data.varList.total
        });
      })
      .catch(err => console.error(err));
  }
  //clickbox相关函数
  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.originalId) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    this.setState({ selected: newSelected });
  };
  // 页面更改时触发回调
  handleChangePage = (event, page) => {
    this.state.page = page;
    this.fetchTemplate();
  };
  // 每页的行数更改时触发回调
  handleChangeRowsPerPage = event => {
    this.state.rowsPerPage = event.target.value;
    this.fetchTemplate();
  };
  //判断返回值
  JudgeReturnValue=(value)=>{

  }
  isSelected = id => this.state.selected.indexOf(id) !== -1;
  render() {
    let NewUrl =  this.state.href.replace('/Original',"") + '/companyInformation'
    let linkStyle = { backgroundColor: '#303f9f', color: '#ffffff', height: '36px' }
    let linkReadonlyStyle = { backgroundColor: 'D1D1D1', color: '#A2A7B0', height: '36px' }
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.state.total - page * rowsPerPage);
    const currentPath = this.props.location.pathname;
    return (
      <Paper className={classes.root}>
        <Topbar currentPath={currentPath} />
        {/* <div className={classes.tableWrapper}>  
          <font>原件详情列表</font>
        </div> */}
        <AppBar style={{height:'60px'}} position="static"  color="default" className={classes.appBar}>
            <Toolbar style={{paddingLeft:'10px'}}>
              <Fab href={NewUrl} size="small" variant="extended" color="primary" aria-label="Add" style={{background:'#2196F3'}}>
                <NavigationIcon className={classes.extendedIcon} />
                  返回
              </Fab>
            <Typography style={{ paddingLeft: '40px' }} variant="h7" color="inherit" noWrap>
              原件详情列表 : {this.state.companyName}
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container>
          <div className="QueryTemplate">
            <Grid item>
              {this.state.QX.add == "1" ? (
                <AddOriginal addTemplate={this.addTemplate} fetchTemplate={this.fetchTemplate} companyInformationId={this.state.companyInformationId}  />
              ) : (
                  <Button size="small" style={linkStyle} variant="text" disabled="true"  >新增</Button>
              )}
            </Grid>
          </div>
         
        </Grid>
        
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            {/* 头列表页组件展示 */}
            <OriginalTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              rowCount={this.state.total}
            />
            <TableBody >
              {/* {stableSort(data, getSorting(order, orderBy)) */}
              {stableSort(data)
                .slice(0, rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.originalId);
                  // 便利显示列表页面
                  return (
                    <TableRow
                      className=""
                      hover
                      onClicock={event => this.handleClick(event, n.originalId)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.originalId}
                      selected={isSelected}
                    > 
                      <TableCell  className="TableCell" component="th" scope="row" align="center" padding="none" title={n.originalName !="" && n.originalName !=null ? n.originalName:n.otherBusiness!="" && n.otherBusiness !=null?n.otherBusiness:n.otherFinance!="" && n.otherBusiness !=null?n.otherFinance:""}>
                         {n.originalName !="" && n.originalName !=null ? n.originalName:n.otherBusiness!="" && n.otherBusiness !=null?n.otherBusiness:n.otherFinance!="" && n.otherFinance !=null ? n.otherFinance:""}
                      </TableCell>
                      <TableCell className="TableCell" component="th" scope="row" align="center" padding="none" title={n.originalAmount}>{n.originalAmount}</TableCell>
                      <TableCell className="TableCell" component="th" scope="row" align="center" padding="none" title={n.originalType}>{n.originalType =='0'?'其它原件':n.originalType=='1'?'工商原件':n.originalType=='2'?"财务原件":''}</TableCell>
                      <TableCell className="TableCell" align="center" padding="none" title={n.originalHolder}>{n.originalHolder}</TableCell>
                      <TableCell className="TableCell" align="center" padding="none" title={n.originalHoldStatus==='0'?'无':n.originalHoldStatus==='1'?'在客户处':n.originalHoldStatus==='2'?'在公司内部':''}>
                        {n.originalHoldStatus=='0'?'无':n.originalHoldStatus=='1'?'在客户处':n.originalHoldStatus=='2'?'在公司内部':''}
                      </TableCell>
                      <TableCell className="TableCell" align="center" padding="none" title={n.remark}>{n.remark}</TableCell>
                      <TableCell className="TableCell" align="center" padding="none" >
                        {this.state.QX.edit == "1" ? (
                          <EditOriginal editTemplate={this.editTemplate} id={n.originalId} originalName={n.originalName} />
                        ) : (
                          <Button size="small" style={linkStyle} variant="text" disabled="true" >修改</Button>
                          )}
                      </TableCell>
                      <TableCell className="TableCell" align="center" padding="none"><OriginalProcessRecords id={n.originalId} originalName={n.originalName} /></TableCell>
                      <TableCell className="TableCell" align="center" padding="none">
                        {n.hasLoanOutAuthorized ? (
                          <LoanOriginal id={n.originalId} fetchTemplate={this.fetchTemplate} />
                        ) : (
                            <Button size="small" style={linkReadonlyStyle} color="primary  " variant="text" disabled="true">借出</Button>
                          )}
                      </TableCell>
                      <TableCell className="TableCell" align="center" padding="none">
                        {n.hasLoanInAuthorized ? ( 
                          <BorrowOriginal id={n.originalId} fetchTemplate={this.fetchTemplate} />
                        ) : (
                            <Button size="small" style={linkReadonlyStyle} variant="text" disabled="true" >借入</Button>
                          )}
                      </TableCell>
                      <TableCell className="TableCell" align="center" padding="none">
                        {n.hasLoanOutConfirmed ? (
                          <OriginalConfirmed id={n.originalId} fetchTemplate={this.fetchTemplate} />
                        ) : (
                            <Button size="small" style={linkReadonlyStyle} variant="text" disabled="true">确认</Button>
                          )}
                      </TableCell>
                      <TableCell className="TableCell" align="center" padding="none">

                        {this.state.QX.del == "1" ? (
                          <Button size="small" style={linkStyle} variant="text" color="primary" onClick={() => { this.confirmDelete(n.originalId) }}>删除</Button>
                        ) : (
                            <Button size="small" style={linkStyle} variant="text" disabled="true" >删除</Button>
                          )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}

            </TableBody>
            <Snackbar
              style={{ width: 300, color: 'green' }}
              open={this.state.open}
              onClose={this.handleClose}
              autoHideDuration={1500}
              message={this.state.message}
            />
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={this.state.total}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}

          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);