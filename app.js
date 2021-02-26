const getData = (url, cb) => {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                cb(undefined, JSON.parse(xhr.responseText));
            } else {
                cb(new Error(xhr.statusText));
            }
        }
    };

    xhr.open("GET", url, true);
    xhr.send();
};
const getDataPromise = (url) => {
    return new Promise((resolve, reject) => {
        getData(url, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        })
    })
}
const getInfoUrl = "https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&limit=10&format=json&search=";
const getDetailsUrl = "https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=pageprops|pageimages&format=json&titles=";
const myUL = document.querySelector('.myUL');
const myInput = document.querySelector('input');


// let result = getDataPromise(getInfoUrl + 'lion');
// result.then((data) => {
//     console.log(data[1]);
//     let detail = data[1];
//     detail.forEach((item) => {
//         //console.log(item);
//         let resultDetail = getDataPromise(getDetailsUrl + item);
//         resultDetail.then((dt) => {
//             //console.log(dt.query.pages);
//             let query = dt.query.pages;
//             let key = Object.keys(query);
//             console.log(query[key]);
//             let x = query[key];
//             //console.log(x.pageprops['wikibase-shortdesc']);
//             let template = `<li>
//             <p>${item}</p>
//                 <p>${x.pageprops['wikibase-shortdesc']}</p>
//             </li>`;
//             myUL.innerHTML += template;
//         })
//     })
// })

myInput.addEventListener('input', () => {
    let value = myInput.value;
    let result = getDataPromise(getInfoUrl + value);
    if (value === '') {
        myUL.innerHTML = '';
    }
    result.then((data) => {
        console.log(data[1]);
        let detail = data[1];
        detail.forEach((item) => {
            //console.log(item);
            let resultDetail = getDataPromise(getDetailsUrl + item);
            resultDetail.then((dt) => {
                //console.log(dt.query.pages);
                let query = dt.query.pages;
                let key = Object.keys(query);
                console.log(query[key]);
                let x = query[key];
                //console.log(x.pageprops['wikibase-shortdesc']);
                let template = `<li>
                <p>${item}</p>
                    <p>${x.pageprops['wikibase-shortdesc']}</p>
                </li>`;
                myUL.innerHTML += template;
            })
        })
    })
    myUL.innerHTML = '';
})

// let result1 = getDataPromise(getDetailsUrl + 'Lionel Messi')
// result1.then((dt) => {
//     console.log(dt);
// })