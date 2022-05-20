import { Button, Card, Grid, Link, Typography } from "@mui/material";
import {
  LocationStatusesTranslations,
  PaidStatusesTranslations,
} from "components/VacancyModal/constants";
import { useStores } from "hooks/useStores";
import { observer } from "mobx-react";

interface InvitationCardProps {
  item: any;
}

const InvitationCard: React.FC<InvitationCardProps> = ({ item }) => {
  const { invitationsStore } = useStores();
  const handleAcceptInvitation = () => {
    invitationsStore.acceptVacancyInvitation(item.id);
  };

  const handleRejectInvitation = () => {
    invitationsStore.rejectVacancyInvitation(item.id);
  };

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
          {!item.accepted && !item.rejected && !item.archived && (
            <Grid item sx={{ marginTop: 1, marginBottom: 1 }}>
              <Button
                onClick={handleAcceptInvitation}
                variant="contained"
                sx={{ marginRight: 1 }}
              >
                Принять
              </Button>
              <Button
                onClick={handleRejectInvitation}
                variant="contained"
                color="error"
              >
                Отклонить
              </Button>
            </Grid>
          )}
          {item.accepted && (
            <Typography sx={{ color: "#8bc34a" }}>
              Вы приняли это приглашение
            </Typography>
          )}
          {item.rejected && (
            <Typography sx={{ color: "#f44336" }}>
              Вы отклонили это приглашение
            </Typography>
          )}
          {item.rejected && (
            <Typography sx={{ color: "#f44336" }}>
              Вы отклонили это приглашение
            </Typography>
          )}
        </Grid>
      </Grid>
    </Card>
  );
};

export default observer(InvitationCard);
