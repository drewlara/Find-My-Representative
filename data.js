/* Storing API Key's and Endpoint URL's*/
const CIVIC_API_KEY = 'AIzaSyBxaoaf_4p7w-iT6ZoiP4DW8HEMJeip3-U';
const CIVIC_API_URL = 'https://www.googleapis.com/civicinfo/v2/representatives';
const NEWS_API_KEY = 'a6acc6c620464ed1b88325d225039d01';
const NEWS_API_URL = 'https://newsapi.org/v2/everything';

function cleanCivicData(data) {
    //seperating each object filled array
    let officials = data.officials;
    let offices = data.offices;

    //adding position names and location to the officials array
    officials.forEach(function(official, index) {
        for (let i = 0; i < offices.length; i++) {
            if (offices[i].officialIndices.includes(index)) {
                official.positionHeld = offices[i].name;
                official.locID = `${data.normalizedInput.city} ${data.normalizedInput.state}`
            }
        }
    });

    displaySearchAddress(data);
    displayBox(officials);
    displayModals(officials);

}

function buildNewsQuery(official) {
    let query = '';

    if(official.positionHeld == 'President of the United States' || official.positionHeld == 'Vice-President of the United States' || official.positionHeld == "United States Senate") {
        query += official.name;
    }
    else {
        query += `"${official.name}" OR ${official.locID}`
    }

    return query;
}


function getDataFromNewsApi(officialQuery, callback) {
    console.log(buildNewsQuery(officialQuery));
    const query = {
    apiKey: NEWS_API_KEY,
    q: buildNewsQuery(officialQuery),
    sortBy: 'relevancy',
    sources: 'cbs-news, abc-news, nbc-news, cnn, fox-news, msnbc, the-new-york-times, the-washington-post, usa-today, the-hill, the-wall-street-journal, politico, reuters, axios',
    pageSize: 5
  }
    $.getJSON(NEWS_API_URL, query, callback)
        .fail(displayNewsErr);
}

function getDataFromCivicApi(searchTerm, callback) {
    const query = {
        key: CIVIC_API_KEY,
        address: searchTerm
    }
    $.getJSON(CIVIC_API_URL, query, callback)
        .fail(displayCivicErr);
}


function watchSubmit() {
    $('.search-form').submit(function (event) {
        event.preventDefault();
        const queryTarget = $(event.currentTarget).find('.search-input');
        const query = queryTarget.val();
        queryTarget.val("");
        getDataFromCivicApi(query, cleanCivicData);
    });

}

$(watchSubmit);