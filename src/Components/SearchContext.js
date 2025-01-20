import React from "react";
import { createContext , useContext } from "react";
import { useState } from "react";
export const SearchContext = createContext() ; 
export const SearchProvider = ({children}) =>{
    const [searchQuery , setSearchQuery] = useState("") ; 
    const [filteredData , setFilteredData] = useState([]) ; 
    return (
        <SearchContext.Provider value={{searchQuery , setSearchQuery , filteredData , setFilteredData}}>
           {children}
        </SearchContext.Provider>
    );
};