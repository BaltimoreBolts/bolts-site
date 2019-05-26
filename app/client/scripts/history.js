fetch('/api/history')
    .then((res) => res.json())
    .then((history) => {
        const renderedHistoryHtml = history.map((history) => {
            return `
                <div class="history-entry">
                    <div class="history-year"><div class="history-year-number">${history.year}  -</div><img class="history-year-img" width="400" src="${history.game_picture}"/></div>
                    <div class="history-container">
                        <div class="history-container-robot">
                            <img src="${history.robot_picture}" width="760"/>
                            <div class="history-container-robot-name">${history.robot_name}</div>
                            <div class="history-container-awards">
                                ${history.awards.length ?  '<div class="history-achievement">Achievements</div>' : ''}
                                ${history.awards.map(a => `<div class="history-achievement">${a}</div>`).join('')}
                            </div>
                        </div>
                    </div>
                    <div class="${`history-container-${history.orientation}`}">
                        <img class="history-container-img" src="${history.team_picture}" width="760"/>
                        <div class="history-schools-container">
                            <div><div class="history-achievement-title">High Schools Represented in ${history.year}</div></div>
                            ${history.schools.map(s => `<div class="history-school">${s}</div>`).join('')}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        const teamHistoryEl = document.querySelector('#team-history');
        teamHistoryEl.innerHTML = renderedHistoryHtml;
    });