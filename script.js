document.addEventListener('DOMContentLoaded', () => {
    const spinButton = document.getElementById('spin-button');
    const slotMachine = document.getElementById('slot-machine');
    const items = document.querySelector('.items');
    const itemWidth = 350; // Kích thước mỗi sản phẩm
    const totalItems = 7; // Tổng số sản phẩm
    const repeatCount = 5; // Số lần lặp lại danh sách sản phẩm để tạo hiệu ứng
    const overlay = document.getElementById('overlay');
    const resultImg = document.getElementById('result-img');
    const resultName = document.getElementById('result-name');
    const resultDescription = document.getElementById('result-description');

    // Tạo danh sách sản phẩm với phần trăm xác suất
    const products = [
        { img: 'img/gutrang.jpg', percentage: 42 }, // 50%
        { img: 'img/gcangbong.jpg', percentage: 7 }, // 30%
        { img: 'img/gphuchoi.jpg', percentage: 7 }, // 20%
        { img: 'img/gxoanhan.jpg', percentage: 21 }, // 0%
        { img: 'img/gsanchac.jpg', percentage: 21 }, // 0%
        { img: 'img/g55.jpg', percentage: 1 }, // 0%
        { img: 'img/g20.jpg', percentage: 1 }, // 0%
    ];

    // Lặp lại danh sách để tạo hiệu ứng quay liên tục
    const originalItems = items.innerHTML;
    items.innerHTML = originalItems.repeat(repeatCount);

    let isSpinning = false;

    // Hàm tính toán sản phẩm trúng thưởng dựa trên phần trăm
    function getRandomProductIndex() {
        const totalPercentage = products.reduce((acc, product) => acc + product.percentage, 0);
        const random = Math.random() * totalPercentage;
        let cumulativePercentage = 0;

        for (let i = 0; i < products.length; i++) {
            cumulativePercentage += products[i].percentage;
            if (random < cumulativePercentage) {
                return i;
            }
        }

        return 0; // Mặc định là sản phẩm đầu tiên nếu không có kết quả
    }

    spinButton.addEventListener('click', () => {
        if (isSpinning) return;
    
        // Ẩn nút "START" khi bắt đầu quay
        spinButton.style.display = 'none';
        slotMachine.style.opacity = 1;
    
        isSpinning = true;
    
        // Lấy chỉ số sản phẩm trúng thưởng dựa trên phần trăm
        const randomIndex = getRandomProductIndex();
    
        // Tính toán vị trí cần dừng sao cho sản phẩm nằm chính giữa
        const slotMachineWidth = slotMachine.offsetWidth;
        const centerOffset = (slotMachineWidth - itemWidth) / 2;
        const targetPosition = -(randomIndex * itemWidth) + centerOffset;
    
        // Tạo vòng quay dài hơn để tạo hiệu ứng
        const extraSpin = -(totalItems * (repeatCount - 1) * itemWidth);
        const finalPosition = extraSpin + targetPosition;
    
        // Thêm hiệu ứng quay
        items.style.transition = 'transform 4s cubic-bezier(0.17, 0.67, 0.83, 0.67)';
        items.style.transform = `translateX(${finalPosition}px)`;
    
        // Dừng quay và hiển thị kết quả
        setTimeout(() => {
            isSpinning = false;
    
            // Reset vị trí để lặp lại
            items.style.transition = 'none';
            items.style.transform = `translateX(${targetPosition}px)`;
    
            // Hiển thị kết quả
            const selectedProduct = products[randomIndex];
            resultImg.src = selectedProduct.img;
            
    
            // Đợi 1,5 giây rồi mới hiển thị overlay
            setTimeout(() => {
                overlay.classList.remove('hidden');
            }, 1500); // Đợi 1,5 giây
        }, 4000); // Thời gian quay (4 giây)
    });

    // Đóng overlay khi nhấn vào nó
    overlay.addEventListener('click', () => {
        overlay.classList.add('hidden');

        // Hiện lại nút "START" và ẩn khung quay
        spinButton.style.display = 'block';
        slotMachine.style.opacity = 0;
    });
});
