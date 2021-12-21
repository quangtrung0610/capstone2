import ContainerTeamwork from "../Component/Teamwork/Container/Container";

const TeamworkPage = () => {
  return (
    <div
      className="site-layout-background-teamwork"
      style={{
        padding: 24,
        minHeight: "100%",
        display: "flex",
        borderRadius: "30px",
      }}
    >
      <ContainerTeamwork />
    </div>
  );
};

export default TeamworkPage;
