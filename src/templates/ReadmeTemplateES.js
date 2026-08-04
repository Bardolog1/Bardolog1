import AboutInfoES from "./AboutInfoES.js";
import BannerHeader from "./BannerHeader.js";
import CertificationsES from "./CertificationsES.js";
import ContactES from "./ContactES.js";
import ContributionsSchema from "./ContributionsSchema.js";
import Footer from "./Footer.js";
import PrincipalStackES from "./PrincipalStackES.js";
import RepositoriesES from "./RepositoriesES.js";
import TemporalStatsES from "./TemporalStatsES.js";

export default function ReadmeTemplateES(updatedStats) {
    return [
        BannerHeader(),
        AboutInfoES(updatedStats),
        ContributionsSchema(),
        PrincipalStackES(),
        RepositoriesES(updatedStats),
        CertificationsES(),
        ContactES(),
        TemporalStatsES(updatedStats),
        Footer()
    ].join("\n");
}
