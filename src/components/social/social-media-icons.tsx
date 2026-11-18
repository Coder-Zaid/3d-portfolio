"use client";

import { useInView } from "framer-motion";
import React, { useRef } from "react";
import { Button } from "../ui/button";
import { SiGithub, SiInstagram, SiLinkedin } from "react-icons/si";
import { FaEnvelope, FaPhone } from "react-icons/fa6";
import { config } from "@/data/config";
import { usePathname } from "next/navigation";
import Link from "next/link";

const SocialMediaButtons = () => {
  const ref = useRef<HTMLDivElement>(null);
  const show = useInView(ref, { once: true });
  const pathname = usePathname();
  const isFemale = pathname?.startsWith("/female");

  const buttons = isFemale
    ? [
        {
          name: "Email",
          href: "mailto:zubiaareej2@gmail.com",
          icon: <FaEnvelope size={"20"} className="text-pink-600 dark:text-pink-400" />,
        },
        {
          name: "Phone",
          href: "tel:+919100805104",
          icon: <FaPhone size={"20"} className="text-pink-600 dark:text-pink-400" />,
        },
        {
          name: "LinkedIn",
          href: "https://www.linkedin.com/in/syeda-zubia-areej",
          icon: <SiLinkedin size={"20"} className="text-pink-600 dark:text-pink-400" />,
        },
      ]
    : [
        {
          name: "Github",
          href: config.social.github,
          icon: <SiGithub size={"24"} color={"#fff"} />,
        },
        {
          name: "LinkedIn",
          href: config.social.linkedin,
          icon: <SiLinkedin size={"24"} color={"#fff"} />,
        },
        {
          name: "Instagram",
          href: config.social.instagram,
          icon: <SiInstagram size={"24"} color={"#fff"} />,
        },
      ];

  return (
    <div ref={ref} className="z-10 flex gap-2">
      {show &&
        buttons.map((button) => (
          <Link href={button.href} key={button.name} target="_blank">
            <Button variant={"ghost"} className="h-10 w-10 p-0 flex items-center justify-center rounded-full hover:bg-pink-100/30">
              {button.icon}
            </Button>
          </Link>
        ))}
    </div>
  );
};

export default SocialMediaButtons;
