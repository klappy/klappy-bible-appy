import { useState } from 'react';
import {
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
} from '@mui/joy';
import { Book, KeyboardArrowDown } from '@mui/icons-material';

const sampleIngredient = {
  categories: ['bible-ot'],
  identifier: 'gen',
  path: './01-GEN.usfm',
  sort: 1,
  title: 'ኦሪት ዘፍጥረት',
  versification: 'ufw',
};

export default function Ingredients({ resource }) {
  const { ingredients } = resource;
  const [ingredient, setIngredient] = useState();

  const [key, setKey] = useState();

  const onClick = (value) => {
    if (key === value) setKey();
    else setKey(value);
  };

  const ingredientsComponent = (
    <List id={resource.full_name + 'ingredients'}>
      {ingredients.map((ingredient) => (
        <ListItem nested key={ingredient.identifier}>
          <ListItemButton onClick={() => onClick(ingredient.identifier)}>
            <ListItemDecorator>
              <Book />
            </ListItemDecorator>
            <ListItemContent
              sx={{
                paddingLeft: '0.5em',
              }}
            >
              <strong>{ingredient.identifier.toUpperCase()}</strong>,{' '}
              <em>{ingredient.title}</em>
            </ListItemContent>
            <ListItemDecorator>
              <KeyboardArrowDown
                sx={{
                  transform:
                    key === ingredient.identifier
                      ? 'initial'
                      : 'rotate(-90deg)',
                }}
              />
            </ListItemDecorator>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
  const noingredientsComponent = <div>No ingredients found.</div>;

  let component;
  if (!ingredients) component = noingredientsComponent;
  if (ingredients) component = ingredientsComponent;

  return <div id="ingredients">{component}</div>;
}
