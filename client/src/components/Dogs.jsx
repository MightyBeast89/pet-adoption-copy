import React, { Component, useEffect, useState } from "react";
import { Grid, GridItem, Show } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { PetsGrid, SearchBar } from "./";
//import { petsData } from '../utils/pets';

const Pets = () => {
  const [data, setItems] = useState([]);
  const navigate = useNavigate();

  // Just for now, since data fetching is not yet done
  // TODO: Needs to work on
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Access Denied");
      navigate("/login");
    } else {
      console.log("Token:", token);
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      console.log("Headers:", headers);
      fetch("http://localhost:5000/pets/showpets", {
        method: "GET",
        headers: headers,
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setItems(data);
        });
    }
  }, []);

  // Implement later
  const onSearchChange = (event) => {};

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
      templateColumns={{ base: "1fr", lg: "200px 1fr" }}
      minH="calc(100vh - 60px)"
      gap={2}
    >
      <Show above="lg">
        <GridItem padding={5} borderRight="1px solid #f5f7f9">
          <SearchBar onSearchChange={onSearchChange} />
        </GridItem>
      </Show>
      <GridItem>
        <PetsGrid pets={data} />
      </GridItem>
    </Grid>
  );
};

export default Pets;
