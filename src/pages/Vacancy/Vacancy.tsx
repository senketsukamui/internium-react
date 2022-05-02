import { useStores } from "hooks/useStores";
import React from "react";
import { useParams } from "react-router-dom";

const Vacancy = () => {
  const { id } = useParams();
  const { vacanciesStore } = useStores();

  React.useEffect(() => {
    vacanciesStore.getVacancy(id);
  }, []);

  return <></>;
};

export default Vacancy;
