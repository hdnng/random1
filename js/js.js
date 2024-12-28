document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.querySelector('.start-button');
    const startScreen = document.querySelector('.start-screen');
    const mysteryBox = document.querySelector('.mystery-box');
    const boxes = document.querySelectorAll('.box');

    // Gán trọng số theo phần trăm cho từng sản phẩm
    const percentages = {
        'box1': 21,  // Trọng số cho box1
        'box2': 42,  // Trọng số cho box2
        'box3': 21,  // Trọng số cho box3
        'box4': 7,  // Trọng số cho box4
        'box5': 1,  // Trọng số cho box5
        'box6': 7,  // Trọng số cho box6
        'box7': 1   // Trọng số cho box7
    };

    // Tính tổng phần trăm
    const totalPercentage = Object.values(percentages).reduce((acc, percentage) => acc + percentage, 0);

    // Kiểm tra xem tổng phần trăm có đúng 100% không
    if (totalPercentage !== 100) {
        console.error("Tổng phần trăm không bằng 100%!");
        return;
    }

    startButton.addEventListener('click', function() {
        startScreen.style.display = 'none';
        mysteryBox.style.display = 'flex';

        // Chọn một sản phẩm dựa trên phần trăm
        let randomPercentage = Math.floor(Math.random() * 100);  // Số ngẫu nhiên từ 0 đến 99
        let selectedBoxId = '';

        // Duyệt qua các phần trăm để chọn box
        let cumulativePercentage = 0;
        for (let boxId in percentages) {
            cumulativePercentage += percentages[boxId];
            if (randomPercentage < cumulativePercentage) {
                selectedBoxId = boxId;
                break;
            }
        }

        // Ẩn tất cả các sản phẩm
        boxes.forEach(function(box) {
            box.style.display = 'none';
        });

        // Hiển thị sản phẩm được chọn theo ID
        const selectedBox = document.getElementById(selectedBoxId);
        selectedBox.style.display = 'flex';

        //haha
    });
});
