import { Card, Grid, Typography, Button, Link, Box } from "@mui/material";
import { baseURL } from "api/utils";
import SvgStudent from "components/Icons/StudentIcon";
import {
  LocationStatusesTranslations,
  PaidStatusesTranslations,
} from "components/VacancyModal/constants";
import { profile } from "console";
import { formatDistance } from "date-fns";
import { ru } from "date-fns/locale";
import useNotification from "hooks/useNotification";
import { useStores } from "hooks/useStores";
import React from "react";

interface UserInvitationCardProps {
  item: any;
}

const UserInvitationCard: React.FC<UserInvitationCardProps> = ({ item }) => {
  const { invitationsStore } = useStores();
  const [message, sendMessage] = useNotification();
  const isActiveInvitation = !item.accepted && !item.archived && !item.rejected;

  const handleDeleteInvitation = () => {
    invitationsStore.deleteReaction(item?.id).then(() =>
      sendMessage({
        msg: "Вы успешно удалили отклик на вакансию!",
        variant: "danger",
      })
    );
  };

  const handleAcceptReaction = () => {
    invitationsStore.acceptReaction(item?.id).then(() =>
      sendMessage({
        msg: "Вы успешно приняли отклик на вакансию!",
        variant: "success",
      })
    );
  };

  return (
    <Card
      key={item.id}
      sx={{
        minHeight: "150px",
        border: "thin solid #ccc",
        borderRadius: "8px",
        display: "flex",
      }}
    >
      <Box sx={{ padding: "1rem", paddingRight: 0 }}>
        {item?.intern?.avatar ? (
          <Box
            component="img"
            sx={{ width: 50, height: 50, borderRadius: "50%" }}
            src={
              typeof item?.intern.avatar === "string"
                ? `${baseURL}/${item?.intern.avatar}`
                : URL.createObjectURL(item?.intern.avatar as Blob)
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
              href={`/intern/profile/${item?.intern?.id}`}
            >
              {`${item.intern?.firstName} ${item.intern?.lastName}`}
            </Link>
          </Grid>
        </Grid>

        <Grid item container direction="column" spacing={1}>
          {item?.intern?.location && (
            <Grid item>
              <Typography>{item?.intern?.location}</Typography>
            </Grid>
          )}
          <Grid item>
            <Typography>
              {formatDistance(new Date(item.createdAt), Date.now(), {
                addSuffix: true,
                locale: ru,
              })}
            </Typography>
          </Grid>

          {isActiveInvitation && (
            <Grid item>
              <Button
                sx={{ marginRight: 1 }}
                variant="contained"
                onClick={handleAcceptReaction}
              >
                Принять отклик
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleDeleteInvitation}
              >
                Удалить отклик
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Card>
  );
};

export default UserInvitationCard;
