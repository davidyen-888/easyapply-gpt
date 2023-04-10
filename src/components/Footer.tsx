import React from "react";

function Footer() {
  return (
    <div className="py-4 w-full">
      <div className="text-center text-gray-500 text-sm">
        Created by{" "}
        <a href="https://github.com/davidyen-888" className="text-blue-500">
          Sung-Yan(David) Hsieh
        </a>
        <p className="text-gray-500 text-sm">
          If this tool saves you time, please consider buying me a coffee!
        </p>
        <div className="flex space-x-2 justify-center">
          <a href="https://www.buymeacoffee.com/syhsieh" target="_blank">
            <img
              src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
              alt="Buy Me A Coffee"
              className="mx-auto w-28 h-8 mt-2"
            />
          </a>
          <a
            href="https://github.com/davidyen-888/easyapply-gpt"
            target="_blank"
            className="inline-block mx-auto mt-2"
            rel="noopener noreferrer"
          >
            <img
              src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white"
              alt="Github"
              className="mx-auto w-28 h-8"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
