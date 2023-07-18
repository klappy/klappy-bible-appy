import {
  Avatar,
  List,
  ListDivider,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
} from '@mui/joy';
import CircularProgress from '@mui/joy/CircularProgress';
import useOwners from '../../hooks/useOwners';
import { useState } from 'react';
import { KeyboardArrowDown } from '@mui/icons-material';
import Resources from './Resources';

export default function Owners({ catalog, language }) {
  const { owners } = useOwners({ catalog, language });
  const [owner, setOwner] = useState();

  const onClick = (value) => {
    if (owner === value) setOwner();
    else setOwner(value);
  };

  let loadingComponent = <CircularProgress />;
  let ownersComponent = (
    <List id={language + 'owner'}>
      {Object.values(owners).map((_owner) => (
        <ListItem nested indent={2} key={_owner.login}>
          <ListItem sticky={owner === _owner.login}>
            <ListItemButton onClick={() => onClick(_owner.login)}>
              <ListItemDecorator>
                <Avatar
                  variant="soft"
                  src={_owner.avatar_url}
                  sx={{
                    borderRadius: 'sm',
                  }}
                />
              </ListItemDecorator>
              <ListItemContent
                sx={{
                  paddingLeft: '0.5em',
                }}
              >
                <strong>{_owner.login}</strong>: <em>{_owner.full_name}</em>
              </ListItemContent>
              <ListItemDecorator>
                <KeyboardArrowDown
                  sx={{
                    transform:
                      owner === _owner.login ? 'initial' : 'rotate(-90deg)',
                  }}
                />
              </ListItemDecorator>
            </ListItemButton>
          </ListItem>
          {owner === _owner.login && (
            <>
              <List>
                <ListDivider />
              </List>
              <Resources catalog={catalog} language={language} owner={owner} />
              <List>
                <ListDivider />
              </List>
            </>
          )}
        </ListItem>
      ))}
    </List>
  );
  let noOwnersComponent = <div>No owners found.</div>;

  let component = loadingComponent;
  if (!owners) component = noOwnersComponent;
  if (owners) component = ownersComponent;

  return <div id="owners">{component}</div>;
}
