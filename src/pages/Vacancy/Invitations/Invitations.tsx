import { Box, Stack, Tab, Tabs } from "@mui/material";
import TabPanel from "components/TabPanel";
import UserReactionCard from "components/UserReactionCard";
import { observer } from "mobx-react";
import React from "react";

interface InvitationsProps {
  invitations: any;
}

const Invitations: React.FC<InvitationsProps> = ({ invitations }) => {
  console.log(invitations);
  const [tab, setTab] = React.useState<number>(0);
  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const activeInvitations = React.useMemo(
    () => invitations?.filter((item) => !item.rejected && !item.archived),
    [invitations]
  );

  const archivedInvitations = React?.useMemo(
    () => invitations.filter((item) => item.rejected || item.archived),
    [invitations]
  );
  return (
    <Box>
      <Tabs value={tab} onChange={handleChangeTab}>
        <Tab label={`Активные (${activeInvitations?.length})`} />
        <Tab label={`Архивированные (${archivedInvitations.length})`} />
      </Tabs>
      <TabPanel value={tab} index={0}>
        <Stack spacing={2}>
          {activeInvitations?.map((reaction: any) => (
            <UserReactionCard item={reaction} key={reaction.id} />
          ))}
        </Stack>
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <Stack spacing={2}>
          {archivedInvitations?.map((reaction: any) => (
            <UserReactionCard item={reaction} key={reaction.id} />
          ))}
        </Stack>
      </TabPanel>
    </Box>
  );
};

export default observer(Invitations);
