import { Card, Typography, Chip, Link, Grid, Button } from "@mui/material";
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
}

export const VacancyDetailsCard: React.FC<VacancyCardProps> = ({ item }) => {
  return (
    <Card
      key={item.id}
      sx={{
        border: "thin solid #ccc",
        borderRadius: "8px",
        cursor: "pointer",

        "&:hover": {
          borderColor: "#2557a7",
          boxShadow: "0 0.125rem 0.25rem rgb(0 0 0 / 8%)",
        },
      }}
    >
      <Grid container direction="column">
        <Grid
          item
          container
          direction="column"
          sx={{
            padding: "1rem",
            boxShadow: "0 2px 4px rgb(0 0 0 / 8%)",
            borderBottom: "2px solid rgba(0,0,0,.08)",
          }}
        >
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
            <Link href={`/company/${item?.company.id}`} underline="hover">
              {item?.company?.name}
            </Link>
          </Grid>

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
            <Typography variant="caption">
              Вы должны создать профиль в Интерниуме прежде чем откликнуться
            </Typography>
          </Grid>

          <Grid item sx={{ marginTop: "6px" }}>
            <Button variant="contained" color="primary">
              Откликнуться
            </Button>
          </Grid>
        </Grid>

        <Grid
          item
          container
          spacing={2}
          direction="column"
          wrap="nowrap"
          sx={{
            padding: "1rem",
            overflow: "scroll",
            height: "calc(100vh - 230px)",
            marginTop: "0",
            paddingTop: "0",
          }}
        >
          <Grid item>
            <Typography variant="h6" fontWeight="600">
              Описание позиции
            </Typography>
            <Typography
              variant="body2"
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
          </Grid>

          <Grid item>
            <Typography variant="body2">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum
              molestiae hic harum laboriosam dicta totam eum similique ratione?
              Deleniti laborum quam dolore facilis consequatur ipsa, rem aliquid
              autem fugiat veritatis! Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Cum molestiae hic harum laboriosam dicta totam
              eum similique ratione? Deleniti laborum quam dolore facilis
              consequatur ipsa, rem aliquid autem fugiat veritatis! Lorem ipsum,
              dolor sit amet consectetur adipisicing elit. Cum molestiae hic
              harum laboriosam dicta totam eum similique ratione? Deleniti
              laborum quam dolore facilis consequatur ipsa, rem aliquid autem
              fugiat veritatis! Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Cum molestiae hic harum laboriosam dicta totam
              eum similique ratione? Deleniti laborum quam dolore facilis
              consequatur ipsa, rem aliquid autem fugiat veritatis! Lorem ipsum,
              dolor sit amet consectetur adipisicing elit. Cum molestiae hic
              harum laboriosam dicta totam eum similique ratione? Deleniti
              laborum quam dolore facilis consequatur ipsa, rem aliquid autem
              fugiat veritatis! Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Cum molestiae hic harum laboriosam dicta totam
              eum similique ratione? Deleniti laborum quam dolore facilis
              consequatur ipsa, rem aliquid autem fugiat veritatis! Lorem ipsum,
              dolor sit amet consectetur adipisicing elit. Cum molestiae hic
              harum laboriosam dicta totam eum similique ratione? Deleniti
              laborum quam dolore facilis consequatur ipsa, rem aliquid autem
              fugiat veritatis! Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Cum molestiae hic harum laboriosam dicta totam
              eum similique ratione? Deleniti laborum quam dolore facilis
              consequatur ipsa, rem aliquid autem fugiat veritatis! Lorem ipsum,
              dolor sit amet consectetur adipisicing elit. Cum molestiae hic
              harum laboriosam dicta totam eum similique ratione? Deleniti
              laborum quam dolore facilis consequatur ipsa, rem aliquid autem
              fugiat veritatis! Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Cum molestiae hic harum laboriosam dicta totam
              eum similique ratione? Deleniti laborum quam dolore facilis
              consequatur ipsa, rem aliquid autem fugiat veritatis! Lorem ipsum,
              dolor sit amet consectetur adipisicing elit. Cum molestiae hic
              harum laboriosam dicta totam eum similique ratione? Deleniti
              laborum quam dolore facilis consequatur ipsa, rem aliquid autem
              fugiat veritatis! Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Cum molestiae hic harum laboriosam dicta totam
              eum similique ratione? Deleniti laborum quam dolore facilis
              consequatur ipsa, rem aliquid autem fugiat veritatis! Lorem ipsum,
              dolor sit amet consectetur adipisicing elit. Cum molestiae hic
              harum laboriosam dicta totam eum similique ratione? Deleniti
              laborum quam dolore facilis consequatur ipsa, rem aliquid autem
              fugiat veritatis! v
            </Typography>
          </Grid>

          <Grid item>
            <Grid item container spacing={1}>
              {item?.abilities.map((ability: Ability) => (
                <Grid item key={ability.id}>
                  <Chip
                    label={ability.title}
                    sx={{
                      fontSize: 13,
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
