export const Spinner = ({ className = "" }) => (
  <span
    className={`inline-block w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin ${className}`}
    role="status"
    aria-label="loading"
  />
);