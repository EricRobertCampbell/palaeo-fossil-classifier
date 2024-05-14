"use client";

export const dynamic = "force-dynamic";

import { gql, useQuery } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { Grid } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

const query = gql`query {
  users {
    id
    name
    email
    roles
  }
}`;


const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 200,
  },
  {
    field: 'roles',
    headerName: 'Roles',
    renderCell(params: any) { 
      return params.row.roles.join(' ');
    },
  },
];

export default function PollPage() {
  const { data: { users } = { users: [] } } = useQuery(query);
  // console.log(data);
  return (
    <Grid container sx={{ height: '100vh' }} padding={ 1 }>
      <Grid item flexGrow={ 1 }>
        <DataGrid
          rows={ users }
          columns={ columns }
        />
      </Grid>
    </Grid>
  );
}