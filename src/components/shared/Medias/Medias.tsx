import React from "react";
import { facebook, linkedin, instagram, youtube } from "@/assets";
import Image from "next/image";
import Background from "@/assets/img/medias-bg.png";
import { MediaLinkProps } from "./types";

const MediaLink: React.FC<MediaLinkProps> = ({ href, src, alt, username }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex gap-2 items-center"
  >
    <img className="w-[40px] h-[40px]" src={src} alt={alt} />
    {username}
  </a>
);

const Medias: React.FC = () => (
  <div
    className="justify-center flex text-black flex-wrap tablet:justify-center bg-no-repeat bg-center"
    style={{ backgroundImage: `url(${Background.src})` }}
  >
    <div className="flex content-center flex-wrap gap-14 bg-white px-7 h-60 tablet:justify-center tablet:mx-8">
      <MediaLink
        href="#"
        src={facebook}
        alt="facebook-logo"
        username="@millsbr"
      />
      <MediaLink
        href="#"
        src={linkedin}
        alt="linkedin-logo"
        username="@millsoficial"
      />
      <MediaLink
        href="#"
        src={instagram}
        alt="instagram-logo"
        username="@millsoficial"
      />
      <MediaLink
        href="#"
        src={youtube}
        alt="youtube-logo"
        username="@canalmills"
      />
    </div>
  </div>
);

export default Medias;
