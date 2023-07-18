import React, { useState } from 'react';
import { KeyboardArrowDown } from '@mui/icons-material';
import {
  List,
  ListDivider,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  Sheet,
} from '@mui/joy';
import CircularProgress from '@mui/joy/CircularProgress';
import Owners from './Owners';

export default function Languages({ loading, catalog, languages = {} }) {
  const [languageKey, setLanguageKey] = useState();

  const onClick = (value) => {
    if (languageKey === value) setLanguageKey();
    else setLanguageKey(value);
  };

  let loadingComponent = <CircularProgress />;
  let languagesComponent = (
    <Sheet
      variant="outlined"
      sx={{
        minWidth: '20em',
        maxWidth: '100%',
        height: 'calc(100vh - 1em)',
        overflow: 'auto',
        borderRadius: 'sm',
      }}
    >
      <List size="sm">
        {Object.values(languages).map((language) => (
          <ListItem nested key={language.language}>
            <ListItem sticky={languageKey === language.language}>
              <ListItemButton onClick={() => onClick(language.language)}>
                <ListItemContent>
                  <strong>{language.language.toUpperCase()}</strong>:{' '}
                  {language.language_title}
                </ListItemContent>
                <ListItemDecorator>
                  <KeyboardArrowDown
                    sx={{
                      transform:
                        languageKey === language.language
                          ? 'initial'
                          : 'rotate(-90deg)',
                    }}
                  />
                </ListItemDecorator>
              </ListItemButton>
            </ListItem>
            {languageKey === language.language && (
              <>
                <List>
                  <ListDivider />
                </List>
                <Owners catalog={catalog} language={languageKey} />
                <List>
                  <ListDivider />
                </List>
              </>
            )}
          </ListItem>
        ))}
      </List>
    </Sheet>
  );
  let noLanguagesComponent = <div>No languages found.</div>;

  let component = loadingComponent;
  if (!languages) component = noLanguagesComponent;
  if (languages) component = languagesComponent;
  if (loading) component = loadingComponent;

  return <div id="languages">{component}</div>;
}
