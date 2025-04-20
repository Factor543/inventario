import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Tooltip,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from "@mui/material"
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Inventory as InventoryIcon,
  Category as CategoryIcon
} from '@mui/icons-material'
import { useState } from "react"

interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
  minimo: number;
  descripcion: string;
}

const Management = () => {
  // Categorías predefinidas
  const CATEGORIAS = {
    PRODUCTO: "Producto",
    ACCESORIO: "Accesorio"
  };

  // Estados para el manejo de productos y diálogos
  const [productos, setProductos] = useState<Producto[]>([
    {
      id: 1,
      nombre: "Botellón Grande",
      categoria: CATEGORIAS.PRODUCTO,
      precio: 5.00,
      stock: 20,
      minimo: 10,
      descripcion: "Botellón de agua de 19 litros"
    },
    {
      id: 2,
      nombre: "Botellón Mediano",
      categoria: CATEGORIAS.PRODUCTO,
      precio: 3.50,
      stock: 15,
      minimo: 8,
      descripcion: "Botellón de agua de 10 litros"
    }
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Producto | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Producto>>({
    nombre: "",
    categoria: CATEGORIAS.PRODUCTO,
    precio: undefined,
    stock: undefined,
    minimo: undefined,
    descripcion: ""
  });

  // Manejadores de eventos
  const handleOpenDialog = () => {
    setOpenDialog(true);
    setEditingProduct(null);
    setNewProduct({
      nombre: "",
      categoria: CATEGORIAS.PRODUCTO,
      precio: undefined,
      stock: undefined,
      minimo: undefined,
      descripcion: ""
    });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingProduct(null);
  };

  const handleEditProduct = (product: Producto) => {
    setEditingProduct(product);
    setNewProduct(product);
    setOpenDialog(true);
  };

  const handleDeleteProduct = (id: number) => {
    setProductos(productos.filter(p => p.id !== id));
  };

  const handleSaveProduct = () => {
    if (editingProduct) {
      // Editar producto existente
      setProductos(productos.map(p => 
        p.id === editingProduct.id ? { ...newProduct, id: p.id } as Producto : p
      ));
    } else {
      // Crear nuevo producto
      const newId = Math.max(...productos.map(p => p.id), 0) + 1;
      setProductos([...productos, { ...newProduct, id: newId } as Producto]);
    }
    handleCloseDialog();
  };

  return (
    <>
        <Typography 
            variant="h4"
            color="info"
            align="center"
        >
            Gestión de Productos
        </Typography>
        <Box sx={{ p: 3 }}>
            {/* Encabezado */}
            <Stack 
            direction="row" 
            justifyContent="space-between" 
            alignItems="center" 
            mb={4}
            >
            <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={handleOpenDialog}
                sx={{ 
                    borderRadius: 3,
                    px: 3,
                    alignContent:"initial"
                }}
            >
                Nuevo Producto
            </Button>
            </Stack>

            {/* Tabla de productos */}
            <TableContainer component={Paper} sx={{ mb: 4, borderRadius: 2 }}>
            <Table>
                <TableHead>
                <TableRow sx={{ bgcolor: 'primary.main' }}>
                    <TableCell sx={{ color: 'white' }}>Nombre</TableCell>
                    <TableCell sx={{ color: 'white' }}>Categoría</TableCell>
                    <TableCell sx={{ color: 'white' }}>Precio</TableCell>
                    <TableCell sx={{ color: 'white' }}>Stock</TableCell>
                    <TableCell sx={{ color: 'white' }}>Stock Mínimo</TableCell>
                    <TableCell sx={{ color: 'white' }}>Acciones</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {productos.map((producto) => (
                    <TableRow key={producto.id} hover>
                    <TableCell>
                        <Stack direction="row" alignItems="center" spacing={1}>
                        <InventoryIcon color="primary" />
                        <Typography>{producto.nombre}</Typography>
                        </Stack>
                    </TableCell>
                    <TableCell>
                        <Chip 
                        label={producto.categoria}
                        size="small"
                        icon={<CategoryIcon />}
                        />
                    </TableCell>
                    <TableCell>${producto.precio.toFixed(2)}</TableCell>
                    <TableCell>
                        <Chip
                        label={`${producto.stock} unidades`}
                        color={producto.stock <= producto.minimo ? "error" : "success"}
                        size="small"
                        />
                    </TableCell>
                    <TableCell>{producto.minimo} unidades</TableCell>
                    <TableCell>
                        <Stack direction="row" spacing={1}>
                        <Tooltip title="Editar">
                            <IconButton 
                            size="small" 
                            color="primary"
                            onClick={() => handleEditProduct(producto)}
                            >
                            <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar">
                            <IconButton 
                            size="small" 
                            color="error"
                            onClick={() => handleDeleteProduct(producto.id)}
                            >
                            <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                        </Stack>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>

            {/* Diálogo para crear/editar producto */}
            <Dialog 
            open={openDialog} 
            onClose={handleCloseDialog}
            maxWidth="sm"
            fullWidth
            >
            <DialogTitle>
                {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid size={6}>
                    <TextField
                    fullWidth
                    label="Nombre"
                    value={newProduct.nombre}
                    onChange={(e) => setNewProduct({ ...newProduct, nombre: e.target.value })}
                    />
                </Grid>
                <Grid size={6}>
                    <FormControl fullWidth>
                    <InputLabel>Categoría</InputLabel>
                    <Select
                        value={newProduct.categoria}
                        label="Categoría"
                        onChange={(e) => setNewProduct({ ...newProduct, categoria: e.target.value })}
                    >
                        <MenuItem value={CATEGORIAS.PRODUCTO}>{CATEGORIAS.PRODUCTO}</MenuItem>
                        <MenuItem value={CATEGORIAS.ACCESORIO}>{CATEGORIAS.ACCESORIO}</MenuItem>
                    </Select>
                    </FormControl>
                </Grid>
                <Grid size={4}>
                    <TextField
                    fullWidth
                    type="number"
                    label="Precio"
                    value={newProduct.precio === undefined ? '' : newProduct.precio}
                    onChange={(e) => setNewProduct({ ...newProduct, precio: e.target.value === '' ? undefined : Number(e.target.value) })}
                    inputProps={{ min: 0, step: "0.01" }}
                    />
                </Grid>
                <Grid size={4}>
                    <TextField
                    fullWidth
                    type="number"
                    label="Stock"
                    value={newProduct.stock === undefined ? '' : newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value === '' ? undefined : Number(e.target.value) })}
                    inputProps={{ min: 0 }}
                    />
                </Grid>
                <Grid size={4}>
                    <TextField
                    fullWidth
                    type="number"
                    label="Stock Mínimo"
                    value={newProduct.minimo === undefined ? '' : newProduct.minimo}
                    onChange={(e) => setNewProduct({ ...newProduct, minimo: e.target.value === '' ? undefined : Number(e.target.value) })}
                    inputProps={{ min: 0 }}
                    />
                </Grid>
                <Grid size={12}>
                    <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Descripción"
                    value={newProduct.descripcion}
                    onChange={(e) => setNewProduct({ ...newProduct, descripcion: e.target.value })}
                    />
                </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
                <Button onClick={handleCloseDialog} color="inherit">
                Cancelar
                </Button>
                <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSaveProduct}
                >
                Guardar
                </Button>
            </DialogActions>
            </Dialog>
        </Box>
    </>
  )
}

export default Management
