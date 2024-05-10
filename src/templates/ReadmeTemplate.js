import AboutInfo from "./AboutInfo.js";
import BannerHeader from "./BannerHeader.js";
import Contact from "./Contact.js";
import ContributionsSchema from "./ContributionsSchema.js";
import Footer from "./Footer.js";
import PrincipalStack from "./PrincipalStack.js";
import TemporalStats from "./TemporalStats.js";


let templateReadme =``;

export default function ReadmeTemplate(updatedStats) {
    
    return templateReadme.concat(
        BannerHeader(),
        AboutInfo(),
        ContributionsSchema(),
        PrincipalStack(),
        Contact(),
        TemporalStats(updatedStats),
        Footer()
    );
    
    
   
}