// 表单提交逻辑 (AJAX)
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const loadingIcon = document.getElementById('loadingIcon');
const btnText = submitBtn.querySelector('span');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    // 1. UI 进入加载状态
    submitBtn.disabled = true;
    submitBtn.classList.add('opacity-75', 'cursor-not-allowed');
    loadingIcon.classList.remove('hidden');
    btnText.textContent = '提交中...';

    // 2. 收集数据
    const formData = new FormData(form);

    // 3. 发送请求
    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                // 成功
                alert('预约提交成功！稍后课程顾问将联系您。');
                form.reset();
            } else {
                // 失败
                alert('提交失败，请稍后重试或直接拨打咨询专线。');
            }
        })
        .catch(error => {
            alert('网络错误，请检查您的网络连接。');
            console.error('Error:', error);
        })
        .finally(() => {
            // 4. 恢复 UI 状态
            submitBtn.disabled = false;
            submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
            loadingIcon.classList.add('hidden');
            btnText.textContent = '立即锁定测评名额';
        });
});
