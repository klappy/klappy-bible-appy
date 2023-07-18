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
import useResources from '../../hooks/useResources';
import { useState } from 'react';
import Ingredients from './Ingredients';
import { KeyboardArrowDown } from '@mui/icons-material';

export default function Resources({ catalog, language, owner }) {
  const { resources } = useResources({ catalog, language, owner });
  const [resourceKey, setResourceKey] = useState();

  const onClick = (value) => {
    if (resourceKey === value) setResourceKey();
    else setResourceKey(value);
  };

  let loadingComponent = <CircularProgress />;
  let resourcesComponent = (
    <List id={language + 'resources'}>
      {Object.values(resources).map((resource) => (
        <ListItem nested key={resource.full_name}>
          <ListItem sticky={resourceKey === resource.full_name}>
            <ListItemButton onClick={() => onClick(resource.full_name)}>
              <ListItemDecorator>
                <Avatar
                  variant="soft"
                  src={resource.repo.avatar_url}
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
                <strong>
                  {resource.name.replace(language + '_', '').toUpperCase()}
                </strong>
                ,{' '}
                <em>
                  {resource.title} ({resource.branch_or_tag_name})
                </em>
              </ListItemContent>
              <ListItemDecorator>
                <KeyboardArrowDown
                  sx={{
                    transform:
                      resourceKey === resource.full_name
                        ? 'initial'
                        : 'rotate(-90deg)',
                  }}
                />
              </ListItemDecorator>
            </ListItemButton>
          </ListItem>
          {resourceKey === resource.full_name && (
            <>
              <List>
                <ListDivider />
              </List>
              <Ingredients resource={resource} />
              <List>
                <ListDivider />
              </List>
            </>
          )}
        </ListItem>
      ))}
    </List>
  );
  let noResourcesComponent = <div>No resources found.</div>;

  let component = loadingComponent;
  if (!resources) component = noResourcesComponent;
  if (resources) component = resourcesComponent;

  return <div id="resources">{component}</div>;
}
