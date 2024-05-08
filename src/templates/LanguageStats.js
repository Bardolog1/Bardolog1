

export default function LanguageStats(langsStats) {
    return `
    ${langsStats?.map((lang) => {
       
        return `
        <div align="center">
            <img
                src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/${lang}/${lang}.png"
                alt="Language ${lang}"
                width="100%"
            />
        </div>
        `;
    })}
    
    `;
}