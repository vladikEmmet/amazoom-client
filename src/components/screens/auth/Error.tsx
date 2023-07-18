import { FC } from "react";

interface ErrorProps {
    error: string | null;
}

const Error: FC<ErrorProps> = ({error}) => {
  return (error && error.length > 0) ? <p className="text-warning text-sm self-start">{error}</p> : null;
}

export default Error