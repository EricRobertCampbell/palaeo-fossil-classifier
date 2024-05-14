'use client';

import { Grid, IconButton } from '@mui/material';
import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';

import { MainNav } from './main-nav';
import UserButton from './user-button';
import Link from 'next/link';

type Abc = [string, React.Component];

export default function Header() {
  const [dockItems, setDockItems] = React.useState([
    ["/dashboard", DashboardIcon],
  ]);

  const dockItemsFormatted = dockItems.map((Item) => {
    if (Array.isArray(Item)) {
      const [to, Icon] = Item;
      return (
        <Grid item key={ `${ to }` }>
          <IconButton LinkComponent={ Link } href={ to }>
            <Icon />
          </IconButton>
        </Grid>
      );
    }
    return (<Item />);
  });

  return (
    <Grid container>
      { dockItemsFormatted }
    </Grid>
  );
}
