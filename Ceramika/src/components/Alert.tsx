interface Props {
  text: string;
  type:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark";
  onClose: () => void;
}

const Alert = ({ text, type, onClose }: Props) => {
  return (
    <div className={"alert alert-dismissible alert-" + type}>
      {text}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={onClose}
      ></button>
    </div>
  );
};

export default Alert;
