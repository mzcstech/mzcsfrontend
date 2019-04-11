import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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
import { lighten } from '@material-ui/core/styles/colorManipulator';
import Topbar from './Topbar';
import AddTemplate from './AddTemplate.js';
import EditTemplate from './EditTemplate.js';
import Button from '@material-ui/core/Button';
import { confirmAlert } from 'react-confirm-alert';
import Grid from '@material-ui/core/Grid';
import { SERVER_URL } from '../constants.js'
let counter = 0;
function createData(tEMPLATE_ID, uSER_ID, tEMPLATE_SELECT, tEMPLATE_DATE, tEMPLATE_DATETIME,tEMPLATE_RADIO,tEMPLATE_CHECKBOX,tEMPLATE_TEXTAREA) {
  counter += 1;
  return { id: counter, tEMPLATE_ID, uSER_ID, tEMPLATE_SELECT, tEMPLATE_DATE, tEMPLATE_DATETIME,tEMPLATE_RADIO,tEMPLATE_CHECKBOX,tEMPLATE_TEXTAREA };
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
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'tEMPLATE_ID', numeric: false, disablePadding: true, label: 'tEMPLATE_ID' },
  { id: 'uSER_ID', numeric: true, disablePadding: false, label: '输入框' },
  { id: 'tEMPLATE_SELECT', numeric: true, disablePadding: false, label: '下拉框' },
  { id: 'tEMPLATE_DATE', numeric: true, disablePadding: false, label: '日期' },
  { id: 'tEMPLATE_DATETIME', numeric: true, disablePadding: false, label: '日期时间' },
  { id: 'tEMPLATE_RADIO', numeric: true, disablePadding: false, label: '单选' },
  { id: 'tEMPLATE_CHECKBOX', numeric: true, disablePadding: false, label: '多选' },
  { id: 'tEMPLATE_TEXTAREA', numeric: true, disablePadding: false, label: '文本框' },
  {
    id: 'updatePagebutton',
    numeric: false,
    disablePadding: false,
    label: '操作',
    width: 100,
    Cell: ({ row }) =>
        (<EditTemplate editTemplate={this.editTemplate} fetchTemplate={this.fetchTemplate} templeteId={row.tEMPLATE_ID} />)                
}, {
    id: 'delbutton',
    numeric: false,
    disablePadding: false,
    label: '删除',
    width: 100,
    Cell: ({ row }) => (<Button size="small" variant="text" color="primary" onClick={() => { this.confirmDelete(row.tEMPLATE_ID) }}>Delete</Button>)
}
];
//修改
function editTemplate(params) {
  console.log(params)
  let templateVo = new FormData()
  if (params) {
      for (let key in params) {
          templateVo.append(key, params[key])
      }
  }
  console.log(templateVo)
  fetch(SERVER_URL + '/template/edit',
      {
          mode: "cors",
          method: 'POST',
          credentials: 'include',
          headers: {
              'Accept': 'application/json,text/plain,*/*'                   
          },
          body: templateVo
      })
      .then(res => this.fetchTemplate())
      .catch(err => console.error(err))
}
class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
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
                key={row.id}
                align={row.numeric ? 'right' : 'left'}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
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
  const { numSelected, classes } = props;

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
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

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

class EnhancedTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'calories',
    selected: [],
    data: [      
    ],
    page: 0,
    rowsPerPage: 5,
    total:0,
  };
  componentDidMount= () => {
    this.fetchTemplate();
}
// 新增
addTemplate(params) {
  let templateVo = new FormData()
  if (params) {
      for (let key in params) {
          templateVo.append(key, params[key])
      }
  }
  fetch(SERVER_URL + '/template/save',
      {
          mode: "cors",
          method: 'POST',
          credentials: 'include',
          headers: {
              'Accept': 'application/json,text/plain,*/*'
          },
          body: templateVo
      }
  )
      .then(res => this.fetchTemplate())
      .catch(err => console.error(err))
}
//删除
onDelClick = (id) => {
  fetch(SERVER_URL + '/template/delete/' + id,
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
//获取模板列表
fetchTemplate = () => {
  let templateVo=new FormData();  
    templateVo.append("pageNum",this.state.page+1) 
    templateVo.append("pageSize",this.state.rowsPerPage) 
  fetch(SERVER_URL + '/template/list', {

      mode: "cors",
      method: 'POST',
      credentials: 'include',
      headers: {
          'Accept': 'application/json,text/plain,*/*'
      },
      body: templateVo
  })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("responseData");
        console.log(responseData);
          this.setState({
              data: responseData.data.list,
              page:responseData.data.pageNum-1,
              rowsPerPage:responseData.data.pageSize,
              total:responseData.data.total
          });
         console.log(this.state.data)
      })
      .catch(err => console.error(err));
     
}
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

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

  handleChangePage = (event, page) => {   
    console.log(event)
    this.state.page=page;    
    this.fetchTemplate();
  };
  
  handleChangeRowsPerPage = event => {    
    this.state.rowsPerPage=event.target.value;
    this.fetchTemplate();
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.state.total - page * rowsPerPage);
    const currentPath = this.props.location.pathname;
    return (
      <Paper className={classes.root}>
      <Topbar currentPath={currentPath} />
        <EnhancedTableToolbar numSelected={selected.length} />
        <Grid container>
                    <Grid item><AddTemplate addTemplate={this.addTemplate} fetchTemplate={this.fetchTemplate} /></Grid>
                </Grid> 
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={this.state.total}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(0, rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.tEMPLATE_ID);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.tEMPLATE_ID)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.tEMPLATE_ID}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {n.tEMPLATE_ID}
                      </TableCell>
                      <TableCell align="right">{n.uSER_ID}</TableCell>
                      <TableCell align="right">{n.tEMPLATE_SELECT}</TableCell>
                      <TableCell align="right">{n.tEMPLATE_DATE}</TableCell>
                      <TableCell align="right">{n.tEMPLATE_DATETIME}</TableCell>
                      <TableCell align="right">{n.tEMPLATE_RADIO}</TableCell>
                      <TableCell align="right">{n.tEMPLATE_CHECKBOX}</TableCell>
                      <TableCell align="right">{n.tEMPLATE_TEXTAREA}</TableCell>
                      <TableCell align="right"><EditTemplate editTemplate={this.editTemplate} fetchTemplate={this.fetchTemplate} templeteId={n.tEMPLATE_ID} /></TableCell>
                      <TableCell align="right"><Button size="small" variant="text" color="primary" onClick={() => { this.confirmDelete(n.tEMPLATE_ID) }}>Delete</Button></TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
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
