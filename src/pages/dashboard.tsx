import {
  Box,
  Card,
  Grid,
  Typography,
  Stack,
  LinearProgress,
  Paper,
  Button,
  Chip,
  IconButton,
  Tooltip,
  Fade,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import {
  Inventory,
  Warning,
  TrendingUp,
  LocalShipping,
  ArrowUpward,
  ArrowDownward,
  Refresh,
  CalendarToday,
  Close,
  AccessTime
} from '@mui/icons-material';
import { useState } from 'react';

interface Producto {
  nombre: string;
  stock: number;
  minimo: number;
  urgencia: string;
  ultimoPedido: string;
}

const Dashboard = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);
  const [productosPocoInventario, setProductosPocoInventario] = useState<Producto[]>([
    { 
      nombre: "Botellón Grande", 
      stock: 5, 
      minimo: 10, 
      urgencia: "Alta",
      ultimoPedido: "2024-03-01"
    },
    { 
      nombre: "Botellón Mediano", 
      stock: 3, 
      minimo: 8, 
      urgencia: "Media",
      ultimoPedido: "2024-03-05"
    }
  ]);
  const datosInventario = {
    totalProductos: 100,
    productosPocoStock: 8,
    totalVentas: "$9,800",
    porcentajeStock: 75.5,
    cambios: {
      productos: "+5%",
      ventas: "+12%",
      stock: "-3%"
    },
    productosMasVendidos: [
      { 
        nombre: "Botellón Grande", 
        vendidos: 150, 
        stock: 20, 
        tendencia: "+15%", 
        imagen: "/imgs/botella2.png",
        precio: "$25.00",
        ultimaVenta: "2024-03-15"
      },
      { 
        nombre: "Botellón Mediano", 
        vendidos: 85, 
        stock: 15, 
        tendencia: "+8%", 
        imagen: "/imgs/botella2.png",
        precio: "$18.50",
        ultimaVenta: "2024-03-14"
      },
      { 
        nombre: "Botellón Pequeño", 
        vendidos: 65, 
        stock: 10, 
        tendencia: "+5%", 
        imagen: "/imgs/botella2.png",
        precio: "$12.00",
        ultimaVenta: "2024-03-13"
      },
      { 
        nombre: "Botellón Pequeño", 
        vendidos: 65, 
        stock: 10, 
        tendencia: "+5%", 
        imagen: "/imgs/botella2.png",
        precio: "$12.00",
        ultimaVenta: "2024-03-13"
      },
    ],
  };

  const handleDelete = (index: number) => {
    const newProducts = [...productosPocoInventario];
    newProducts.splice(index, 1);
    setProductosPocoInventario(newProducts);
  };

  const handlePostpone = (product: Producto) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleConfirmPostpone = () => {
    // Aquí podrías agregar la lógica para posponer la notificación
    setOpenDialog(false);
    setSelectedProduct(null);
  };

  return (
    <Box 
      sx={{ 
        p: 3,
        background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)'
      }}
    >
      {/* Métricas principales en diseño escalonado */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ transform: 'translateY(0px)' }}>
          <Fade in timeout={500}>
            <Card
              sx={{
                p: 3,
                borderRadius: 4,
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.15)'
                }
              }}
            >
              <Stack spacing={2}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Inventory sx={{ fontSize: 40, color: 'primary.main' }} />
                  <Chip
                    label={datosInventario.cambios.productos}
                    color="success"
                    size="small"
                    icon={<ArrowUpward />}
                  />
                </Stack>
                <Typography variant="h4" fontWeight="bold">
                  {datosInventario.totalProductos}
                </Typography>
                <Typography color="text.secondary">
                  Total Productos
                </Typography>
              </Stack>
            </Card>
          </Fade>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ transform: 'translateY(20px)' }}>
          <Fade in timeout={700}>
            <Card
              sx={{
                p: 3,
                borderRadius: 4,
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                background: 'linear-gradient(135deg, #fff8f1 0%, #ffe8d9 100%)',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 12px 30px rgba(255,152,0,0.15)'
                }
              }}
            >
              <Stack spacing={2}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Warning sx={{ fontSize: 40, color: 'warning.main' }} />
                  <Chip
                    label="Urgente"
                    color="warning"
                    size="small"
                  />
                </Stack>
                <Typography variant="h4" fontWeight="bold" color="warning.dark">
                  {datosInventario.productosPocoStock}
                </Typography>
                <Typography color="text.secondary">
                  Bajo Stock
                </Typography>
              </Stack>
            </Card>
          </Fade>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ transform: 'translateY(40px)' }}>
          <Fade in timeout={900}>
            <Card
              sx={{
                p: 3,
                borderRadius: 4,
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                background: 'linear-gradient(135deg, #f1f8ff 0%, #e3f2fd 100%)',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 12px 30px rgba(33,150,243,0.15)'
                }
              }}
            >
              <Stack spacing={2}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <TrendingUp sx={{ fontSize: 40, color: 'info.main' }} />
                  <Chip
                    label={datosInventario.cambios.ventas}
                    color="info"
                    size="small"
                    icon={<ArrowUpward />}
                  />
                </Stack>
                <Typography variant="h4" fontWeight="bold" color="info.dark">
                  {datosInventario.totalVentas}
                </Typography>
                <Typography color="text.secondary">
                  Ventas Totales
                </Typography>
              </Stack>
            </Card>
          </Fade>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ transform: 'translateY(60px)' }}>
          <Fade in timeout={1100}>
            <Card
              sx={{
                p: 3,
                borderRadius: 4,
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                background: 'linear-gradient(135deg, #f1fff8 0%, #e8f5e9 100%)',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 12px 30px rgba(76,175,80,0.15)'
                }
              }}
            >
              <Stack spacing={2}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <LocalShipping sx={{ fontSize: 40, color: 'success.main' }} />
                  <Chip
                    label={datosInventario.cambios.stock}
                    color="error"
                    size="small"
                    icon={<ArrowDownward />}
                  />
                </Stack>
                <Typography variant="h4" fontWeight="bold" color="success.dark">
                  {datosInventario.porcentajeStock}%
                </Typography>
                <Typography color="text.secondary">
                  Stock Disponible
                </Typography>
              </Stack>
            </Card>
          </Fade>
        </Grid>
      </Grid>

      {/* Secciones de Productos */}
      <Grid container spacing={3} sx={{ mt: 8 }}>
        {/* Productos Más Vendidos */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Fade in timeout={1300}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 4,
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                height: '100%',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
              }}
            >
              <Stack spacing={3}>
                <Typography variant="h6" fontWeight="bold" color="primary.main">
                  Productos Más Vendidos
                </Typography>
                {datosInventario.productosMasVendidos.map((producto, index) => (
                  <Card
                    key={index}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.02)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                      }
                    }}
                  >
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box
                        component="img"
                        src={producto.imagen}
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: 2,
                          objectFit: 'cover'
                        }}
                      />
                      <Box flex={1}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Box>
                            <Typography variant="subtitle1" fontWeight="bold">
                              {producto.nombre}
                            </Typography>
                            <Typography variant="h6" color="primary.main" sx={{ mt: 0.5 }}>
                              {producto.precio}
                            </Typography>
                          </Box>
                          <Stack alignItems="flex-end">
                            <Chip
                              label={producto.tendencia}
                              color="success"
                              size="small"
                              icon={<ArrowUpward />}
                              sx={{ minWidth: 80 }}
                            />
                            <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                              Última venta: {producto.ultimaVenta}
                            </Typography>
                          </Stack>
                        </Stack>
                        <LinearProgress
                          variant="determinate"
                          value={(producto.vendidos / 200) * 100}
                          sx={{
                            mt: 2,
                            height: 6,
                            borderRadius: 3,
                            bgcolor: 'rgba(0,0,0,0.05)',
                            '& .MuiLinearProgress-bar': {
                              borderRadius: 3,
                              background: 'linear-gradient(90deg, #2196f3 0%, #1976d2 100%)'
                            }
                          }}
                        />
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                          {producto.vendidos} unidades vendidas
                        </Typography>
                      </Box>
                    </Stack>
                  </Card>
                ))}
              </Stack>
            </Paper>
          </Fade>
        </Grid>

        {/* Productos con Bajo Stock */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Fade in timeout={1500}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 4,
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                height: '100%',
                background: 'linear-gradient(135deg, #fff5f5 0%, #ffebee 100%)'
              }}
            >
              <Stack spacing={3}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" fontWeight="bold" color="error.main">
                    Productos con Bajo Stock
                  </Typography>
                  <Tooltip title="Actualizar">
                    <IconButton size="small">
                      <Refresh />
                    </IconButton>
                  </Tooltip>
                </Stack>
                {productosPocoInventario.map((producto, index) => (
                  <Card
                    key={index}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.02)',
                        boxShadow: '0 4px 20px rgba(244,67,54,0.15)'
                      }
                    }}
                  >
                    <Stack spacing={2}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {producto.nombre}
                          </Typography>
                          <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                            <CalendarToday sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="caption" color="text.secondary">
                              Último pedido: {producto.ultimoPedido}
                            </Typography>
                          </Stack>
                        </Box>
                        <Stack direction="row" spacing={1}>
                          <Tooltip title="Posponer">
                            <IconButton 
                              size="small" 
                              color="primary"
                              onClick={() => handlePostpone(producto)}
                            >
                              <AccessTime />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Eliminar">
                            <IconButton 
                              size="small" 
                              color="error"
                              onClick={() => handleDelete(index)}
                            >
                              <Close />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </Stack>
                      <Stack spacing={1}>
                        <Typography variant="caption" color="text.secondary">
                          Stock actual: {producto.stock} / Mínimo: {producto.minimo}
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={(producto.stock / producto.minimo) * 100}
                          color="error"
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            bgcolor: 'rgba(0,0,0,0.05)',
                            '& .MuiLinearProgress-bar': {
                              borderRadius: 3,
                              background: 'linear-gradient(90deg, #f44336 0%, #d32f2f 100%)'
                            }
                          }}
                        />
                      </Stack>
                    </Stack>
                  </Card>
                ))}
              </Stack>
            </Paper>
          </Fade>
        </Grid>
      </Grid>

      {/* Diálogo para posponer */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
          }
        }}
      >
        <DialogTitle>Posponer Notificación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Cuánto tiempo deseas posponer la notificación de bajo stock para {selectedProduct?.nombre}?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenDialog(false)} color="inherit">
            Cancelar
          </Button>
          <Button 
            onClick={handleConfirmPostpone} 
            variant="contained" 
            color="primary"
            sx={{
              borderRadius: 2,
              textTransform: 'none'
            }}
          >
            Posponer 24 horas
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
