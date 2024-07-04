// 輸出學院


    const collegeJsonFile = 'config/college.json';

    // 使用 fetch API 讀取 JSON 檔案
    fetch(collegeJsonFile)
      .then(response => response.json())
      .then(data => {
        const colleges = data.colleges;

        // 找到 select 標籤並加入預設內容
        const selectElement = document.getElementById('listCollege');
        selectElement.innerHTML = '';
		const option_d = document.createElement('option');
        option_d.value = "";
        option_d.textContent = "全部";
		selectElement.appendChild(option_d);

        // 逐一添加 option 元素
        colleges.forEach(college => {
          const option = document.createElement('option');
          option.value = college.code;  // 將代碼設為 value
          option.textContent = college.name;  // 將學院名稱設為 text
          selectElement.appendChild(option);
        });
      })
      .catch(error => {
        console.error('Error fetching JSON: ', error);
      });