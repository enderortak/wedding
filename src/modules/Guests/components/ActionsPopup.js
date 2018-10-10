import React from "react";
import { Popover, Paper, MenuList, MenuItem, ListItemIcon, ListItemText} from "@material-ui/core";


const ActionsPopup = ({ anchor, open, onClose, actions }) => (
    <Popover 
    anchorEl={anchor}
    open={open}
    onClose={onClose}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
  >
  <Paper>
  <MenuList>
    {actions.map(
        action => 
        <MenuItem onClick={action.onClick}>
        <ListItemIcon>
          {action.icon}
        </ListItemIcon>
        <ListItemText inset primary={action.text} />
      </MenuItem>
    )}
  </MenuList>
</Paper>
  </Popover>
);

export default ActionsPopup;