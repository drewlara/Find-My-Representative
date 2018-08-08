function renderBox(official) {
    return `<div class="box-wrapper">
                <div class="box">
                    <div class="avatar ${renderPartyClass(official)}">
                        ${renderAvatar(official)}
                    </div>
                    <div class="box-inner">
                        <h3 class="rep-name">${official.name}</h3>
                        <h4 class="rep-office">${official.positionHeld}</h4>
                        <h5 class="rep-party">${renderPartyName(official)}</h5>
                        <div class="rep-moreinfo"><a href="${official.name}-modal" id="${official.name}" class="expand">+</a></div>
                    </div>
                </div>
            </div>`;
}

function renderModal(official) {
    return `<div class="modal">
                <div class="modal-content">
                    <span class="closeBtn">&times;</span>
                    <div class="modal-header">
                        <div class="modal-image">
                            ${renderAvatar(official)}
                        </div>
                        <div class="modal-info">
                            <p class="modal-name">${official.name}</p>
                            <p class="modal-position">${official.positionHeld}</p>
                            <p class="modal-party">${renderPartyName(official)}</p>
                        </div>
                    </div>
                    <div class="modal-main">
                        <div class="modal-links">
                            ${renderModalLinks(official)}
                            ${renderModalContacts(official)}
                        </div>
                        <div class="modal-news-container">
                            <p>News Articles</p><hr><ul class="modal-news"></ul>
                        </div>
                    </div>
                </div>
            </div>`;
}

function renderModalNews(article) {
    return `<li class="article"><img src="${article.urlToImage}" alt="news-story-image"><a href="${article.url}" target="_blank">
            ${article.title}</a></li>`;
}

function renderModalLinks(official) {
    let links = ``;

    if (official.urls) {
        links += `<a href="${official.urls}" target="_blank"><img src="assets/website-icon.png" alt="website-icon">Website</a>`;
    }

    if (official.channels) {
        official.channels.forEach(function (link) {
            if (link.type == "Facebook") {
                links += `<a href="https://facebook.com/${link.id}" target="_blank"><img src="assets/facebook-icon.png" alt="facebook-icon">Facebook</a>`;
            } else if (link.type == "Twitter") {
                links += `<a href="https://twitter.com/${link.id}" target="_blank"><img src="assets/twitter-icon.png" alt="twitter-icon">Twitter</a>`;
            }
        });
    }
    return links;
}

function renderModalContacts(official) {
    let contactInfo = ``;
    if (official.emails) {
        contactInfo += `<a href="mailto:${official.emails}"><img src="assets/email-icon.png" alt="email-icon">Email</a>`
    } else if (official.phones) {
        contactInfo += `<a href="tel:${official.phones}"><img src="assets/phone-icon.png" alt="phone-icon">Phone</a>`
    }
    return contactInfo;
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

function renderPartyClass(official) {
    if (official.party === 'Republican') {
        return `avatar-repub`;
    } else if (official.party === 'Democratic') {
        return `avatar-demo`;
    } else if (official.party === 'Independent') {
        return `avatar-ind`;
    } else {
        return `avatar-unk`;
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

function renderRepDisplayTitle(data) {
    return `Viewing Representative Information for: ${data.normalizedInput.city} ${data.normalizedInput.state} ${data.normalizedInput.zip}`;
}
