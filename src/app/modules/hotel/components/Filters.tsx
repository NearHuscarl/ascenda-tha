import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useFilterStore } from "../stores/filters";
import { useCurrencies } from "../api/currencies";

export const Filters = () => {
  const currency = useFilterStore((state) => state.currency);
  const setCurrency = useFilterStore((state) => state.setCurrency);
  const { data: currencies = [] } = useCurrencies();

  return (
    <div className="bg-white p-3 rounded w-full shadow">
      <TextField
        style={{ width: 100 }}
        select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        fullWidth
      >
        {currencies.map((value) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};
