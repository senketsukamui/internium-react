import { Card, Typography, Chip, Link, Grid } from "@mui/material";
import {
  LocationStatuses,
  LocationStatusesTranslations,
} from "components/VacancyModal/constants";
import React from "react";
import { Intern } from "store/interns/types";
import { Ability } from "store/specializations/types";
import { VacancyModel } from "store/vacancies/types";
import { getNumberWithSeparator } from "utils/numberWithCommas";

interface CardProps {
  item: Intern;
  onClick: (item: Intern) => void;
}

const InternCard: React.FC<CardProps> = ({ onClick, item }) => {
  return (
    <Card
      key={item.id}
      onClick={() => onClick(item)}
      sx={{
        minHeight: "150px",
        border: "thin solid #ccc",
        borderRadius: "8px",
        cursor: "pointer",
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
              href={`/intern/profile/${item.id}`}
            >
              {`${item.firstName} ${item.lastName}`}
            </Link>
          </Grid>
        </Grid>

        <Grid item container direction="column" spacing={1}>
          {item.location && (
            <Grid item>
              <Typography>{item.location}</Typography>
            </Grid>
          )}

          <Grid item>
            <Grid item container spacing={1}>
              {item?.abilities?.map((ability: Ability) => (
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

export default InternCard;
