import React from "react";

function YesNoModal({ isOpen, message, onConfirm, onCancel }) {
  if (!isOpen) return null; // 모달이 닫혀있으면 렌더링하지 않음

  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    },
    content: {
      backgroundColor: "#ffffff",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
      textAlign: "center",
      width: "300px",
    },
    buttons: {
      marginTop: "20px",
      display: "flex",
      justifyContent: "space-around",
    },
    confirmButton: {
      backgroundColor: "#d04040",
      color: "#ffffff",
      border: "none",
      padding: "10px 20px",
      borderRadius: "5px",
      cursor: "pointer",
      fontWeight: "bold",
    },
    confirmButtonHover: {
      backgroundColor: "#b03030",
    },
    cancelButton: {
      backgroundColor: "gray",
      color: "#ffffff",
      border: "none",
      padding: "10px 20px",
      borderRadius: "5px",
      cursor: "pointer",
      fontWeight: "bold",
    },
    cancelButtonHover: {
      backgroundColor: "#606060",
    },
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.content}>
        <p>{message}</p>
        <div style={styles.buttons}>
          <button
            style={styles.confirmButton}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.confirmButtonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.confirmButton.backgroundColor)}
            onClick={onConfirm}
          >
            예
          </button>
          <button
            style={styles.cancelButton}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.cancelButtonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.cancelButton.backgroundColor)}
            onClick={onCancel}
          >
            아니오
          </button>
        </div>
      </div>
    </div>
  );
}

export default YesNoModal;
