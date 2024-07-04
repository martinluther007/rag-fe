import { ChangeEvent } from "react";
import { BsPlus } from "react-icons/bs";
import { HiPencil } from "react-icons/hi";

export default function DocumentInput({
  id = "dropzone-file",
  initialValue,
  value,
  onChange,
  label,
  placeholder,
  accept,
  ...props
}: {
  initialValue?: any;
  value: any;
  onChange: Function;
  label?: any;
  placeholder?: any;
  accept: any;
  id?: string;
}) {
  const valueURL = value
    ? value.url
      ? value.url
      : URL.createObjectURL(value)
    : null;

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    if (onChange && event?.target?.files) {
      onChange(event?.target?.files[0]);
    }
  }

  return (
    <div {...props} className="mt-5">
      {label && (
        <label className="w-full mb-2 text-sm font-medium" htmlFor={id}>
          {label}
        </label>
      )}
      <div className="relative w-full h-10 md:h-[5vh] md:mt-[0.5vh] rounded-lg md:rounded-[1.25vh] bg-white bg-opacity-50 focus-within:border focus-within:border-black overflow-hidden">
        {value ? (
          <a
            href={valueURL}
            target="_blank"
            className="relative flex justify-center items-center h-full aspect-square text-primary"
          >
            <img src={valueURL} alt={label} />
          </a>
        ) : (
          initialValue && (
            <a
              href={initialValue.url}
              target="_blank"
              className="relative flex justify-center items-center h-full aspect-square text-primary"
            >
              <img src={initialValue.url} alt={label} />
            </a>
          )
        )}
        <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full text-primary overflow-hidden">
          {value ? (
            <span className="w-full pl-12 md:pl-[6vh] pr-5 md:pr-[2.5vh] text-sm md:text-[1.5vh] md:leading-[2vh] text-primary3 truncate">
              {value.name}
            </span>
          ) : initialValue ? (
            <HiPencil className="w-4 h-4 md:w-[2vh] md:h-[2vh]" />
          ) : (
            <BsPlus className="w-6 h-6 md:w-[3vh] md:h-[3vh]" />
          )}
        </div>
        <input
          id={id}
          type="file"
          name="file"
          accept={accept}
          onChange={(e) => handleFileChange(e)}
          className="absolute top-0 left-0 w-full h-full opacity-0"
        />
      </div>
    </div>
  );
}
