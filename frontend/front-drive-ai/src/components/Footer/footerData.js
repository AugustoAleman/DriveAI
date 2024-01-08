
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import logo from './img/driveai_logo.png';
import {
    FooterColumnContent2,
    FooterColumnContent3,
    FooterColumnContent4,
    FooterColumnContent5
} from './styles';


export const footerData =
{
    "name": "DriveAI",
    "logo": {
        "pathLogo": logo,
        "alt": "Drive AI logo",
        "url": "/main-page"
    },
    "socialMedia": [
        {
            "pathLogo": () => <FacebookIcon />,
            "url": "https://www.facebook.com/DriveAI/",
            "alt": "facebook"
        },
        {
            "pathLogo": () => <InstagramIcon />,
            "url": "https://www.instagram.com/driveai/",
            "alt": "instagram"
        },
        {
            "pathLogo": () => <TwitterIcon />,
            "url": "https://twitter.com/DriveAI_",
            "alt": "twitter"
        }
    ],
    "boilerplateLinks": [
        {
            "class": (ReactNode) => <FooterColumnContent2>{ReactNode}</ FooterColumnContent2>,
            "title": "Producto",
            "links": [
                {
                    "name": "Testimonios",
                    "url": "/testimonials"
                },
                {
                    "name": "Precio",
                    "url": "/costs"
                },
                {
                    "name": "Empresas",
                    "url": "/business"
                },
                {
                    "name": "Aviso de privacidad",
                    "url": "/privacy-notice"
                }
            ]
        },
        {
            "class": (ReactNode) => <FooterColumnContent3>{ReactNode}</ FooterColumnContent3>,
            "title": "Drive AI",
            "links": [
                {
                    "name": "Acerca de Drive AI",
                    "url": "/about-us"
                }
            ]
        },
        {
            "class": (ReactNode) => <FooterColumnContent4>{ReactNode}</ FooterColumnContent4>,
            "title": "Unete",
            "links": [
                {
                    "name": "Registra tu grupo",
                    "url": "/register-your-group"
                }
            ]
        },
        {
            "class": (ReactNode) => <FooterColumnContent5>{ReactNode}</ FooterColumnContent5>,
            "title": "NDS Cognitive LABS",
            "links": [
                {
                    "name": "Página oficial",
                    "url": "/main-page"
                },
                {
                    "name": "Acerca de NDS",
                    "url": "/about-nds"
                }
            ]
        }
    ]
}
