// context/SearchContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface SearchContextType {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    allcategory: string;
    setAllCategory: (category: string) => void;
    suggestions: { pname: string; _id: string }[];
    showSuggestions: boolean;
    setShowSuggestions: (show: boolean) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [allcategory, setAllCategory] = useState<string>("All Products"); // Default category
    const [suggestions, setSuggestions] = useState<{ pname: string; _id: string }[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Fetch search suggestions from the API based on `searchTerm` and `allcategory`
    useEffect(() => {
        const fetchSuggestions = async () => {
            if (!searchTerm) {
                setSuggestions([]);
                setShowSuggestions(false);
                return;
            }

            try {
                const response = await fetch(`/api/postitems?search=${searchTerm}&allcategory=${allcategory}`);
                const data = await response.json();
                setSuggestions(data);
                setShowSuggestions(true);
            } catch (error) {
                console.error("Error fetching search suggestions:", error);
            }
        };

        fetchSuggestions();
    }, [searchTerm, allcategory]);

    return (
        <SearchContext.Provider
            value={{ searchTerm, setSearchTerm, allcategory, setAllCategory, suggestions, showSuggestions, setShowSuggestions }}
        >
            {children}
        </SearchContext.Provider>
    );
};

export const useSearchContext = () => {
    const context = useContext(SearchContext);
    if (context === undefined) {
        throw new Error("useSearchContext must be used within a SearchProvider");
    }
    return context;
};
