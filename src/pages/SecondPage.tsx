import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Divider, Paper } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Post } from '../types';
import DepartmentList from '../components/DepartmentList';

const SecondPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userDetails = localStorage.getItem('userDetails');
    if (!userDetails) {
      alert('You must enter your details before accessing this page.');
      navigate('/');
    } else {
      fetchData();
    }
  }, [navigate]);

  const fetchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data: Post[] = await response.json();
      setPosts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const columns: GridColDef[] = [
    { field: 'userId', headerName: 'User ID', width: 150 },
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'body', headerName: 'Body', width: 400 }
  ];

  return (
    <Paper elevation={3} style={{ padding: 20, backgroundColor: '#f0f0f0' }}>
      <Typography variant="h5" gutterBottom sx={{ fontSize: '40px', fontWeight: 600, textAlign: 'center', color: 'skyblue' }}>
        Table of Posts By Users
      </Typography>

      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={posts}
          columns={columns}
       
          loading={loading}
          getRowId={(row) => row.id}
        />
      </div>

      <Divider style={{ margin: '40px 0' }} />

      <DepartmentList />
    </Paper>
  );
};

export default SecondPage;
