export default function AboutInfoES(updatedStats) {
    const experienceYears = updatedStats?.experienceYears ?? 0;

    return `
<h2 align="center">
    Hola 👋! Soy Libardo Lozano
</h2>
<h3 align="center">
    Desarrollador Backend Senior → camino a Tech Lead
</h3>
<p align="center">
    <img src="https://img.shields.io/badge/Experiencia-${experienceYears}%2B%20Años-0EA5E9?style=for-the-badge&labelColor=0F172A" alt="Experiencia" />
    <img src="https://img.shields.io/badge/Dominio-Plataformas%20Bancarias%20(BBVA)-2563EB?style=for-the-badge&labelColor=0F172A" alt="Dominio" />
    <img src="https://img.shields.io/badge/Enfoque-Camino%20a%20Tech%20Lead-7C3AED?style=for-the-badge&labelColor=0F172A" alt="Enfoque" />
    <a href="README.md">
        <img src="https://img.shields.io/badge/%F0%9F%87%AC%F0%9F%87%A7%20Read%20in%20English-057EEF?style=for-the-badge&labelColor=0F172A" alt="Read in English" />
    </a>
</p>
<div align="center">
    <img
        src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=19&pause=1200&duration=2600&color=057EEF&center=true&vCenter=true&width=760&repeat=false&lines=Arquitectura+backend+escalable+y+resiliente;Java+%7C+Spring+Boot+%7C+Microservicios+%7C+Cloud"
        alt="Introducción"
    />
</div>
<table align="center" width="100%">
    <tr>
        <td width="55%" valign="top" align="left">
            <p>
                Desarrollador Backend Senior con ${experienceYears}+ años de experiencia construyendo,
                evolucionando y dando soporte a plataformas empresariales de misión crítica, incluyendo 4+ años
                en el sector financiero (CGI - BBVA Colombia). Especializado en Java y el ecosistema Spring,
                con base sólida en arquitecturas distribuidas, microservicios, sistemas orientados a eventos
                y diseño limpio/hexagonal.
            </p>
            <ul>
                <li>Stack principal: Java, Spring Boot, Spring Security, Spring Modulith.</li>
                <li>Arquitectura: microservicios, sistemas orientados a eventos y diseño de bajo acoplamiento.</li>
                <li>Dominio: stack BBVA (APX, ASO, CELLS), ISO 20022 / CAMT.053, Bre-B, Redeban y modernización empresarial.</li>
                <li>Camino actual: creciendo hacia responsabilidades de Tech Lead / Arquitecto de Software.</li>
            </ul>
        </td>
        <td width="45%" align="center" valign="middle">
            <img
                src="https://raw.githubusercontent.com/Bardolog1/Bardolog1/main/images/libardo-perfil.jpeg"
                width="300"
                style="border-radius: 50%; object-fit: cover;"
                alt="Foto de perfil de Libardo Lozano"
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
