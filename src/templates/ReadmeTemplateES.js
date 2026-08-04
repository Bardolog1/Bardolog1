import AboutInfoES from "./AboutInfoES.js";
import BannerHeader from "./BannerHeader.js";
import CertificationsES from "./CertificationsES.js";
import ContactES from "./ContactES.js";
import ContributionsSchema from "./ContributionsSchema.js";
import Footer from "./Footer.js";
import LiveStatsDashboardES from "./LiveStatsDashboardES.js";
import PrincipalStackES from "./PrincipalStackES.js";
import TemporalStatsES from "./TemporalStatsES.js";

export default function ReadmeTemplateES(updatedStats) {
    return [
        BannerHeader(),
        AboutInfoES(updatedStats),
        ContributionsSchema(),
        LiveStatsDashboardES(),
        PrincipalStackES(),
        CertificationsES(),
        ContactES(),
        TemporalStatsES(updatedStats),
        Footer()
    ].join("\n");
}
