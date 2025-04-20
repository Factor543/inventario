import { 
  CardActions, 
  CardContent, 
  CardMedia, 
  Card, 
  Typography, 
  Button, 
  Grid,
  Box,
  Chip,
  Stack,
  TextField,
  MenuItem,
  InputAdornment
} from "@mui/material";
import {
  LocalDrink,
  AttachMoney,
  Search,
  FilterList,
  Star,
  Whatshot,
  NewReleases,
  ShoppingCart
} from '@mui/icons-material';
import { useState } from 'react';

interface Producto {
  nombre: string;
  precio: number;
  capacidad: number;
  imagen: string;
  etiqueta?: 'nuevo' | 'popular' | 'oferta';
  stock: number;
}

const productos: Producto[] = [
  {
    nombre: "Botellón Grande",
    precio: 5,
    capacidad: 19,
    imagen: "/imgs/botella2.png",
    etiqueta: 'popular',
    stock: 50
  },
  {
    nombre: "Botellón Mediano",
    precio: 3.5,
    capacidad: 10,
    imagen: "/imgs/botella2.png",
    etiqueta: 'nuevo',
    stock: 30
  },
  {
    nombre: "Botellón Pequeño",
    precio: 2,
    capacidad: 5,
    imagen: "/imgs/botella2.png",
    etiqueta: 'oferta',
    stock: 20
  },
  {
    nombre: "Botellón Extra Grande",
    precio: 7,
    capacidad: 25,
    imagen: "/imgs/botella2.png",
    stock: 15
  },
  {
    nombre: "Botellón Extra Grande",
    precio: 7,
    capacidad: 25,
    imagen: "/imgs/botella2.png",
    stock: 15
  }
];

const Products = () => {
  const [filtro, setFiltro] = useState('todos');
  const [busqueda, setBusqueda] = useState('');

  const getEtiquetaColor = (etiqueta?: string) => {
    switch (etiqueta) {
      case 'nuevo': return { color: 'info', icon: <NewReleases /> };
      case 'popular': return { color: 'warning', icon: <Whatshot /> };
      case 'oferta': return { color: 'success', icon: <Star /> };
      default: return null;
    }
  };

  return (
    <Box sx={{ p: 3, background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)' }}>
      <Typography
        variant="h3"
        align="center"
        mb={3}
        color="primary"
        fontWeight="bold"
        sx={{
          textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
          letterSpacing: '-0.5px'
        }}
      >
        Productos
      </Typography>

      {/* Filtros y Búsqueda */}
      <Stack 
        direction={{ xs: 'column', sm: 'row' }} 
        spacing={2} 
        mb={4}
        sx={{ 
          background: 'white',
          p: 2,
          borderRadius: 2,
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
        }}
      >
        <TextField
          placeholder="Buscar productos..."
          variant="outlined"
          size="small"
          fullWidth
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          inputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="action" />
              </InputAdornment>
            )
          }}
          sx={{ maxWidth: 300 }}
        />
        <TextField
          select
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          size="small"
          sx={{ minWidth: 200 }}
          inputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FilterList color="action" />
              </InputAdornment>
            )
          }}
        >
          <MenuItem value="todos">Todos los productos</MenuItem>
          <MenuItem value="popular">Más vendidos</MenuItem>
          <MenuItem value="nuevo">Nuevos</MenuItem>
          <MenuItem value="oferta">En oferta</MenuItem>
        </TextField>
      </Stack>

      <Grid container spacing={4}>
        {productos.map((producto) => (
          <Grid size={3}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 3,
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.15)'
                }
              }}
            >
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  sx={{ 
                    height: 200,
                    backgroundSize: 'contain',
                    bgcolor: 'grey.50'
                  }}
                  image={producto.imagen}
                />
                {producto.etiqueta && (
                  <Chip
                    label={producto.etiqueta.toUpperCase()}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    color={getEtiquetaColor(producto.etiqueta)?.color as any}
                    icon={getEtiquetaColor(producto.etiqueta)?.icon}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      fontWeight: 'bold'
                    }}
                  />
                )}
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography 
                  gutterBottom 
                  variant="h5" 
                  component="div"
                  fontWeight="bold"
                >
                  {producto.nombre}
                </Typography>
                <Stack spacing={1.5}>
                  <Stack direction="row" alignItems="center">
                    <AttachMoney color="primary"/>
                    <Typography 
                      variant="h6" 
                      color="primary.main"
                      fontWeight="bold"
                    >
                    {producto.precio.toFixed(2)}
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <LocalDrink color="action" />
                    <Typography variant="body2" color="text.secondary">
                      Capacidad: {producto.capacidad} Litros
                    </Typography>
                  </Stack>
                  <Typography 
                    variant="body2" 
                    color={producto.stock < 20 ? "error" : "text"}
                  >
                    Stock disponible: {producto.stock} unidades
                  </Typography>
                </Stack>
              </CardContent>
              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button 
                  variant="contained"
                  fullWidth
                  startIcon={<ShoppingCart />}
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    background: 'linear-gradient(45deg, #2196f3 30%, #1976d2 90%)',
                    boxShadow: '0 4px 12px rgba(33,150,243,0.3)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #1976d2 30%, #1565c0 90%)',
                      boxShadow: '0 6px 15px rgba(33,150,243,0.4)'
                    }
                  }}
                >
                  Ver detalles
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Products;
