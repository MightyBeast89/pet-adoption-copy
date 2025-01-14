import React, { Component, useEffect, useState } from "react";
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Show,
  Button,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { PetsGrid, SearchBar, Pet } from "./";

//import { petsData } from '../utils/pets';

const Pets = ({ isUserLogin, isShelterLogin, setPetId }) => {
  const [data, setItems] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const filteredPets = data.filter(pet =>
    pet.petName?.toLowerCase().includes(searchInput.toLowerCase())
  );

  // Just for now, since data fetching is not yet done
  // TODO: Needs to work on
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Access Denied');
      navigate('/login');
    } else {
      console.log('Token:', token);
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      console.log('Headers:', headers);
      const endpoints = isShelterLogin ? 'showpets' : 'pets';
      fetch(`http://localhost:5000/pets/${endpoints}`, {
        method: 'GET',
        headers: headers,
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          setItems(data);
        });
    }
  }, [isShelterLogin, navigate]);

  // Implement later
  const onSearchChange = event => {
    setSearchInput(event.target.value);
  };

  // return (
  //   <table style={{ width: 500, border: 1 }}>
  //     <tbody>
  //       <tr>
  //         <th>Name</th>
  //         <th>Age</th>
  //       </tr>
  //       {data.map((i) => {
  //         return (
  //           <tr key={i._id}>
  //             <td>{i.petName}</td>
  //             <td>{i.age}</td>
  //           </tr>
  //         );
  //       })}
  //     </tbody>
  //     <button>
  //       <a href="/addpet">Add Pet</a>
  //     </button>
  //   </table>
  // );

  return (
    <Grid
      templateColumns={{ base: '1fr', lg: '200px 1fr' }}
      minH='calc(100vh - 60px)'
      gap={2}
    >
      <Show above='lg'>
        <GridItem padding={5} borderRight='1px solid #f5f7f9'>
          <VStack justifyContent='space-between'>
            <SearchBar onSearchChange={onSearchChange} />

            {isUserLogin && (
              <Button
                width='100%'
                borderRadius={20}
                colorScheme='teal'
                onClick={() => navigate('/petownersurvey')}
              >
                Survey
              </Button>
            )}
            {isShelterLogin && (
              <Button
                width='100%'
                borderRadius={20}
                colorScheme='teal'
                onClick={() => navigate('/addpet')}
              >
                Add Pet
              </Button>
            )}
          </VStack>
        </GridItem>
      </Show>
      <GridItem>
        {filteredPets.length === 0 ? (
          <Box h='100vh' display='flex' justifyContent='center'>
            <Heading marginTop={40}>No pets available...</Heading>
          </Box>
        ) : (
          <PetsGrid>
            {filteredPets.map(pet => (
              <Pet
                isShelterLogin={isShelterLogin}
                isUserLogin={isUserLogin}
                key={pet._id}
                pet={pet}
                setPetId={setPetId}
              />
            ))}
          </PetsGrid>
        )}
      </GridItem>
    </Grid>
  );
};

export default Pets;
