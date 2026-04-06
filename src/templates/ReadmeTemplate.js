import AboutInfo from "./AboutInfo.js";
import BannerHeader from "./BannerHeader.js";
import Contact from "./Contact.js";
import ContributionsSchema from "./ContributionsSchema.js";
import Footer from "./Footer.js";
import LiveStatsDashboard from "./LiveStatsDashboard.js";
import PrincipalStack from "./PrincipalStack.js";
import TemporalStats from "./TemporalStats.js";

export default function ReadmeTemplate(updatedStats) {
    return [
        BannerHeader(),
        AboutInfo(),
        ContributionsSchema(),
        LiveStatsDashboard(),
        PrincipalStack(),
        Contact(),
        TemporalStats(updatedStats),
        Footer()
    ].join("\n");
}