import SelectClasses from "../Component/transcriptTeahcer/SelectClass";

const SelectClassPage = () => {
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
      <SelectClasses />
    </div>
  );
};

export default SelectClassPage;
