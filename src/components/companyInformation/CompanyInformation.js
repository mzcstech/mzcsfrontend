import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Snackbar from '@material-ui/core/Snackbar';
import Topbar from '../Topbar';
import AddCompanyInformation from './AddCompanyInformation.js';
import EditCompanyInformation from './EditCompanyInformation.js';
import ViewCompanyInformation from './ViewCompanyInformation.js';
import CompanyInformationEnhancedTableHead from './CompanyInformationEnhancedTableHead.js';
import Button from '@material-ui/core/Button';
import { confirmAlert } from 'react-confirm-alert';
import Grid from '@material-ui/core/Grid';
import { SERVER_URL } from '../../constants.js'

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
  class EnhancedTable extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          selected: [],
          data: [      
          ],
          page: 0,
          rowsPerPage: 5,
          total:0,
          message: '',
          open: false,
          TEMPLATE_ID:''
        };
    }
   
    componentDidMount= () => {
      this.fetchTemplate();
  }
  //提示框的显示判断
  handleClose = (event, reason) => {
    this.setState({ open: false });
  };  
  // 新增
addTemplate(params) {
    let companyinformationVo = new FormData()
    if (params) {
        for (let key in params) {
            companyinformationVo.append(key, params[key])
        }
    }
    console.log(companyinformationVo)
    fetch(SERVER_URL + '/companyInformation/save',
        {
            mode: "cors",
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json,text/plain,*/*'
            },
            body: companyinformationVo
        }
    )
        .then(res => this.fetchTemplate())
        .catch(err => console.error(err))
  }
  //修改
  editTemplate(params) {
    console.log(params)
    let companyInformationVo = new FormData()
    if (params) {
        for (let key in params) {
          companyInformationVo.append(key, params[key])
        }
    }
    console.log(companyInformationVo)
    fetch(SERVER_URL + '/companyInformation/edit',
        {
            mode: "cors",
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json,text/plain,*/*'                   
            },
            body: companyInformationVo
        })
      .then(res => this.fetchTemplate())
      .catch(err => console.error(err))
  }
  //删除
  onDelClick = (id) => {
    fetch(SERVER_URL + '/companyInformation/delete/' + id,
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
        message: '确认是否删除?' + id,
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
    let companyinformationQueryVo = new FormData();  
    companyinformationQueryVo.append("pageNum",this.state.page+1) 
    companyinformationQueryVo.append("pageSize",this.state.rowsPerPage) 
    fetch(SERVER_URL + '/companyInformation/list', {                         
        mode: "cors",
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json,text/plain,*/*'
        },
        body: companyinformationQueryVo
    })
        .then((response) => response.json())
        .then((responseData) => {                        
            this.setState({
                data: responseData.data.list,
                page:responseData.data.pageNum-1,
                rowsPerPage:responseData.data.pageSize,
                total:responseData.data.total
            });
            alert(this.state.page+"     "+this.state.rowsPerPage)
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
      console.log(event)
      this.state.page=page;    
      this.fetchTemplate();
    };
  // 每页的行数更改时触发回调
    handleChangeRowsPerPage = event => {    
      this.state.rowsPerPage=event.target.value;
      this.fetchTemplate();
    };
    isSelected = id => this.state.selected.indexOf(id) !== -1;
    render() {
      let linkStyle = {backgroundColor: '#c9302c',color:'#ffffff',height:'36px'}
      const { classes } = this.props;
      const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
      const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.state.total - page * rowsPerPage);
      const currentPath = this.props.location.pathname;
      return (
        <Paper className={classes.root}>
        <Topbar currentPath={currentPath} />
            <div className={classes.tableWrapper}>
            <font>原件管理公司信息</font>
            </div>
          <Grid container>
              <div className="QueryTemplate">   
              <Grid item><AddCompanyInformation addTemplate={this.addTemplate} fetchTemplate={this.fetchTemplate} /></Grid>                 
              </div>
          </Grid> 
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              {/* 头列表页组件展示 */}
              <CompanyInformationEnhancedTableHead
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
                    const isSelected = this.isSelected(n.tEMPLATE_ID);
                    // 便利显示列表页面
                    return (
                      <TableRow
                        className=""
                        hover
                        onClicock={event => this.handleClick(event, n.tEMPLATE_ID)}
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={n.tEMPLATE_ID}
                        selected={isSelected}
                      >
                        <TableCell  padding="checkbox">
                          <Checkbox checked={isSelected} />
                       </TableCell>
                        <TableCell className="TableCell" component="th" scope="row" align="center" padding="none">{n.companyName}</TableCell>
                        <TableCell className="TableCell" align="center"  padding="none">{n.originalListString}</TableCell>
                        <TableCell className="TableCell" align="center"  padding="none">{n.originalInformation}</TableCell>
                        <TableCell className="TableCell" align="center"  padding="none">{n.remark}</TableCell>
                        <TableCell className="TableCell" align="center"  padding="none">{n.customerUsername}</TableCell>
                        <TableCell className="TableCell" align="center"  padding="none"><ViewCompanyInformation  fetchTemplate={this.fetchTemplate} companyInformationId={n.companyInformationId} /></TableCell>
                        <TableCell className="TableCell" align="center"  padding="none"><EditCompanyInformation editTemplate={this.editTemplate} fetchTemplate={this.fetchTemplate} companyInformationId={n.companyInformationId} /></TableCell>
                        <TableCell className="TableCell" align="center"  padding="none"><Button size="small" style={linkStyle} variant="text" color="primary" onClick={() => { this.confirmDelete(n.companyInformationId) }}>删除</Button></TableCell>
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
            rowsPerPageOptions={[5, 10, 25 ]}
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
  