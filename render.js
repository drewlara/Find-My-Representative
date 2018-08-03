function renderBox(official) {
    return `<div class="box-wrapper">
                <div class="box">
                    <div class="avatar">
                        ${renderAvatar(official)}
                    </div>
                    <div class="box-inner">
                        <h3 class="rep-name">${official.name}</h3>
                        <h4 class="rep-party">${renderPartyName(official)}</h4>
                        <h4 class="rep-office">${official.positionHeld}</h4>
                        <div class="rep-moreinfo"><a class="expand">+</a></div>
                    </div>
                </div>
            </div>`
}

function renderPartyName(official) {
    if (official.party == 'Republican') {
        return `Republican`;
    } else if (official.party == 'Democratic' || official.party == 'Democrat') {
        return `Democrat`;
    } else if (official.party == 'Independent') {
        return `Independent`;
    } else {
        return `No Party`;
    }
}

function renderAvatar(official) {
    if (official.photoUrl) {
        return `<img src="${official.photoUrl}" alt="representative-photo" class="rep-image">`
    } else {
        let names = official.name.split(' ');
        let initials = '';
        names.forEach((name) => initials += name.substring(0, 1).toUpperCase())
        return `<div class="rep-initials"><p>${initials}</p></div>`
    }
}