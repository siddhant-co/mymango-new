// // 📁 cartSlice.ts
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface CartItem {
//   id: number; // ✅ Required cart item ID (from backend)
//   productId: number;
//   name: string;
//   basePrice: number;
//   quantity: number;
//   variantId: number | null;
//   image: string;
//   product: any;
//   price: any;
// }

// interface CartState {
//   items: CartItem[];
// }

// const initialState: CartState = {
//   items: [],
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     setCartItems: (state, action: PayloadAction<CartItem[]>) => {
//       state.items = action.payload;
//     },
//     removeFromCartState: (state, action: PayloadAction<number>) => {
//       // ✅ Remove by cart item id
//       state.items = state.items.filter(item => item.id !== action.payload);
//     },
//     clearCartState: (state) => {
//       state.items = [];
//     },
//     addToCart: (state, action: PayloadAction<CartItem>) => {
//       const { productId, variantId, quantity } = action.payload;
//       const existingItem = state.items.find(
//         item => item.productId === productId && item.variantId === variantId
//       );

//       if (existingItem) {
//         existingItem.quantity += quantity;
//       } else {
//         state.items.push(action.payload);
//       }
//     },
    
//   },
// });

// export const {
//   setCartItems,
//   removeFromCartState,
//   clearCartState,
//   addToCart,
// } = cartSlice.actions;
// export default cartSlice.reducer;



// 📁 cartSlice.ts
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface CartItem {
//   id: number; // ✅ Required cart item ID (from backend)
//   productId: number;
//   name: string;
//   basePrice: number;
//   quantity: number;
//   variantId: number | null;
//   image: string;
//   product: any;
//   price: any;
// }

// interface CartState {
//   items: CartItem[];
// }

// const initialState: CartState = {
//   items: [],
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     setCartItems: (state, action: PayloadAction<CartItem[]>) => {
//       state.items = action.payload;
//     },
//     removeFromCartState: (state, action: PayloadAction<number>) => {
//       state.items = state.items.filter(item => item.id !== action.payload);
//     },
//     clearCartState: (state) => {
//       state.items = [];
//     },
//     addToCart: (state, action: PayloadAction<CartItem>) => {
//       const { productId, variantId, quantity } = action.payload;
//       const existingItem = state.items.find(
//         item => item.productId === productId && item.variantId === variantId
//       );

//       if (existingItem) {
//         existingItem.quantity += quantity;
//       } else {
//         state.items.push(action.payload);
//       }
//     },

//     // ✅ New Reducer: Update Cart Item Quantity
//     updateCartItemQuantity: (
//       state,
//       action: PayloadAction<{ id: number; quantity: number }>
//     ) => {
//       const { id, quantity } = action.payload;
//       const item = state.items.find(item => item.id === id);

//       if (item && quantity >= 1) {
//         item.quantity = quantity;
//       }
//     },
//   },
// });

// export const {
//   setCartItems,
//   removeFromCartState,
//   clearCartState,
//   addToCart,
//   updateCartItemQuantity, // 👉 export this
// } = cartSlice.actions;

// export default cartSlice.reducer;



import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: number; // ✅ Required cart item ID (from backend)
  productId: number;
  name: string;
  basePrice: number;
  quantity: number;
  variantId: number | null;
  image: string;
  product: any;
  price: any;
}

interface CartState {
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
}

const discountThreshold = 500;
const discountRate = 0.1;

const initialState: CartState = {
  items: [],
  subtotal: 0,
  discount: 0,
  total: 0,
};

// 👉 Reusable function to calculate totals
const calculateTotals = (items: CartItem[]) => {
  const subtotal = items.reduce((acc, item) => acc + item.basePrice * item.quantity, 0);
  const discount = subtotal >= discountThreshold ? subtotal * discountRate : 0;
  const total = subtotal - discount;

  return { subtotal, discount, total };
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      const totals = calculateTotals(state.items);
      state.subtotal = totals.subtotal;
      state.discount = totals.discount;
      state.total = totals.total;
    },
    removeFromCartState: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      const totals = calculateTotals(state.items);
      state.subtotal = totals.subtotal;
      state.discount = totals.discount;
      state.total = totals.total;
    },
    clearCartState: (state) => {
      state.items = [];
      state.subtotal = 0;
      state.discount = 0;
      state.total = 0;
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { productId, variantId, quantity } = action.payload;
      const existingItem = state.items.find(
        item => item.productId === productId && item.variantId === variantId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push(action.payload);
      }

      const totals = calculateTotals(state.items);
      state.subtotal = totals.subtotal;
      state.discount = totals.discount;
      state.total = totals.total;
    },
    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);

      if (item && quantity >= 1) {
        item.quantity = quantity;
      }

      const totals = calculateTotals(state.items);
      state.subtotal = totals.subtotal;
      state.discount = totals.discount;
      state.total = totals.total;
    },
  },
});

export const {
  setCartItems,
  removeFromCartState,
  clearCartState,
  addToCart,
  updateCartItemQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
