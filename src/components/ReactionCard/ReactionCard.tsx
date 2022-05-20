import { Card, Typography, Chip, Link, Grid } from "@mui/material";
import {
  LocationStatusesTranslations,
  PaidStatusesTranslations,
} from "components/VacancyModal/constants";
import { observer } from "mobx-react";
import React from "react";
import { Reaction } from "store/reactions/types";
import { getNumberWithSeparator } from "utils/numberWithCommas";

interface ReactionCardProps {
  item: Reaction;
}

const ReactionCard: React.FC<ReactionCardProps> = ({ item }) => {
  return (
    <Card
      key={item.id}
      sx={{
        minHeight: "150px",
        border: "thin solid #ccc",
        borderRadius: "8px",
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
              href={`/vacancy/${item.vacancy.id}`}
            >
              {item.vacancy.title}
            </Link>
          </Grid>

          <Grid item>
            <Link
              href={`/company/${item?.vacancy.companyId}`}
              underline="hover"
              sx={{ color: "inherit" }}
            >
              {item?.vacancy?.company?.name}
            </Link>
          </Grid>
        </Grid>

        <Grid item container direction="column" spacing={1}>
          <Grid item>
            <Typography>{`${
              LocationStatusesTranslations[item.vacancy.location]
            } • ${PaidStatusesTranslations[item.vacancy.paid]}`}</Typography>
          </Grid>

          <Grid item>
            {Boolean(item.vacancy.salary) && (
              <Typography>{`${getNumberWithSeparator(
                item.vacancy.salary
              )} ₽`}</Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default observer(ReactionCard);
