'use client'
import Image from "next/image";
import {useState, useEffect} from 'react';
import {firestore} from "@/firebase";
import { Box, Stack } from "@mui/system";
import { Button, Modal, TextField, Typography } from "@mui/material";
import { collection, deleteDoc, getDoc, getDocs, query, setDoc, doc } from "firebase/firestore";

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [searchQ, setSearchQ] = useState('');
  const [filteredInventory, setFilteredInventory] = useState([]);

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data()
      })
    })
    setInventory(inventoryList)
    setFilteredInventory(inventoryList)
  }

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()){
      const {count} = docSnap.data();

      if(count === 1){
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, {count: count - 1})
      }
    }

    await updateInventory()
  }

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()){
      const {count} = docSnap.data();

      await setDoc(docRef, {count: count + 1})
    } 
    else{
      await setDoc(docRef, {count : 1});
    }

    await updateInventory()
  }

  useEffect(() => {
    updateInventory()
  }, [])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase()
    setSearchQ(query)

    const filtered = inventory.filter(item => item.name.toLowerCase().includes(query))
    setFilteredInventory(filtered)
  }

  return ( 
  <Box width="100vw" height="100vh" display="flex" 
  justifyContent="center" alignItems="center" gap={2} flexDirection="column">
    <Modal open={open} onClose={handleClose}>
      <Box position="absolute" top="50%" left="50%" sx={{transform:"translate(-50%, -50%)"}} width="400" bgcolor="white"
      border="2px solid #000" boxShadow={24} p={4} display="flex" flexDirection="column" gap={3}>
        <Typography variant="h6">Add Item</Typography>
        <Stack width="100%" direction="row" spacing={2}>
          <TextField variant="outlined" fullWidth value={itemName}
            onChange={(e) => {
              setItemName(e.target.value)
            }}
          />
          <Button variant="outlined" 
          onClick={() => {
            addItem(itemName)
            setItemName('')
            handleClose()
          }}>ADD</Button>
        </Stack>
      </Box>
    </Modal>
    <Button variant="contained" onClick={() => {
      handleOpen()
    }}>Add New Item</Button>
    {/* <TextField 
      variant="outlined" 
      placeholder="Search items..." 
      value={searchQ}
      onChange={handleSearch}
    /> */}

    <Box border="1px solid #333">
      <Box width="800px" height="200px" bgcolor="#8686" display="flex" alignItems="center" justifyContent="center" >
        <Typography variant="h2" color="#333">Inventory Items</Typography>
      </Box>
    
    <Stack width="800px" height="300px" spacing={2} overflow="auto">
      {filteredInventory.map(({name, count}) => (
          <Box key={name} width="100%" minHeight="150px"
            display="flex" alignItems="center" justifyContent="space-between" bgcolor="#f0f0f0"
            padding={5}>
              
              <Typography variant="h3" color = "#333" textAlign="center">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Box display="flex" gap={2}>
              <Typography variant="h3" color = "#333" textAlign="center" >
                {count}
              </Typography>
              <Button variant="contained" onClick={() => {removeItem(name)}}>Remove</Button>
              </Box>

          </Box>
      ))
      }
    </Stack>
  </Box>
  </Box>
  );
}
