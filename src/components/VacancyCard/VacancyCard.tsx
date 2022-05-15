import {
  CardContent,
  Card,
  Paper,
  Typography,
  Chip,
  Link,
  Box,
} from "@mui/material";
import {
  LocationStatuses,
  LocationStatusesTranslations,
} from "components/VacancyModal/constants";
import React from "react";
import { Ability } from "store/specializations/types";
import { VacancyModel } from "store/vacancies/types";

interface VacancyCardProps {
  item: VacancyModel;
}

const VacancyCard: React.FC<VacancyCardProps> = ({ item }) => {
  return (
    <Paper elevation={2}>
      <Card
        key={item.id}
        sx={{
          minHeight: "150px",
        }}
      >
        <CardContent>
          <Link
            sx={{
              fontWeight: "bold",
              fontSize: "1.2rem",
            }}
            href={`/vacancy/${item.id}`}
          >
            {item.title}
          </Link>
          <Typography>{`${item?.company?.city} • ${
            item.location === LocationStatuses.REMOTE &&
            LocationStatusesTranslations[item.location]
          }`}</Typography>
          {Boolean(item.salary) && (
            <Typography paragraph>{`${item.salary} рублей`}</Typography>
          )}
          <Box>
            {item?.abilities.map((ability: Ability) => (
              <Chip
                key={ability.id}
                label={ability.title}
                sx={{ marginRight: 1, marginTop: 1 }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>
    </Paper>
  );
};

export default VacancyCard;
