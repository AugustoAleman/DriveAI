import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import Box from "@material-ui/core/Box";
import { VehicleListColors, VehicleRegistry } from "./types";

interface TagInputProps {
  label: string;
  setFormData: React.Dispatch<React.SetStateAction<VehicleRegistry>>;
  colors: string[];
}

const TagsInput: React.FC<TagInputProps> = ({ label, setFormData, colors}) => {
  const [tags, setTags] = useState<string[]>(colors);
  const [tagText, setTagText] = useState<string>("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && tagText !== "") {
      setTags([...tags, tagText]);
      setTagText("");
    }
  };

  const handleDelete = (tagToDelete: string) => () => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  useEffect(() => {
    const vehicleColors: VehicleListColors[] = tags.map(tag => ({ color: tag }));
    setFormData(prevState => ({
      ...prevState,
      colors: vehicleColors
    }));
  }, [tags]);

  return (
    <Box 
      display="flex"
      flexDirection="column"
      sx={{
        width: "100%",
        height: "6em"
      }}
    >
      <TextField
        label={label}
        variant="outlined"
        size="small"
        value={tagText}
        onKeyDown={handleKeyDown}
        onChange={(e) => setTagText(e.target.value)}
      />
      <Box display="flex" flexWrap="wrap" overflow="auto">
        {tags.map((tag) => (
          <Box m={0.5}>
            <Chip label={tag} onDelete={handleDelete(tag)} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TagsInput;
