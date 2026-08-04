export default function AboutInfo(updatedStats) {
    const experienceYears = updatedStats?.experienceYears ?? 0;

    return `
<h2 align="center">
    Hi 👋! I'm Libardo Lozano
</h2>
<h3 align="center">
    Senior Backend Developer → Tech Lead
</h3>
<p align="center">
    <img src="https://img.shields.io/badge/Experience-${experienceYears}%2B%20Years-0EA5E9?style=for-the-badge&labelColor=0F172A" alt="Experience" />
    <img src="https://img.shields.io/badge/Domain-Banking%20Platforms%20(BBVA)-2563EB?style=for-the-badge&labelColor=0F172A" alt="Domain" />
    <img src="https://img.shields.io/badge/Focus-Tech%20Lead%20Path-7C3AED?style=for-the-badge&labelColor=0F172A" alt="Focus" />
    <a href="README_ES.md">
        <img src="https://img.shields.io/badge/%F0%9F%87%AA%F0%9F%87%B8%20Read%20in%20Spanish-22C55E?style=for-the-badge&labelColor=0F172A" alt="Read in Spanish" />
    </a>
</p>
<div align="center">
    <img
        src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=19&pause=1200&duration=2600&color=057EEF&center=true&vCenter=true&width=760&repeat=false&lines=Scalable+and+resilient+backend+architecture;Java+%7C+Spring+Boot+%7C+Microservices+%7C+Cloud"
        alt="Typing introduction"
    />
</div>
<table align="center" width="100%">
    <tr>
        <td width="55%" valign="top" align="left">
            <p>
                Senior Backend Developer with ${experienceYears}+ years of experience building,
                evolving and supporting mission-critical enterprise platforms, including 4+ years
                in banking (CGI - BBVA Colombia). Specialized in Java and the Spring ecosystem,
                with a strong focus on distributed architectures, microservices, event-driven
                systems, and clean/hexagonal design.
            </p>
            <ul>
                <li>Core stack: Java, Spring Boot, Spring Security, Spring Modulith.</li>
                <li>Architecture focus: microservices, event-driven systems, and low-coupling design.</li>
                <li>Domain experience: BBVA stack (APX, ASO, CELLS), ISO 20022 / CAMT.053, Bre-B, Redeban, and enterprise modernization.</li>
                <li>Current path: growing into Tech Lead / Software Architect responsibilities.</li>
            </ul>
        </td>
        <td width="45%" align="center" valign="middle">
            <img
                src="https://raw.githubusercontent.com/Bardolog1/Bardolog1/main/images/libardo-perfil.jpeg"
                width="300"
                style="border-radius: 50%; object-fit: cover;"
                alt="Libardo Lozano profile photo"
            />
        </td>
    </tr>
</table>

<div align="center">
    <img
        width="100%"
        src="https://capsule-render.vercel.app/api?type=waving&color=FF2967&height=120&section=footer"
    />
</div>
    
    `;
    
}
