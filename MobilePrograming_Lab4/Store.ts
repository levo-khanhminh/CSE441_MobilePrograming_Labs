import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Contact } from "./modules/type";
type State = {
  contacts: Contact[];
};
type ActionType = {
  emai: string;
  favourite: boolean;
};
const initialState: State = {
  contacts: [],
};
const slice = createSlice({
  name: "test",
  initialState,
  reducers: {
    fetchContactsSuccess: (state: State, action: PayloadAction<Contact[]>) => ({
      ...state,
      contacts: action.payload,
    }),
    updateContactFavourite: (
      state: State,
      action: PayloadAction<{ email: string; favourite: boolean }>
    ) => {
      const contact = state.contacts.find(
        (c) => c.email === action.payload.email
      );
      if (contact) {
        contact.favourite = action.payload.favourite; // Direct mutation is safe
      }

      return state;
    },
  },
});

export const { fetchContactsSuccess, updateContactFavourite } = slice.actions;
const store = configureStore({
  reducer: slice.reducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
