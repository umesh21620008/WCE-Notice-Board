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
                            <img class="cardgrid-item notice-download" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAe1BMVEUty3D///8kymwIyGTs+fBz2JgYyWi56sozzHPp+O7e9eUgyWr4/frz/Pfw+/Xl+Ow7znnQ8t1x3J7F79Rk15J626DU9eJT04eW5Lar58GG3qkwzHOh571U1YxV1IlK04Wo6cN/36iM3quy6cdg1Y++7dBB0H/J8NmZ47bGRBwUAAAK+UlEQVR4nN2da3eqOhCGQ9RoCWhAVAQvaIv1///CEy9VQS4JziTs837r6uoOzw5kJslciIMrz/N8d57FySLa7YWYEEImQux3UZjEWe768vfIT0DQ/mV/OHPzONwKNmCcU0rJq+TPnMvfiG0Y5+5s6KM9Bw7h1A3Gx+jEGC+BvUuSMnaK4nHgTlGeBZ7Qc+fr5CeVcC1sBU7O0p9kPXfh31lowmWWRKL8SipSUiqiJFsCPxEoobsZrVKtuXufy3Q12oBCwhH6WXRKP6F7UKYiyuBWHijCIFRYVdQhOQsDoCeDIPRm2Z5xKLq7ONtnM4h153PCaRALBjZ7L6JMxMHnFuRTwuE8EQwB7yYmkvnQKuF0vBDQr2dRXCzGn83jR4TjkcB4PYuiYjS2RBhEAh3vJhF9sLB2JhyGuK9nQZSHnT/HjoTTTWoQUIqnm46fYydCP9+a5bsybvNOjk4XwuURxDvTFU2PXRxWfULve2d+Am/iu2/9adQmXB6sTOBNND1oT6Mu4Xhlj+/KuNI1jnqE/tEq3k2J3puqRbjc47mg6mJ7rTdVg9DL4TaAH4nSXGNbpU44PPeD7yJ6VndxlAndhW2sghYuNGEQ2WYqSdkZVySc720TvWk/hyTMJ7Z5KjRRs4xKhJuBbZpKDTZAhN65D1awSuysYDXaCaexbZB60bh909hKOI1T2xwNStsR2wincR8XmacmrYgthF6vZ/CiSdzyLbYQbnriitaL0pYVtZlw09dV9FWsGbGRcNxPO1jW4Lsr4bzv3+CfJk0OXANh0D9ftE77Bje8ntDt226iSVH9ZqqWcHiAGp0P6gV2Lnmo3RLXEXobqLH5evhVp+EaDHFTZxbrCHMwO8iaNjljMHNE61abGkIXamBjhITUfIrVhP4ezpUxRUj31eeo1YRHwP9aY3PIjuqEY7hhDRISUjlSFeFyBTmsQcJV1WF4BaF/AN1PGCSkh4pPsYLwG9YdNUhI0gof/J1wCXx/ZpKQVjiob4T+EfiG1yQh4ce39/SNMIcd0jAhIXkb4XQLfWxhlpBuyydTZcINeBSC4Tnk5TONEuEQfltvmJCkpX1UiXABH0himpAvmggDhEgZ04SEFy1GkTBCOB01TkijesIxRjilcUIiCiO+Ek5HGAfc5gnp6NVivBKiTKEFwuIkvhAOFyh3FBYI6eLFYrwQznGCmi0QEvFyLPUknCY4QZU2CHny/BKfhAHSVagNQjJ52sQHoRcjDWaFkD3vTR+EM6zUAiuERMzeCDOssewQsuyNEPAMuDSWFUK6LxMGaPfZdggJ+1tr/gjxMmAsEfKwSOgjZtjZISTMLxBmeCkUtgh5ViDE2BjeZYvwb5t4I1wi5tlZIzy5L4QbxLgSW4Qk3bwQomx977JGSEdPQtjrtJKsEd4v266Ea8wIS3uEk/WD8IgZgGiPkB7/CF1EW2GVMJrdCecnxGEsEpLT/E64Ro2StUhI1zfCafK/Jbwc10hC9+d/S/jjXgkD3EBZi4QkDa6EyKPYJLyMTRw/xk0+t0l4CVwgzhDVGtolpNFQEs5QraFdQnKaSUIXeRCrhMyVhPn/mjCXhGALzaRavJGQ1/wV0DPx2CFeCLTQCMW8XCVB3fTR0CMeVKAe3f+CAf5CncDTlSQE82iuPhKIAP3I1CNTwFjy8AsE8CsEeyTCpsQFzE+rjNHVFmiM8sAloMaCxgCEMaSPxXICe57PGlMBlfQNaiJ5RoD97sGnRTmBr/l4TGAD86VZ/GxBdYHvF+iBQBn8h35m7Ry1mv0APw0NCfwRxqK7zfgCL4JDf8gO+t8kJO5qM3yEAhU7gpDsm647Eq4RToz2BGX/280Jn2M8yomg3I3SLgUOlyinKYKgXDvRVH+1+cKpVoh1rXY5AtIT9oEYuOhBr6DqFNrzwFeqUuHoIe+Md/CO9p4KHSf8G62o9ARnLb1KqJ9q/CI+BY49vIqeVG3G8oT3EZ4wfJo/0Z2aEz7DrPq6x/BLH+Khiofqo1YG3yHsLV7EjgoLKmR5gzfJvQX4/rA4QNYKmOE+QAi+xy9JNJ3pX4STivSQ3OMj34+SlpPwX+RSTTwGPmt7F9022YwleGJ1STyDPS+tHGNUbzNmI+zy7iwHPfOuGaS2APc0Qa94N3Ah7y3qxM81hGf8Av1sCnj3VC9afXCDG212Uwp4f9ikyqJ4cwN1Q6/3h7gm/z5QRaH4JVoe0uvAoQd4j9840ttJ+Aw3mu6uyz0+eizGfahF8eBmiFC9oULXWAzXTMcRWqgc46MGXj91jafBjol6KHvuM+BqFrboGhNl7BjvxQlHdrcfusW1YccmPoc7/Tnhv4inFgXx+BKbaGipIRfE22ozNAV4WWiuMcKm2qdJm3H5FD0jduKqSWAizvtV0gA7RlyM+3D3OG+sYgqVik2W6ef3WH0jHvCfhLGWguSZb4GcM1Me1eBYj5yZ2b92saWoZ94Tbu6aPT1z13DzD+3pJf8QNYfUnl5ySFHzgK3pNQ8YNZfbmgq53Jj5+LZUzMfHrKlgS8WaCh3qYrCGfgAY0t4AlepiaNc2YcHQrLQja0u1TbTr0wygMg9UpXv7UK5Pox183HvCtxpDunWi+k74XidKt9ZX3wkran1p1mvrO2FFvTbNmns9J6yquadZN7HnhFV1EzWPa/pNWF37Ui+rsd+E1fVL9WrQ9pqwrgat1m1Crwnr6ghr1YLuM2F9LWidSewzYX09b51tYo8Jm2qyO7/KBqPHhI119dV7I/SXsLk3gnp/i/4StvS3UO5R0lvCth4lyn1m+krY3mdGtVfQ4JNc2C6aqRGmrb2CVPs90WhkVmqGjL9Her737ArUzjOoaSk9lErPLvC+ayal1ncNuneeSSn2zvt3L9tU+x/K99T2o3ZUZT5gdR9S/AhzBOn0IQXtJWtKer1kIfsBG5NWP2DIns6GRN+cmRZCYzGuUNLuyw3YW92I9HurY1eIhhWN6rc69YTSQbX94MqqcEdVCI0ktYCoMiVHhdD5Rs9rA9GgsbZBI6Gz+Rd8G1Y+t9AhdM79X21oXe6fGqEX932zmMYtCfEthM407vdyM4nbqsS0EUrEPs9i2grYTigR+/st0nZABULHO/d1RWUqVX4UCKXR6KddHDSbCR1CZ9zH5WbSVpBCh9CZ985HpXvFsneKhE4Q2UYqKVItlKpK6LjgZSk/0kL5ZkiZ0Bn2yIOjZ/WCd+qEjperXR6gi9JcoxacBuGlSEAfLCOrKF8ARej4iW08qUSvXqEeobSMJspoNIiu1Kxgd0JnecCpwqnGlx60K6NqEzr+985gVm1BfPetX6JYn1BO49HKNNL02KW0bRdCx8+35qeRb/NONaY7EcpN4yY1y8jTjd4S+inhpQkFN/eqUt69dUZnwoszjlZWtcQnlN1sWEJpHEcGGKkY6ZpAOEJnOl4I3O+Ri8W44wcIQih3HPNkgthbe5LMdctmQxPKeQxiwTBeVspEHHw2fzCEcls1y/YM+mXlbJ/NdApm1wmC8KIgZBxu+0g5Cz9t5/InKELp6GTRCcSbo6mINhBtlW6CI5RyN6NV+pEjQHm6Gm26uJ+1AiWUWmaJdAQ6Ucq/ElGSgeI58IRy3XHn6+RHMC1K+eFNfpL13IVYW4qCJ7xo6gb5MTpxhdWHSjh+io554H5uGaqEQ3iRP5y5eRxuBRswzstBvvJnzuVvxDaMc3c2hFtZysIjvMnzPN/NszgJo91eXPKqJkKc9rsoTOIsd335e+Qn+A+FdLKrGrVDHAAAAABJRU5ErkJggg==" alt="Download">
                        </a>`;
    tr.appendChild(td);
    td = document.createElement("td");
    td.classList.add("notice-noticeDeleteLink");
    td.innerHTML = `<form action="/admin-dashboard/delete" method="post">
                            <input type="text" name="notice_id" hidden value="${notice.noticeDeleteLink}">
                            <button class="cardgrid-item notice-noticeDeleteLink"  alt="Delete">Delete</button>
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
