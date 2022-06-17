const fileSelector = document.getElementById('xlsx');
const fileContainer = document.getElementById("file_container");

let list = [];

let file = null;

// upload file
fileSelector && fileSelector.addEventListener('change', (e) => {
  file = e.target.files[0];
  fileContainer.textContent = file.name;
});
// read file excel
function handleFileInput () {
  return new Promise((resolve, reject) => {
    file && readXlsxFile(file).then(data => {
      list.push(...data);
      list = list.slice(4, list.length)
      resolve(true);
      
    }).catch(err => {
      console.log({err});
      reject(false);
    });
  })
}

// show table
const studentHeader = [
  "STT",
  "Trường Tiểu học",
  "Quận/Huyện",
  "Mã học sinh",
  "Lớp",
  "Họ và tên",
  "Ngày sinh",
  "Giới",
  "Nơi sinh",
  "Dân tộc",
  "Hộ khẩu thường trú",
  "Điện thoại liên hệ",
  "Tổng điểm năm lớp 1",
  "Tổng điểm năm lớp 2",
  "Tổng điểm năm lớp 3",
  "Tổng điểm năm lớp 4",
  "Tổng điểm năm lớp 5",
  "Tổng điểm kết quả 5 năm",
  "Điểm ưu tiên",
  "Tổng điểm sơ tuyển",
  "Ghi chú",
];

const cols = document.querySelector("#header-student");

cols && studentHeader.forEach(header => {
  const h = document.createElement("th");
  h.textContent = header;
  cols.appendChild(h);
}) 

// show information
const importBtn = document.querySelector("#import")
importBtn && importBtn.addEventListener("click", (e) => {
  handleFileInput().then((done) => {
    done && console.log({list});
      const tr = document.querySelector("#student-container");
      const record = document.createElement("div");
      Array.isArray(list) && list.forEach(value => {
        console.log({value});
        const va = document.createElement("span");
        va.textContent=value;
        record.appendChild(va);
      });
      tr.appendChild(record);
  }).catch(err => console.log(err));
})