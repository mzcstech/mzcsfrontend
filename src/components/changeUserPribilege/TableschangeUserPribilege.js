import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { SERVER_URL } from '../../constants.js';
// import QueryPrivilegeController from './QueryPrivilegeController.js';
//引入store文件
// import  {actionCreators}  from './store/index'
import { withRouter } from 'react-router-dom'
import ChangeUserPribliege from './ChangeUserPribliege'
import { confirmAlert } from 'react-confirm-alert';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { lighten } from '@material-ui/core/styles/colorManipulator';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton'; 
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import './styles/style.css'

let counter = 0;
function createData(name, calories, fat, carbs, protein) {
  counter += 1;
  return { id: counter, name, calories, fat, carbs, protein };
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  // stabilizedThis.sort((a, b) => {
  //   const order = cmp(a[0], b[0]);
  //   if (order !== 0) return order;
  //   return a[1] - b[1];
  // });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'name', numeric: true, disablePadding: false, label: '名称' },
  { id: 'type', numeric: true, disablePadding: false, label: 'username' },
  { id: 'subtype', numeric: true, disablePadding: false, label: 'userId' },
  { id: 'Subordinate', numeric: true, disablePadding: false, label: '修改权限' },
];

class EnhancedTableHead extends React.Component {
  constructor(props){
    super(props)
    this.state={
    } 
  }
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };
  render() {
  
    const { onSelectAllClick,numSelected, rowCount } = this.props;
    return (
      <TableHead>
        <TableRow >
          {rows.map(    
            (row,index) => (
              <TableCell
                className="changePrivilegTableCellTop"
                key={row.id}
                align="center"
                padding="none"
              >
                <Tooltip
                  title={rows.label}
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                  key={row.id}
                >
                <TableSortLabel
                  className="TableSortLabel"
                  hideSortIcon={true}
                >
                  {row.label}
                </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this,
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

//删除多选的id数组
let ids = []
class TableschangeUserPribilege extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            order: 'asc',
            orderBy: 'calories',
            selected: [],
            data:[],
            page:0,
            rowsPerPage: 10,
            map:[],
            NewqueryList:'',
            message:'',
            open: false,
            idsState:[],
            ROOF:'ROOF',
            postParentId:this.props.postParentId
        };
        this.editTemplate   = this.editTemplate.bind(this)
        this.fetchTemplate  = this.fetchTemplate.bind(this)
        this.handisSelected = this. handisSelected.bind(this)
        this.onDelClickCheckbox = this.onDelClickCheckbox.bind(this)
        this.handleChangePage   = this.handleChangePage.bind(this)
    }
   //分页
   fetchTemplate = (UserName) => { 
    console.log(UserName,'UserName')
    let followUpVo   = new FormData();
    followUpVo.append("pageNum", this.state.page + 1)
    followUpVo.append("pageSize", this.state.rowsPerPage)
    fetch(SERVER_URL + '/user/list' , {
      mode: "cors",
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json,text/plain,*/*'
      },  
      body: followUpVo
    })  
      .then((response) => response.json())
      .then((responseData)  => {
          if(responseData.status !== 500 && UserName === undefined){
            this.setState({
              data: responseData.data.list, 
              page: responseData.data.pageNum - 1,
              rowsPerPage: responseData.data.pageSize,
              total:responseData.data.total
            });
          }else{
            this.setState({
              data: UserName.list,
              page: UserName.pageNum - 1,
              rowsPerPage: UserName.pageSize,
              total:UserName.total,
            },()=>{
            });
          }
      })
      .catch(err => console.error(err));
  }


  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
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
  
  handleChangePage = (event, page) => {
    this.state.page = page;
    this.fetchTemplate()
  };

  handleChangeRowsPerPage = event => {

    this.setState({
       rowsPerPage: event.target.value
    });
    this.getDatalist()
  };

  isSelected = usergroupId => this.state.selected.indexOf(usergroupId) !== -1;
 
  //跳转所属
  jumpToprivilegeSubordinate=(usergroupId)=>{
    this.props.history.push({
        pathname: '/PrivilegeSubordinate',
        query: {
          usergroupId: usergroupId,
        },
      })
  }   
  componentDidMount(){
    this.fetchTemplate()
    this.props.onRef(this)
  }
   //提示框的显示判断
   handleClose = (event, reason) => {
    this.setState({ open: false });
  };
  //多选删除
  handisSelected=(e,addid)=>
  { 
    if(e.target.checked === true){
      ids.push(addid)
      this.setState({idsState:ids},()=>{
      })
    }else{
      ids.splice(addid,1)
      this.setState({idsState:ids},()=>{
      })
    }
  }
  //确认是否删除
  confirmDelete = () => {
    confirmAlert({
      message: '确认是否删除?',
      buttons: [
        {
          label: '是',
          onClick: () => this.onDelClickCheckbox()
        },
        {
          label: '否',
        }
      ]
    })
  }
   //多选删除给子组件按钮
  onDelClickCheckbox = () => {
    fetch(SERVER_URL + '/privilege/delete' ,
      { 
        mode: "cors",
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'text/plain,*/*',
          "content-type": "application/json"
        },
        
        body:JSON.stringify(this.state.idsState)
      })
     
      .then((response) => response.json())
      .then((response) => {
        this.setState({ open: true, message: '删除成功',idsState:[],selected:[] },()=>{
          ids=[]
          this.fetchTemplate()
        });
      })
      .catch(err => {
        this.setState({ open: true, message: 'Error when deleting' });
        console.error(err) 
      })    
    }
  //修改
  editTemplate(params) {
    let userInforPribilegeVo = new FormData()
    console.log(params,'params')
    if (params) {
      for (let key in params) {
        userInforPribilegeVo.append(key, params[key])
      }
    }
    fetch(SERVER_URL + '/privilege/updatePrivilegeByUserId',
      {
        mode: "cors",
        method: 'POST',
        credentials: 'include', 
        headers: {
          'Accept': 'application/json,text/plain,*/*'
        },
        body: userInforPribilegeVo
      })
      .then(res => {  
        this.fetchTemplate()
      })
      .catch(err => console.error(err))
  }
  render() {
    console.log(this.state.data,'chenchang')
    const {} = this.props;
    const { data, order, orderBy, selected, idsState,total,rowsPerPage,page } = this.state;
    return (
      <div>
        <div className="QueryPrivilegInto" >
          {/* <QueryPrivilegeController fetchTemplate={this.fetchTemplate} /> */}
        </div>
      <Paper styel={{width: '100%',marginTop: 'theme.spacing.unit * 3'}}>
        <div style={{ overflowX: 'auto',}}>
          <Table style={{minWidth: 1020,}} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              rowCount={data.length}
            />
            <TableBody>
              {
                stableSort((data)).slice(0, rowsPerPage)
                .map((n) => { 
                  const isSelected = this.isSelected(n.privilegeId); 
                  return (
                    <TableRow
                      className=""
                      role="checkbox"
                      aria-checked={isSelected} 
                      tabIndex={-1}
                      key={n.userId} 
                      selected={isSelected}
                    >
                      <TableCell className="changePrivilegTableCell" align="center" padding="none"component="th" scope="row" >{n.name} </TableCell>
                      <TableCell className="changePrivilegTableCell" align="center" padding="none"  >{n.username}</TableCell>
                      <TableCell className="changePrivilegTableCell" align="center" padding="none"  >{n.userId}</TableCell>
                      <TableCell className="changePrivilegTableCell" align="center" padding="none" >
                        <ChangeUserPribliege name={n.name} oldUserId={n.userId} editTemplate={this.editTemplate} ></ChangeUserPribliege>
                      </TableCell>
                     </TableRow>
                  );
                })
                }
    
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
          rowsPerPageOptions={10}
          component="div"
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
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
      </div>
    );
  }
}

const mapStateToprops =(state)=>{
  return{
    // dataList:state.getIn(['PrivilegeReducer'],['dataList'])
    //  dataList:state.get('PrivilegeReducer').get('dataList'),
    //  page:state.get('PrivilegeReducer').get('page'),
    //  total:state.get('PrivilegeReducer').get('total'),
    //  rowsPerPage:state.get('PrivilegeReducer').get('rowsPerPage'),
  }
}
const mapDispathToProps =(dispatch)=>{
  return{
      // getDatalist(){ 
      //   dispatch(actionCreators.getDatalist())
      // },
      // handleChangeRowsPerPage(){
      //   dispatch(actionCreators.handleChangeRowsPerPage())
      // }
  }
}
export default connect(mapStateToprops,mapDispathToProps)(TableschangeUserPribilege);

