'use client'

import { Audio } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="loader">
      <Audio
        height="80"
        width="80"
        radius="9"
        color="purple"
        ariaLabel="loading"
        wrapperClass="spinner"
      />
    </div>
  );
}
