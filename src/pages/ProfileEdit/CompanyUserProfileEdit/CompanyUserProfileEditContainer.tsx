import { useStores } from "hooks/useStores";
import { observer } from "mobx-react";
import React from "react";
import { useParams } from "react-router-dom";
import CompanyUserProfileEdit from "./CompanyUserProfileEdit";

const CompanyUserProfileEditContainer = () => {
  const { id } = useParams();
  const { authStore } = useStores();

  const currentProfile = authStore.getUserObject;
  const isCurrent = authStore.isCurrentUser(id);
  return currentProfile?.id ? (
    <CompanyUserProfileEdit user={isCurrent ? currentProfile : null} />
  ) : null;
};

export default observer(CompanyUserProfileEditContainer);
