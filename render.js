function renderBox(official) {
    return `<div class="box-wrapper">
                <div class="box">
                    <div class="avatar">
                        ${renderAvatar(official)}
                    </div>
                    <div class="box-inner">
                        <h3 class="rep-name">${official.name}</h3>
                        <h4 class="rep-office">${official.positionHeld}</h4>
                        <h5 class="rep-party">${renderPartyName(official)}</h5>
                        <div class="rep-moreinfo"><a id="${official.name}" class="expand">+</a></div>
                    </div>
                </div>
            </div>`
}

function renderModal(official){
    return `<div class="modal">
                <div class="modal-content">
                    <span class="closeBtn">&times;</span>
                    <div class="modal-image">
                        ${renderAvatar(official)}
                    </div>
                    <p class="modal-name">${official.name}</p>
                    <p class="modal-position">${official.positionHeld}</p>
                    <p class="modal-party">${renderPartyName(official)}</p>
                    <p class="modal-contact"></p>
                    <div class="modal-links"></div>
                    <div class="modal-latest-news</div>
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