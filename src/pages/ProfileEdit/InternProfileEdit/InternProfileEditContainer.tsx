import { useStores } from "hooks/useStores";
import { observer } from "mobx-react";
import React from "react";
import { useParams } from "react-router-dom";
import InternProfileEdit from "./InternProfileEdit";

const InternProfileEditContainer = () => {
  const { id } = useParams();
  const { authStore } = useStores();

  const currentProfile = authStore.getUserObject;
  const isCurrent = authStore.isCurrentUser(id);

  return currentProfile?.id ? (
    <InternProfileEdit user={isCurrent ? currentProfile : null} />
  ) : null;
};

export default observer(InternProfileEditContainer);
