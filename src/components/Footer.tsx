import React from "react";
import { Facebook, Instagram } from "iconsax-react";
import { TwitterLogo, SnapchatLogo } from "@phosphor-icons/react";

const navigation = {
  about: [
    { name: "About TTIPS", href: "#" },
    { name: "Intellectual Property", href: "#" },
    { name: "Tech Commercialisation", href: "#" },
    { name: "Resources", href: "#" },
    { name: "Grant Awards", href: "#" },
  ],
  resources: [
    { name: "TTIPS Showcase", href: "#" },
    { name: "Faculty Innovation", href: "#" },
    { name: "Student Innovation", href: "#" },
    { name: "Industry Innovation", href: "#" },
    { name: "Contact", href: "#" },
  ],
  quickLinks: [
    { name: "UG Home", href: "#" },
    { name: "ORID Home", href: "#" },
    { name: "MIS Web", href: "#" },
    { name: "Sakai LMS", href: "#" },
  ],
  legal: [
    { name: "Claim", href: "#" },
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
  ],
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#153D6D]  ">
      <div className="mx-auto max-w-[1300px] px-6 py-16 sm:py-24 lg:px-8 lg:py-32 flex justify-between items-center">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8 w-full border border-red-200">
          <div className="mt-16 grid grid-cols-2 gap-6 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-6">
              <div>
                <h3 className="text-lg font-poppins font-bold leading-6 text-white">
                  About
                </h3>
                <ul role="list" className="mt-6 space-y-2">
                  {navigation.about.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-base leading-6 text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-lg font-poppins font-bold leading-6 text-white">
                  Support
                </h3>
                <ul role="list" className="mt-6 space-y-2">
                  {navigation.resources.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-base leading-6 text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Quick Links
                </h3>
                <ul role="list" className="mt-6 space-y-2">
                  {navigation.quickLinks.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex gap-3">
            <div className=" h-14 cursor-pointer w-14 border-2 border-[#CCCCCC] rounded-full flex items-center justify-center  text-white">
              <Facebook size="25" color="#CCCCCC" variant="Bold" />
            </div>
            <div className=" h-14 cursor-pointer w-14 border-2 border-[#CCCCCC] rounded-full flex items-center justify-center  text-white">
              <TwitterLogo size={25} color="#CCCCCC" />
            </div>
            <div className=" h-14 cursor-pointer w-14 border-2 border-[#CCCCCC] rounded-full flex items-center justify-center  text-white">
              <SnapchatLogo size={25} color="#CCCCCC" />
            </div>
            <div className=" h-14 cursor-pointer w-14 border-2 border-[#CCCCCC] rounded-full flex items-center justify-center  text-white">
              <Instagram color="#CCCCCC" />
            </div>
          </div>
          <h1 className="text-[#EAEAEB] text-right tracking-normal font-normal font-lato text-base ">
            UG TechOnline &copy; 2021
          </h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
