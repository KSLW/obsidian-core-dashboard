import styles from "../styles/table.module.css";

export default function Table({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = "No data found",
  renderRow,
}) {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {loading && [...Array(5)].map((_, i) => (
            <tr className={styles.row} key={i}>
              <td colSpan={columns.length}>
                <div className={styles.skeleton}></div>
              </td>
            </tr>
          ))}

          {!loading && data.length === 0 && (
            <tr>
              <td colSpan={columns.length} className={styles.empty}>
                {emptyMessage}
              </td>
            </tr>
          )}

          {!loading && data.length > 0 && data.map((row, i) => (
            <tr className={styles.row} key={i}>
              {renderRow(row)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
