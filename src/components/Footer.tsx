import React from "react";

function Footer() {
  return (
    <div className="py-4 absolute bottom-0 w-full">
      <p className="text-center text-gray-500 text-sm">
        Created by{" "}
        <a href="https://github.com/davidyen-888" className="text-blue-500">
          Sung-Yan(David) Hsieh
        </a>
        <a href="https://www.buymeacoffee.com/syhsieh" target="_blank">
          <img
            src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
            alt="Buy Me A Coffee"
            className="mx-auto w-28 h-8"
          />
        </a>
      </p>
    </div>
  );
}

export default Footer;
