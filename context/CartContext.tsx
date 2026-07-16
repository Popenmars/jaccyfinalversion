"use client";

import React, { createContext, useContext, useReducer, useEffect, useState, ReactNode } from "react";
import { CartItem, Product } from "@/types";

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "INCREMENT"; payload: string }
  | { type: "DECREMENT"; payload: string }
  | { type: "CLEAR_CART" }
  | { type: "INIT_CART"; payload: CartItem[] };

const initialState: CartState = {
  items: [],
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.product.id === product.id);

      if (existingItem) {
        if (existingItem.quantity >= product.stockQuantity) {
          alert("Cannot add more than available stock.");
          return state;
        }
        return {
          ...state,
          items: state.items.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        if (product.stockQuantity < 1) {
          alert("This item is out of stock.");
          return state;
        }
        return {
          ...state,
          items: [...state.items, { product, quantity: 1 }],
        };
      }
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.product.id !== action.payload),
      };
    case "INCREMENT":
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.product.id === action.payload) {
            if (item.quantity >= item.product.stockQuantity) {
              alert("Cannot add more than available stock.");
              return item;
            }
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        }),
      };
    case "DECREMENT":
      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    case "INIT_CART":
      return { ...state, items: action.payload };
    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("jaccy_cart");
    if (savedCart) {
      try {
        const parsedItems = JSON.parse(savedCart);
        dispatch({ type: "INIT_CART", payload: parsedItems });
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("jaccy_cart", JSON.stringify(state.items));
    }
  }, [state.items, isMounted]);

  if (!isMounted) return null;

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
