fetch('/api/sponsors')
    .then((res) => res.json())
    .then((sponsorData) => {

        const SPONSOR_LEVEL_ORDER = [
            {
                name: 'TITLE',
                display: 'Title Sponsor - $5,000 or more'
            },
            {
                name: 'PLAT',
                display: 'Platinum Sponsor - $2,500 to $4,999'
            },
            {
                name: 'GOLD',
                display: 'Gold Sponsor - $1,000 to $2,499'
            },
            {
                name: 'SILVER',
                display: 'Silver Sponsor - $500 to $999'
            },
            {
                name: 'BRONZE',
                display: 'Bronze Sponsor - $100 to $499'
            },
            {
                name: 'OTHER',
                display: 'Sponsor'
            }
        ];

        const buildClassList = (arr) => arr.filter(c => c).join(' ');

        const html = sponsorData.map((year) => {

            let accSpots = 0;
            const renderSponsor = (sponsor, i) => {
                const shouldInsertSponsorLevelClass = sponsor.level !== 'TITLE' || sponsor.info;
                const shouldFixWidth = !sponsor.info;
                const sponsorClasses = buildClassList([
                    'sponsor',
                    (shouldInsertSponsorLevelClass ? sponsor.level.toLowerCase() : null),
                    (shouldFixWidth ? 'fixed-width' : null),
                    (accSpots % 2 === 0 ? 'left' : null)
                ]);
                accSpots += sponsor.info ? 2 : 1;

                const levelText = SPONSOR_LEVEL_ORDER.find(l => l.name === sponsor.level).display;
    
                return `
                    <a ${sponsor.link ? `href="${sponsor.link}" ` : ''}"target="_blank" class="${sponsorClasses}">
                        <div class="sponsor-line level">${sponsor.level !== 'OTHER' ? levelText : `${year.year} ${levelText}`}</div>
                        <div class="${!sponsor.info ? 'sponsor-img-container' : ''}">
                            ${sponsor.logo_url
                                ? `<img class="${sponsor.info ? 'sponsor-info-img' : 'sponsor-img'}" src="${sponsor.logo_url}"/>`
                                : `<div class="sponsor-name">${sponsor.name}</div>`}
                            ${sponsor.info
                                ? `<div class="sponsor-info">${sponsor.info}</div>`
                                : '<!-- no sponsor info -->'}
                            ${sponsor.is_private
                                ? '<div class="sponsor-line type">Private Donor</div>'
                                : ''}
                        </div>
                    </a>
                `;
            };

            const sortedYearSponsors = year.sponsors;
            sortedYearSponsors.sort((a, b) => {
                const aIdx = SPONSOR_LEVEL_ORDER.findIndex(l => l.name === a.level);
                const bIdx = SPONSOR_LEVEL_ORDER.findIndex(l => l.name === b.level);
                return aIdx - bIdx;
            });
            
            const sponsorsForYear = sortedYearSponsors.map(renderSponsor);

            return `
                <div class="sponsors-year">
                    <div class="sponsors-year-label">${year.year}</div>
                    <div class="sponsors">
                        ${sponsorsForYear.join('')}
                    </div>
                </div>
            `;
        }).join('');
        document.querySelector('#sponsor-list').innerHTML = html;
    });
