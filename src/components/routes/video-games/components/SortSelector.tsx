import { Button, Menu, MenuItem } from "@mui/material";
import { BsChevronDown } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setSortOrder } from "../../../../redux/slices/gamesSlice";
import { useState } from "react";

const SortSelector = () => {
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const sortOrders = [
    { value: "", label: "Relevance" },
    { value: "-added", label: "Date added" },
    { value: "name", label: "Name" },
    { value: "-released", label: "Release date" },
    { value: "-metacritic", label: "Popularity" },
    { value: "-rating", label: "Average rating" },
  ];

  const sortOrder = useAppSelector((state) => state.games.sortOrder);
  const handleSetSortOrder = (sortOrder: string) => {
    dispatch(setSortOrder(sortOrder));
  };

  const currentSortOrder = sortOrders.find(
    (order) => order.value === sortOrder
  );

  return (
    <Menu open={open} onChange={(isOpen) => setOpen(!isOpen)}>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<BsChevronDown />}
      >
        Order by: {currentSortOrder?.label || "Relevance"}
      </Button>
      {sortOrders.map((order) => (
        <MenuItem
          onClick={() => handleSetSortOrder(order.value)}
          key={order.value}
          value={order.value}
        >
          {order.label}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default SortSelector;
