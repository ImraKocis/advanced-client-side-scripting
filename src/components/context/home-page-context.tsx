import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  Dispatch,
  SetStateAction,
} from "react";

interface HomePageContextProps {
  perPage: number;
  setPerPage: Dispatch<SetStateAction<number>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
}

const HomePageContext = createContext<HomePageContextProps | undefined>(
  undefined,
);

export const HomePageProvider = ({ children }: { children: ReactNode }) => {
  const [perPage, setPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>("");

  const value = useMemo(
    () => ({ perPage, setPerPage, page, setPage, searchValue, setSearchValue }),
    [perPage, page, searchValue],
  );

  return (
    <HomePageContext.Provider value={value}>
      {children}
    </HomePageContext.Provider>
  );
};

export const useHomePageContext = () => {
  const context = useContext(HomePageContext);
  if (context === undefined) {
    throw new Error(
      "useHomePageContext must be used within a HomePageProvider",
    );
  }
  return context;
};
