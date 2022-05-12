import { useStores } from "hooks/useStores";
import { observer } from "mobx-react";
import React from "react";
import { useParams } from "react-router-dom";
import CompanyProfileEdit from "./CompanyProfileEdit";

const CompanyProfileEditContainer = () => {
  const { id } = useParams();
  const { authStore } = useStores();

  const currentProfile = authStore.getUserObject;
  const isCurrent = authStore.isCurrentUser(id);
  return currentProfile?.id ? (
    <CompanyProfileEdit user={isCurrent ? currentProfile?.company : null} />
  ) : null;
};

export default observer(CompanyProfileEditContainer);
