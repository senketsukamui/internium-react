import { Box, Stack, Tab, Tabs, Typography } from "@mui/material";
import InvitationCard from "components/InvitationCard";
import ReactionCard from "components/ReactionCard";
import TabPanel from "components/TabPanel";
import { observer } from "mobx-react";
import React from "react";

interface ReactionsProps {
  reactions: any;
  invitations: any;
}

const Reactions: React.FC<ReactionsProps> = ({ reactions, invitations }) => {
  const [tab, setTab] = React.useState<number>(0);
  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const activeInvitations = React.useMemo(
    () => invitations?.filter((item) => !item.rejected && !item.archived),
    [invitations]
  );

  const archivedInvitations = React.useMemo(
    () => invitations?.filter((item) => item.rejected || item.archived),
    [invitations]
  );

  const activeReactions = React.useMemo(
    () =>
      reactions.filter(
        (item) => !item.rejected && !item.archived && !item.accepted
      ),
    []
  );

  const archivedReactions = React.useMemo(
    () =>
      reactions.filter(
        (item) => item.rejected || item.archived || item.accepted
      ),
    []
  );
  return (
    <Box>
      <Tabs value={tab} onChange={handleChangeTab}>
        <Tab label={`Активные (${activeInvitations?.length})`} />
        <Tab label={`Реакции (${activeReactions?.length})`} />
        <Tab
          label={`Архивированные (${
            archivedInvitations?.length + archivedReactions.length
          })`}
        />
      </Tabs>
      <TabPanel value={tab} index={0}>
        <Stack spacing={2}>
          {activeInvitations?.map((reaction: any) => (
            <InvitationCard item={reaction} key={reaction.id} />
          ))}
        </Stack>
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <Stack spacing={2}>
          {activeReactions?.map((reaction: any) => (
            <ReactionCard item={reaction} key={reaction.id} />
          ))}
        </Stack>
      </TabPanel>
      <TabPanel value={tab} index={2}>
        <Stack spacing={2}>
          {archivedInvitations?.map((invitation: any) => (
            <InvitationCard item={invitation} key={reaction.id} />
          ))}
          {archivedReactions?.map((reaction: any) => (
            <ReactionCard item={reaction} key={reaction.id} />
          ))}
        </Stack>
      </TabPanel>
    </Box>
  );
};

export default observer(Reactions);
