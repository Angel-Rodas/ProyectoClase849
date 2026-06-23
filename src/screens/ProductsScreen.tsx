import { useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';

import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import ScreenWrapper from '../components/ScreenWrapper';
import { supabase } from '../../lib/supabase';

type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
};

export default function ProductsScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');

  const handleAddProduct = async () => {
    if (!name.trim() || !brand.trim()) {
      Alert.alert('Campos incompletos', 'El nombre y la marca son obligatorios.');
      return;
    }

    // Endpoint Create: en lugar de guardar en estado local, se inserta el
    // producto en la tabla products de Supabase y se regresa el registro creado.
    const { data, error } = await supabase
      .from('products')
      .insert([{ name: name.trim(), brand: brand.trim(), category: category.trim() }])
      .select();

    if (error) {
      Alert.alert('Error', error.message);
      return;
    }

    if (data) {
      setProducts((prev) => [...(data as Product[]), ...prev]);
    }

    setName('');
    setBrand('');
    setCategory('');
  };

  return (
    <ScreenWrapper>
      <Text style={styles.title}>Productos</Text>

      <CustomInput type="text" placeholder="Nombre" value={name} onChange={setName} />
      <CustomInput type="text" placeholder="Marca" value={brand} onChange={setBrand} />
      <CustomInput type="text" placeholder="Categoria" value={category} onChange={setCategory} />

      <CustomButton title="Agregar producto" variant="primary" onPress={handleAddProduct} />

      <FlatList
        style={styles.list}
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemMeta}>
              {item.brand}
              {item.category ? `  -  ${item.category}` : ''}
            </Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Aun no hay productos.</Text>}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#202124',
    marginBottom: 16,
  },
  list: {
    marginTop: 16,
  },
  item: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e3e6ea',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#202124',
  },
  itemMeta: {
    fontSize: 13,
    color: '#5f6368',
    marginTop: 2,
  },
  empty: {
    textAlign: 'center',
    color: '#9aa0a6',
    marginTop: 24,
  },
});
