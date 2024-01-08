import React from "react";
import { FooterProps, FooterLinkProps, FooterSocialMedialProps } from "./types";
import { footerData as data } from "./footerData";
import theme from "theme/theme";
import {
  Line,
  Title,
  Text,
  Link,
  Logo,
  LinkLogo,
  TitleLogo,
  FooterBase,
  FooterColumnContent1,
  FooterLogo,
  FooterSocialMedia,
  SocialMediaCard,
} from "./styles";

const Footer: React.FC<FooterProps> = ({
  colorBackground = theme.palette.primary.main,
  colorText = theme.palette.background.default,
  colorLineAndSocialMedia = theme.palette.accent.main,
}) => {
  const footerLink = (props: FooterLinkProps) => {
    const { link, title } = props;
    return (
      <React.Fragment>
        <Title>{title}</Title>
        <Line
          colorLineAndSocialMedia={colorLineAndSocialMedia}
          colorText={colorText}
          colorBackground={colorBackground}
        />
        {link.map((link, index) => (
          <Text key={index}>
            <Link
              colorLineAndSocialMedia={colorLineAndSocialMedia}
              colorText={colorText}
              colorBackground={colorBackground}
              href={`${link.url}`}
            >
              {link.name}
            </Link>
          </Text>
        ))}
      </React.Fragment>
    );
  };

  const socialMediaCard = (props: FooterSocialMedialProps) => {
    const { pathLogo, url } = props;
    return (
      <React.Fragment>
        {
          <Link
            colorLineAndSocialMedia={colorLineAndSocialMedia}
            colorText={colorText}
            colorBackground={colorBackground}
            href={url}
          >
            {pathLogo()}
          </Link>
        }
      </React.Fragment>
    );
  };
  return (
    <FooterBase
      colorLineAndSocialMedia={colorLineAndSocialMedia}
      colorText={colorText}
      colorBackground={colorBackground}
    >
      <FooterColumnContent1>
        <FooterLogo>
          <LinkLogo href={data.logo.url}>
            <Logo src={data.logo.pathLogo} alt={data.logo.alt} />
            <TitleLogo
              colorLineAndSocialMedia={colorLineAndSocialMedia}
              colorText={colorText}
              colorBackground={colorBackground}
            >
              {data.name}
            </TitleLogo>
          </LinkLogo>
        </FooterLogo>
        <FooterSocialMedia>
          {data.socialMedia.map((card, index) => (
            <SocialMediaCard
              key={index}
              colorLineAndSocialMedia={colorLineAndSocialMedia}
              colorText={colorText}
              colorBackground={colorBackground}
            >
              {socialMediaCard({ pathLogo: card.pathLogo, url: card.url })}
            </SocialMediaCard>
          ))}
        </FooterSocialMedia>
      </FooterColumnContent1>
      {data.boilerplateLinks.map((card, index) => (
        <React.Fragment key={index}>
          {card.class(footerLink({ title: card.title, link: card.links }))}
        </React.Fragment>
      ))}
    </FooterBase>
  );
};

export default Footer;
