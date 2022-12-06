const theOriginalData = JSON.parse(
  document.querySelector("#noticeData").innerHTML
);

const updateNotices = () => {
  let theNotices = document.querySelector("#noticeData").innerHTML;
  let noticesRender = document.querySelector("#noticesRender");
  let childrenCountToDelete = noticesRender.children.length - 1;
  for (let i = 0; i < childrenCountToDelete; i++) {
    noticesRender.removeChild(noticesRender.lastChild);
  }

  theNotices = JSON.parse(theNotices);

  theNotices.forEach((notice) => {
    notice.startDate = notice.startDate.substring(0, 10);
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    td.innerHTML = `<p class="cardgrid-item notice-title">${notice.title}</p>`;
    tr.appendChild(td);
    td = document.createElement("td");
    td.innerHTML = `<p class="cardgrid-item notice-subtitle">${notice.subTitle}</p>`;
    tr.appendChild(td);
    td = document.createElement("td");
    td.innerHTML = `<p class="cardgrid-item notice-date">${notice.startDate}</p>`;
    tr.appendChild(td);
    td = document.createElement("td");
    td.innerHTML = `<p class="cardgrid-item notice-id">${notice.notice_id}</p>`;
    tr.appendChild(td);
    td = document.createElement("td");
    td.innerHTML = ` <p class="cardgrid-item notice-description">${notice.description}</p>`;
    tr.appendChild(td);
    td = document.createElement("td");
    td.innerHTML = `<a href="${notice.download}">
                            <img class="cardgrid-item notice-download" src="https://cdn.discordapp.com/attachments/856199547817820162/1024034710021734420/unknown.png" alt="Download">
                        </a>`;
    tr.appendChild(td);
    td = document.createElement("td");
    td.classList.add("notice-noticeDeleteLink");
    td.innerHTML = `<form action="/admin-dashboard/delete" method="post">
                            <input type="text" name="notice_id" hidden value="${notice.notice_id}">
                            <button class="cardgrid-item notice-noticeDeleteLink"  alt="Delete">
                            <img src="/resources/delete.png" alt="Delete">
                            </button>
                    </form>`;
    tr.appendChild(td);
    document.querySelector("#noticesRender").appendChild(tr);
  });
};

updateNotices();

document.querySelector("#searchForm").addEventListener("submit", {
  handleEvent: function (e) {
    e.preventDefault();
    document.querySelector("#noticeData").innerHTML =
      JSON.stringify(theOriginalData);
    let theQueryString = document.getElementById("theSearchQuery").value;
    if (theQueryString.length != 0) {
      // theOriginalData
      const theResp = JSON.parse(
        document.querySelector("#noticeData").innerHTML
      ).filter((ele, ind) => {
        return ele.title.toLowerCase().includes(theQueryString.toLowerCase());
      });
      document.querySelector("#noticeData").innerHTML = JSON.stringify([
        ...theResp,
      ]);
    }
    updateNotices();
  },
});
