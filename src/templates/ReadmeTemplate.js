import AboutInfo from "./AboutInfo";
import BannerHeader from "./BannerHeader";
import Contact from "./Contact";
import ContributionsSchema from "./ContributionsSchema";
import Footer from "./Footer";
import PrincipalStack from "./PrincipalStack";
import TemporalStats from "./TemporalStats";


let templateReadme =``;

export default function ReadmeTemplate(updatedStats) {
    
    templateReadme.concat(
        BannerHeader(),
        AboutInfo(),
        ContributionsSchema(),
        PrincipalStack(),
        Contact(),
        TemporalStats(updatedStats),
        Footer()
    );
    
    
    return templateReadme;
}