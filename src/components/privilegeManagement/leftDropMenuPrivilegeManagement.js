import React from 'react';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import SendIcon from '@material-ui/icons/Send';
import DraftsIcon from '@material-ui/icons/Drafts';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import StarBorder from '@material-ui/icons/StarBorder';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    // 新加
    // leftDropMenu:{
    //     borderRight:'2px solid #eeeeee',
    //     maxWidth: 200,
    //     backgroundColor: theme.palette.background.paper,
    // },
    toolbar:{
        borderTop:'2px solid #eeeeee',
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
  });
class LeftMenu extends React.Component {
    constructor(){
        super()
        this.state = {
            open: true,
        };
    }
    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
    };
    render(){
        const { classes } = this.props;
        return(
        <List
            component="nav"
            subheader={<ListSubheader component="div">工作组会计leoder组</ListSubheader>}
            className={classes.toolbar}
        >
            <ListItem button>
            <ListItemIcon>
                <SendIcon />
            </ListItemIcon>
            <ListItemText inset primary="Sent mail" />
            </ListItem>

            <ListItem button>
            <ListItemIcon>
                <SendIcon />
            </ListItemIcon>
            <ListItemText inset primary="Sent mail" />
            </ListItem>
            <ListItem button>
            <ListItemIcon>
                <SendIcon />
            </ListItemIcon>
            <ListItemText inset primary="Sent mail" />
            </ListItem>
            <ListItem button>
            <ListItemIcon>
                <SendIcon />
            </ListItemIcon>
            <ListItemText inset primary="Sent mail" />
            </ListItem>
            <ListItem button>
            <ListItemIcon>
                <SendIcon />
            </ListItemIcon>
            <ListItemText inset primary="Sent mail" />
            </ListItem>
            <ListItem button>
            <ListItemIcon>
                <SendIcon />
            </ListItemIcon>
            <ListItemText inset primary="Sent mail" />
            </ListItem>
            <ListItem button>
            <ListItemIcon>
                <SendIcon />
            </ListItemIcon>
            <ListItemText inset primary="Sent mail" />
            </ListItem>
            <ListItem button>
            <ListItemIcon>
                <SendIcon />
            </ListItemIcon>
            <ListItemText inset primary="Sent mail" />
            </ListItem>
            <ListItem button>
            <ListItemIcon>
                <SendIcon />
            </ListItemIcon>
            <ListItemText inset primary="Sent mail" />
            </ListItem>
            <ListItem button>
            <ListItemIcon>
                <SendIcon />
            </ListItemIcon>
            <ListItemText inset primary="Sent mail" />
            </ListItem>
            <ListItem button>
            <ListItemIcon>
                <SendIcon />
            </ListItemIcon>
            <ListItemText inset primary="Sent mail" />
            </ListItem>
            <ListItem button>
            <ListItemIcon>
                <SendIcon />
            </ListItemIcon>
            <ListItemText inset primary="Sent mail" />
            </ListItem>
            <ListItem button>
            <ListItemIcon>
                <SendIcon />
            </ListItemIcon>
            <ListItemText inset primary="Sent mail" />
            </ListItem>
            <ListItem button>
            <ListItemIcon>
                <SendIcon />
            </ListItemIcon>
            <ListItemText inset primary="Sent mail" />
            </ListItem>

            <ListItem button>
            <ListItemIcon>
                <SendIcon />
            </ListItemIcon>
            <ListItemText inset primary="Sent mail" />
            </ListItem>
            <ListItem button>
            <ListItemIcon>
                <SendIcon />
            </ListItemIcon>
            <ListItemText inset primary="Sent mail" />
            </ListItem>
            <ListItem button>
            <ListItemIcon>
                <DraftsIcon />
            </ListItemIcon>
            <ListItemText inset primary="Drafts" />
            </ListItem>
            <ListItem button onClick={this.handleClick}>
            <ListItemIcon>
                <InboxIcon />
            </ListItemIcon>
            <ListItemText inset primary="Inbox" />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            
            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                <ListItemIcon>
                    <StarBorder />
                </ListItemIcon>
                <ListItemText inset primary="Starred" />
                </ListItem>
            </List>
            </Collapse>
        </List>
        )
    }

}
export default withStyles(styles)(LeftMenu);