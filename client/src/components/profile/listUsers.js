import { useState } from 'react';

import {
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Checkbox
} from '@mui/material';

function ListUsers({children}, {users}) {

    const [checked, setChecked] = useState([1]);

    const handleToggle = (value) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
  
      setChecked(newChecked);
    };

    return (
        <List dense sx={{
            width: '100%',
            maxWidth: 360,
            bgColor: 'background.paper'
        }}>
            {
                users && users.map(user => {
                    const labelId = `checkbox-list-secondary-label-${user}`;
                    return (
                        <ListItem
                            key={user.userId}
                            disablePadding
                            secondaryAction={
                                <Checkbox
                                    edge="end"
                                    onChange={handleToggle(user.userId)}
                                    checked={checked.indexOf(user.userId) !== -1}
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            }
                        >
                            {children}
                            <ListItemButton>
                                <ListItemAvatar>
                                    <Avatar 
                                        alt={`Avatar ${user.name}`}
                                    />
                                </ListItemAvatar>
                                <ListItemText primary={`${user.name}`} />
                            </ListItemButton>
                        </ListItem>
                    )
                })
            }
        </List>
    )
}

export default ListUsers;