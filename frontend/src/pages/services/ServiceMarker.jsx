export function ServiceMarker({ service }) {

  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={handleClick}
      style={{
        width: 50,
        height: 50,
        borderRadius: "50%",
        overflow: "hidden",
        border: "2px solid #fff",
        boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
        cursor: "pointer",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.1)";
        e.currentTarget.style.boxShadow = "0 6px 14px rgba(0,0,0,0.35)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.25)";
      }}
    >
      <img
        src={service.image}
        alt={service.name}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  );
}