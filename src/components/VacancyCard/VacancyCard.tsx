import { Card, Typography, Chip, Link, Grid } from "@mui/material";
import {
  LocationStatuses,
  LocationStatusesTranslations,
} from "components/VacancyModal/constants";
import React from "react";
import { Ability } from "store/specializations/types";
import { VacancyModel } from "store/vacancies/types";
import { getNumberWithSeparator } from "utils/numberWithCommas";

interface VacancyCardProps {
  item: VacancyModel;
  isActive: boolean;
  onClick: (item: VacancyModel) => void;
}

const activeStyles = {
  borderColor: "#2557a7",
  boxShadow: "0 0.125rem 0.25rem rgb(0 0 0 / 8%)",
};

const VacancyCard: React.FC<VacancyCardProps> = ({
  item,
  onClick,
  isActive,
}) => {
  return (
    <Card
      key={item.id}
      onClick={() => onClick(item)}
      sx={{
        minHeight: "150px",
        border: "thin solid #ccc",
        borderRadius: "8px",
        cursor: "pointer",

        "&:hover": activeStyles,
        ...(isActive ? activeStyles : {}),
      }}
    >
      <Grid container direction="column" sx={{ padding: "1rem" }}>
        <Grid item container direction="column">
          <Grid item>
            <Link
              sx={{
                fontWeight: "bold",
                fontSize: "1.2rem",
                color: "inherit",
              }}
              underline="hover"
              href={`/vacancy/${item.id}`}
            >
              {item.title}
            </Link>
          </Grid>

          <Grid item>
            <Link
              href={`/company/${item?.company.id}`}
              underline="hover"
              sx={{ color: "inherit" }}
            >
              {item?.company?.name}
            </Link>
          </Grid>
        </Grid>

        <Grid item container direction="column" spacing={1}>
          <Grid item>
            <Typography>{`${item?.company?.city} • ${
              item.location === LocationStatuses.REMOTE
                ? LocationStatusesTranslations[item.location]
                : ""
            }`}</Typography>
          </Grid>

          <Grid item>
            {Boolean(item.salary) && (
              <Typography>{`${getNumberWithSeparator(
                item.salary
              )} Р`}</Typography>
            )}
          </Grid>

          <Grid item>
            <Grid item container spacing={1}>
              {item?.abilities.map((ability: Ability) => (
                <Grid item key={ability.id}>
                  {/* TOOD: Move into a separated component */}
                  <Chip
                    label={ability.title}
                    sx={{
                      fontSize: 11,
                      backgroundColor: "rgb(133 133 133 / 8%)",
                      borderRadius: "8px",
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item>
            <Typography variant="caption">26 дней назад</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default VacancyCard;
