"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useState,
} from "react";

const initialState: {
  editing: boolean;
  setEditing: Dispatch<React.SetStateAction<boolean>> | undefined;
  id: string | null;
  setId: Dispatch<React.SetStateAction<string | null>> | undefined;
} = {
  editing: false,
  setEditing: undefined,
  id: null,
  setId: undefined,
};

const EditingContext = createContext(initialState);

export function EditingContextProvider({ children }: { children: ReactNode }) {
  const [editing, setEditing] = useState<boolean>(false);
  const [id, setId] = useState<string | null>(null);

  return (
    <EditingContext.Provider value={{ editing, setEditing, id, setId }}>
      {children}
    </EditingContext.Provider>
  );
}

export const useEditing = () => useContext(EditingContext);
