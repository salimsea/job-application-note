export const WidgetCount = ({ icon, heading, count = 0 }) => {
  return (
    <div className="card info-box-2">
      <div className="body">
        <div className="icon">
          <div className="chart chart-bar">{icon}</div>
        </div>
        <div className="content">
          <div className="text">{heading}</div>
          <div className="number">{count}</div>
        </div>
      </div>
    </div>
  );
};
