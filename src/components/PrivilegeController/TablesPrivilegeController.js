import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { SERVER_URL } from '../../constants.js';
import QueryPrivilegeController from './QueryPrivilegeController.js';
//引入store文件
import  {actionCreators}  from './store/index'
import { withRouter } from 'react-router-dom'
import EditPrivilegeController from './EditPrivilegeController'
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
  { id: 'type', numeric: true, disablePadding: false, label: '类型' },
  { id: 'subtype', numeric: true, disablePadding: false, label: '子类型' },
  { id: 'parentId', numeric: true, disablePadding: false, label: '父节点' },
  { id: 'code', numeric: true, disablePadding: false, label: 'code' },
  { id: 'EditPrivilegeManagement', numeric: true, disablePadding: false, label: '修改' },
  { id: 'Subordinate', numeric: true, disablePadding: false, label: '所属' },
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
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell> 
          {rows.map(    
            row => (
              <TableCell
                className="PrivilegTableCell"
                key={row.privilegeId}
                align="center"
                padding="none"
              >
                <Tooltip
                  title={rows.label}
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                  key={rows.privilegeId}
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
  onSelectAllClick: PropTypes.func.isRequired,
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

let EnhancedTableToolbar = props => {
  const { numSelected, classes,confirmDelete} = props;
 
  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            Nutrition
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {
          numSelected > 0 ? (
          <Tooltip  title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon onClick={confirmDelete}/>
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )
        }
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

//删除多选的id数组
let ids = []
class TablesPrivilegeController extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            order: 'asc',
            orderBy: 'calories',
            selected: [],
            data:[],
            page:0,
            rowsPerPage: 5,
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
   fetchTemplate = () => { 
    let followUpVo   = new FormData();
    followUpVo.append("pageNum", this.state.page + 1)
    followUpVo.append("pageSize", this.state.rowsPerPage)
    fetch(SERVER_URL + '/privilege/list' , {
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
          if(responseData.status !== 500){
            this.setState({
              data: responseData.data.list,
              page: responseData.data.pageNum - 1,
              rowsPerPage: responseData.data.pageSize,
              total:responseData.data.total
            });
          }else{
            alert('无子节点数据')
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
    console.log(this.state.idsState,'this.state.idsState')
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
    let usergroupInformationVo = new FormData()
    if (params) {
      for (let key in params) {
        usergroupInformationVo.append(key, params[key])
      }
    }
    fetch(SERVER_URL + '/usergroup/update',
      {
        mode: "cors",
        method: 'POST',
        credentials: 'include', 
        headers: {
          'Accept': 'application/json,text/plain,*/*'
        },
        body: usergroupInformationVo
      })
      .then(res => {  
        this.fetchTemplate()
      })
      .catch(err => console.error(err))
  }
  render() {
    let linkStyletwo = { backgroundColor: '#2196F3', color: '#ffffff', height: '36px' }
    const { } = this.props;
    const { order, orderBy, selected, idsState,data,total,rowsPerPage,page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.state.data.length - page * rowsPerPage);
    return (
      <div>
        <div className="QueryPrivilegInto" >
          <QueryPrivilegeController fetchTemplate={this.fetchTemplate} />
        </div>
      <Paper styel={{width: '100%',marginTop: 'theme.spacing.unit * 3'}}>
        <EnhancedTableToolbar numSelected={selected.length}  rowCount={data.length} confirmDelete={this.confirmDelete} />
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
                .map((n,index) => { 
                  const isSelected = this.isSelected(n.privilegeId); 
                  return (
                    <TableRow
                      className="PrivilegTableCell"
                      role="checkbox"
                      aria-checked={isSelected} 
                      tabIndex={-1}
                      key={n.privilegeId} 
                      selected={isSelected}
                    >
                      <TableCell key={n.privilegeId} clas sName="PrivilegTableCell" padding="checkbox"  onClick={event => this.handleClick(event, n.privilegeId)}>
                         <Checkbox checked={isSelected} key={n.privilegeId} onChange={(e)=>{this.handisSelected(e,n.privilegeId)}} />
                      </TableCell>
                      <TableCell className="PrivilegTableCell" align="center" padding="none"component="th" scope="row" >{n.name} </TableCell>
                      <TableCell className="PrivilegTableCell" align="center" padding="none"  >{n.type}</TableCell>
                      <TableCell className="PrivilegTableCell" align="center" padding="none"  >{n.subType}</TableCell>
                      <TableCell className="PrivilegTableCell" align="center" padding="none"  >{n.privilegeId}</TableCell>
                      <TableCell className="PrivilegTableCell" align="center" padding="none"  >{n.code}</TableCell>
                      <TableCell className="PrivilegTableCell" align="center" padding="none"  >
                        <EditPrivilegeController usergroupId={n.privilegeId} editTemplate={this.editTemplate} three={this.props.three} 
                        getUsergroupFindByParentId={this.props.getUsergroupFindByParentId}
                        />
                      </TableCell>
                      <TableCell className="PrivilegTableCell" align="center" padding="none" ><Button size="small" style={linkStyletwo} variant="text" color="primary"
                       onClick={() => { this.jumpToprivilegeSubordinate(n.privilegeId) }}>所属</Button></TableCell>
                    </TableRow>
                  );
                })
                }
              {/* {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}
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
          rowsPerPageOptions={5}
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
          onChangePage={ this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
      </div>
    );
  }
}

TablesPrivilegeController.propTypes = {
  classes: PropTypes.object.isRequired,
};

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
      // getDatalist(Nextpage,NextrowsPerPage){
      //   dispatch(actionCreators.getDatalist(Nextpage,NextrowsPerPage))
      // },
      // handleChangePage(page){
      //   dispatch(actionCreators.handleChangePage(page))
      // }
  }
}
export default connect(mapStateToprops,mapDispathToProps)(TablesPrivilegeController);

