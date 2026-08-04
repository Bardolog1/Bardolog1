import AboutInfo from "./AboutInfo.js";
import BannerHeader from "./BannerHeader.js";
import Certifications from "./Certifications.js";
import Contact from "./Contact.js";
import ContributionsSchema from "./ContributionsSchema.js";
import Footer from "./Footer.js";
import PrincipalStack from "./PrincipalStack.js";
import Repositories from "./Repositories.js";
import TemporalStats from "./TemporalStats.js";

export default function ReadmeTemplate(updatedStats) {
    return [
        BannerHeader(),
        AboutInfo(updatedStats),
        ContributionsSchema(),
        PrincipalStack(),
        Repositories(updatedStats),
        Certifications(),
        Contact(),
        TemporalStats(updatedStats),
        Footer()
    ].join("\n");
}