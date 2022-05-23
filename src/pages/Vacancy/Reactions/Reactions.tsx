import { Box, Stack, Tab, Tabs } from "@mui/material";
import TabPanel from "components/TabPanel";
import UserReactionCard from "components/UserReactionCard";
import { observer } from "mobx-react";
import React from "react";

interface ReactionsProps {
  reactions: any;
}

const Reactions: React.FC<ReactionsProps> = ({ reactions }) => {
  const [tab, setTab] = React.useState<number>(0);
  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

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
        <Tab label={`Активные (${activeReactions?.length})`} />
        <Tab label={`Архивированные (${archivedReactions.length})`} />
      </Tabs>
      <TabPanel value={tab} index={0}>
        <Stack spacing={2}>
          {activeReactions?.map((reaction: any) => (
            <UserReactionCard item={reaction} key={reaction.id} />
          ))}
        </Stack>
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <Stack spacing={2}>
          {archivedReactions?.map((reaction: any) => (
            <UserReactionCard item={reaction} key={reaction.id} />
          ))}
        </Stack>
      </TabPanel>
    </Box>
  );
};

export default observer(Reactions);
