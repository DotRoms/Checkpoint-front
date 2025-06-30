type FormProps = {
  htmlFor?: string;
  text: string;
  type?: "text" | "email" | "password";
  name?: string;
  id?: string;
  required?: boolean;
};

export function CountryFormLabel({
  text = "text",
  type,
  id,
  required = false,
}: FormProps) {
  return (
    <div className="flex flex-col gap-2 items-start justify-start">
      <label htmlFor={id}>{text}</label>
      <input
        type={type}
        name={id}
        id={id}
        required={required}
        className="border p-2 w-full rounded-md"
      />
    </div>
  );
}
