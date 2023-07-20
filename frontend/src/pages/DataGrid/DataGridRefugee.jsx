import React, { useMemo, useState } from 'react';

import MaterialReactTable from 'material-react-table';

import { IconButton, ThemeProvider, Tooltip, createTheme } from '@mui/material';

import RefreshIcon from '@mui/icons-material/Refresh';

import {

  QueryClient,

  QueryClientProvider,

  useQuery,

} from 'react-query';


const Example = ({centerId}) => {

  const [columnFilters, setColumnFilters] = useState([]);

  const [globalFilter, setGlobalFilter] = useState('');

  const [sorting, setSorting] = useState([]);

  const [pagination, setPagination] = useState({

    pageIndex: 0,

    pageSize: 10,

  });


  const { data, isError, isFetching, isLoading, refetch } = useQuery({

    queryKey: [

      'table-data',

      columnFilters, //refetch when columnFilters changes

      globalFilter, //refetch when globalFilter changes

      pagination.pageIndex, //refetch when pagination.pageIndex changes

      pagination.pageSize, //refetch when pagination.pageSize changes

      sorting, //refetch when sorting changes

    ],

      queryFn: async () => {
        
          
      const fetchURL = new URL(`http://localhost:3000/humen/getRefugee/${centerId}`);

      fetchURL.searchParams.set(

        'start',

        `${pagination.pageIndex * pagination.pageSize}`,

      );

      fetchURL.searchParams.set('size', `${pagination.pageSize}`);

      fetchURL.searchParams.set('filters', JSON.stringify(columnFilters ?? []));

      fetchURL.searchParams.set('globalFilter', globalFilter ?? '');

      fetchURL.searchParams.set('sorting', JSON.stringify(sorting ?? []));


      const response = await fetch(fetchURL.href,{credentials: 'include'});

      const json = await response.json();

      return json;

    },

    keepPreviousData: true,

  });

    

    const columns = useMemo(() => [
        {
            accessorKey: "_id",
            header: 'ID',
        },
        {
            accessorKey: "first_name",
            header: 'First Name',
        },
        {
            accessorKey: "last_name",
            header: 'Last Name',
        },
        {
            accessorKey: "mother_name",
            header: 'Mother Name',
        },
        {
            accessorKey: "father_name",
            header: 'Father Name',
        },
        {
            accessorKey: "condtion",
            header: 'Condtion',
        },
        {
            accessorKey: "city",
            header: "City",
        },
        {
            accessorKey: "vellage",
            header: "Vellage",
        },
        {
            accessorKey: "createdAt",
            header: "created At",
        },
    ])
        const theme = useMemo(
        () => createTheme({
            palette: {
                mode: "dark"
            }
        })
    )



  return (

    <ThemeProvider theme={theme}>
                    <MaterialReactTable

                        columns={columns}
                        

                    data={data ?? []} //data is undefined on first render

                    initialState={{ showColumnFilters: true }}

                    manualFiltering

                    manualPagination

                    manualSorting

                    muiToolbarAlertBannerProps={

                        isError

                        ? {

                            color: 'error',

                            children: 'Error loading data',

                            }

                        : undefined

                    }

                    onColumnFiltersChange={setColumnFilters}

                    onGlobalFilterChange={setGlobalFilter}

                    onPaginationChange={setPagination}

                    onSortingChange={setSorting}

                    renderTopToolbarCustomActions={() => (

                        <Tooltip arrow title="Refresh Data">

                        <IconButton onClick={() => refetch()}>

                            <RefreshIcon />

                        </IconButton>

                        </Tooltip>

                    )}

                    rowCount={data?.meta?.totalRowCount ?? 0}

                    state={{

                        columnFilters,

                        globalFilter,

                        isLoading,

                        pagination,

                        showAlertBanner: isError,

                        showProgressBars: isFetching,

                        sorting,

                    }}

                    />
            </ThemeProvider>
  );

};


const queryClient = new QueryClient();


const DataGridRefugee = ({centerId}) => (

    <div style={{width: '90vw', marginLeft: '80px'}}>
    <QueryClientProvider  client={queryClient}>

        <Example centerId={centerId} />

  </QueryClientProvider></div>

);


export default DataGridRefugee;
