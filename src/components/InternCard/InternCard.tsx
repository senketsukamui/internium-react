import { Card, Typography, Chip, Link, Grid, Box } from "@mui/material";
import {
  LocationStatuses,
  LocationStatusesTranslations,
} from "components/VacancyModal/constants";
import React from "react";
import { Intern } from "store/interns/types";
import { Ability } from "store/specializations/types";
import SvgStudent from "components/Icons/StudentIcon";

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
        display: "flex",
      }}
    >
      <Box sx={{ padding: "1rem", paddingRight: 0 }}>
        {item?.logo ? (
          <Box
            component="img"
            sx={{ width: 50, height: 50, borderRadius: "50%" }}
            src={
              typeof item.avatar === "string"
                ? `https://internium.monkeyhackers.org/${item.avatar}`
                : URL.createObjectURL(item.avatar as Blob)
            }
          />
        ) : (
          <SvgStudent width={50} height={50} />
        )}
      </Box>
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
