import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import TreeMenu from 'react-simple-tree-menu'
import SeelistUser from './SeelistUser'
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import Topbar from '../Topbar';
import SeeFollowUpProcess from './SeeFollowUpProcess.js';
import QueryFollowUpProcess from './QueryFollowUpProcess.js';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import EnhancedTableHead from './FollowUpProcessTableHead.js';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import { SERVER_URL } from '../../constants.js'
import './styles/FollowUpProcess.css'

function stableSort(array) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  return stabilizedThis.map(el => el[0]);
}
let NewprocessUrl =''
let judge         = false
class EnhancedTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: [],
      data: [],
      page: 0,
      rowsPerPage: 10,
      total: 0,
      message: '',
      open: false,
      procInstId: '',
      NewresponseData: {},
      valueInput: '', 
      map:[],
      three:[],
      Neweparent:'',
      processUrl:'/commerce/listProcessByDepartmentId',
      label:''
    };
    this.getlistHierarchy = this.getlistHierarchy.bind(this)
    this.postParentId     = this.postParentId.bind(this)
    this.fetchTemplate    = this.fetchTemplate.bind(this)
    this.handleChangePage = this.handleChangePage.bind(this)
    this.judgeFatherFun   =this.judgeFatherFun.bind(this)
  }  
  //根据选择业务类型跳转页面
  handleUrl = (val) => {
    this.setState({ processUrl: val }, () => {
      this.state.page = 0
      this.fetchTemplate()
    })
  }
  judgeFatherFun(){
    judge = true
    this.fetchTemplate()
  }
  //根据签单人查询
  handleValue = (val) => {
    this.setState({ valueInput: val }, () => {
      this.fetchTemplate()
    })
  }
  //按钮搜索查询
  handleSearch = (val) => {
    this.fetchTemplate()

  }
  //组件御载时触发
  componentDidMount = () => {
    this.getlistHierarchy()
    this.fetchTemplate();
  }
  //提示框的显示判断
  handleClose = (event, reason) => {
    this.setState({ open: false });
  }; 

  //获取部门列表树
  getlistHierarchy(){
    fetch(SERVER_URL + '/department/listHierarchy',{
      mode: "cors",
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json,text/plain,*/*'
      }
    })
    .then((response) => response.json())
    .then((responseData) => {
          this.setState({
           three:responseData.data
         },()=>{
           for(let item of responseData.data){
            this.setState({
              label:item.label
            },()=>{
            })
           }
         })
    })
    .catch(err => console.error(err));
  }
  //根据点击查询列表
  postParentId(e){
       judge = false
       if(e !== undefined && e !== ''){
        let Neweparent = e.key.substring(e.key.lastIndexOf("/")+1)
        this.setState({
         Neweparent:Neweparent
        },()=>{
          this.fetchTemplate(this.state.Neweparent)
        })
       }
  }
  //分页
  fetchTemplate = (staffId) => {
      let followUpVo = new FormData();
      followUpVo.append("pageNum", this.state.page + 1)
      followUpVo.append("pageSize", this.state.rowsPerPage)
      followUpVo.append("signPerson", this.state.valueInput)
      let NewUsrl = ''
      if(judge == true){
        NewUsrl = this.state.processUrl
      }else{
        if(staffId != '' && staffId !=null && staffId != undefined ){
          NewprocessUrl = staffId
        } 
        if(NewprocessUrl != '' && NewprocessUrl !=null && NewprocessUrl != undefined ){
           NewUsrl = this.state.processUrl + '?departmentId=' + NewprocessUrl
        }else{
           NewUsrl = this.state.processUrl
        }
      }
      fetch(SERVER_URL  + NewUsrl , { 
        mode: "cors",
        method: 'POST', 
        credentials: 'include',
        headers: {
          'Accept': 'application/json,text/plain,*/*'
        },
        body: followUpVo
      })
        .then((response) => response.json())
        .then((responseData) => {
          this.setState({
            data: responseData.data.list,
            map:responseData.data.map,
            page: responseData.data.pageNum - 1,
            rowsPerPage: responseData.data.pageSize,
            total: responseData.data.total
          });
        })
        .catch(err => console.error(err));
    }

  //clickbox相关函数
  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.tEMPLATE_ID) }));
      return;
    }
    this.setState({ selected: [] });
  };

  // 页面更改时触发回调
  handleChangePage = (event, page) => {
    this.state.page = page;
    this.fetchTemplate()
  };
  // 每页的行数更改时触发回调
  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
    this.fetchTemplate()
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;
  render() {
    let linkStyle = { backgroundColor: '#c9302c', color: '#ffffff', height: '36px' }
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page, three ,Neweparent,label} = this.state; 
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.state.total - page * rowsPerPage); 
    const currentPath = this.props.location.pathname;
    return (
      <Paper>
        <Topbar currentPath={currentPath} />
        <Grid container>
        <AppBar style={{ height: '60px' }} position="static" color="default" >
          <Toolbar>
          <div className="QueryFollowUpProcess">
            <div className="QueryFollowUpProcessInto" >
              <QueryFollowUpProcess map={this.state.map} handleUrl={this.handleUrl} handleValue={this.handleValue} handleSearch={this.handleSearch} NewresponseData={this.state.NewresponseData} judgeFatherFun={this.judgeFatherFun} />
            </div>
          </div>
          </Toolbar> 
         </AppBar>
        </Grid>
        <div className="nav_box" style={{width:"100%"}}>
          {
            label !== null && label !== '' && label !== undefined ?
            <List classNmae="left_boxs" style={{width:'17%',maxHeight: 600,position: 'relative', overflow: 'auto',color:"rgba(0,0,0,.87)",borderTop:' 1px solid rgba(0,0,0,.05)',boxShadow:'0 5px 8px rgba(0,0,0,.15)',marginTop:'24px',marginLeft:"0.5%"}}>
              <TreeMenu data={three} onClickItem={this.postParentId}></TreeMenu>
           </List>:
            null
          
          }
         
          
        {/* 员工显示组件 */}
        {/* <SeelistUser openUser={openUser} Neweparent={Neweparent} ref="getSwordButton" fetchTemplate={this.fetchTemplate} ></SeelistUser> */}
        <div style={{marginRight:'0.5%',width:'99%',float:"right",marginLeft:"0.5%",marginTop:'24px' }}>
          <Table  aria-labelledby="tableTitle">
            {/* 头列表页组件展示 */}
            <EnhancedTableHead
              numSelected={selected.length}
              order={order} 
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              rowCount={this.state.total}
            />
            <TableBody >
              {stableSort(data)
                .slice(0, rowsPerPage)
                .map((n,index) => {
                  return ( 
                    <TableRow
                      hover
                      role="checkbox" 
                      key={index}
                    >
                      <TableCell className="TableCell" align="center" padding="none" title={n.companyName}>{n.companyName}</TableCell>
                      <TableCell className="TableCell" align="center" padding="none" title={n.contractDate}>{n.contractDate}</TableCell>
                      <TableCell className="TableCell" align="center" padding="none" title={n.signPerson}>{n.signPerson}</TableCell>
                      <TableCell className="TableCell" align="center" padding="none" title={n.customer}>{n.customer}</TableCell>
                      <TableCell className="TableCell" align="center" padding="none" title={n.businessTypes}>{n.businessTypes}</TableCell>
                      <TableCell className="TableCell" align="center" padding="none" title={n.actName}>{n.actName}</TableCell>
                      <TableCell className="TableCell" align="center" padding="none" title={n.actAssignee}>{n.actAssignee}</TableCell>
                      <TableCell className="TableCell" align="center" padding="none"  >
                        <SeeFollowUpProcess  fetchFollowUpProcess={this.fetchFollowUpProcess} procInstId={n.procInstId} />
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
        </div>
        <TablePagination
          rowsPerPageOptions={[10]}
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

export default (EnhancedTable);
