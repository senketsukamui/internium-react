import { Divider, List, ListItem, ListItemButton } from "@mui/material";
import { useStores } from "hooks/useStores";
import { observer } from "mobx-react";
import React, { FC } from "react";
import { Ability, Specialization } from "store/specializations/types";
import s from "./SpecializationSelect.module.scss";

interface SelectProps {
  abilities: number[];
  setAbilities: any;
}

const SpecializationSelect: FC<SelectProps> = ({ abilities, setAbilities }) => {
  const { specializationsStore } = useStores();

  const [specialization, setSpecialization] = React.useState<number | null>(
    null
  );

  React.useEffect(() => {
    specializationsStore.getSpecializations();
  }, []);

  React.useEffect(() => {
    if (specialization) {
      specializationsStore.getSpecialization(specialization);
    }
  }, [specialization]);

  const handleSpecializationSelect = (id: number) => {
    setSpecialization(id);
    setAbilities([]);
  };

  const handleAbilitySelect = (id: number) => {
    if (abilities?.includes(id)) {
      setAbilities(abilities.filter((item) => item !== id));
    } else {
      setAbilities((prev) => [...prev, id]);
    }
  };

  const specializations = specializationsStore.getSpecializationsValue();

  const specializationValue = specializationsStore.getSpecializationValue();

  console.log(specializationValue);

  return (
    <div className={s.root}>
      {specializations && (
        <List
          sx={{
            width: "50%",
            maxHeight: "400px",
            overflow: "auto",
          }}
        >
          {specializations.map((item: Specialization) => (
            <ListItemButton
              key={item.id}
              selected={item.id === specialization}
              divider
              onClick={() => handleSpecializationSelect(item.id)}
            >
              {item.title}
            </ListItemButton>
          ))}
        </List>
      )}
      {specialization && specializationValue?.abilities?.length && (
        <List
          sx={{
            width: "50%",
            maxHeight: "400px",
            overflow: "auto",
          }}
        >
          {specializationValue.abilities.map((item: Ability) => (
            <ListItemButton
              key={item.id}
              selected={abilities?.includes(item.id)}
              divider
              onClick={() => handleAbilitySelect(item.id)}
            >
              {item.title}
            </ListItemButton>
          ))}
        </List>
      )}
    </div>
  );
};

export default observer(SpecializationSelect);
