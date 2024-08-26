type Props = {
  message: string;
};

export const DangerAlert = ({ message }: Props) => (
  <div class="alert alert-danger alert-dismissible fade show" role="alert">
    <i class="bi bi-x-circle me-2" />
    {message}
    <button
      type="button"
      class="btn-close"
      data-bs-dismiss="alert"
      aria-label="Close"
    />
  </div>
);
