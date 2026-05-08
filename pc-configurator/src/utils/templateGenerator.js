import * as XLSX from 'xlsx';

export function downloadTemplate() {
  const headers = [
    'Category', 'Brand', 'Model', 'Specifications',
    'Cost Price', 'Selling Price', 'Stock', 'Tag',
  ];

  const sampleRows = [
    ['CPU', 'Intel', 'Core i7-13700K', '16 Cores, 5.4GHz, 125W TDP', 2800, 3500, 'Available', 'LGA1700'],
    ['CPU', 'AMD', 'Ryzen 9 7900X', '12 Cores, 5.6GHz, 170W TDP', 3200, 4000, 'Available', 'AM5'],
    ['Motherboard', 'ASUS', 'ROG STRIX Z790-E', 'ATX, DDR5, PCIe 5.0', 1800, 2300, 'Available', 'LGA1700'],
    ['Motherboard', 'MSI', 'MAG X670E TOMAHAWK', 'ATX, DDR5, PCIe 5.0', 1500, 1900, 'Available', 'AM5'],
    ['RAM', 'Corsair', 'Vengeance DDR5 32GB', '32GB (2x16GB) DDR5 6000MHz', 450, 580, 'Available', ''],
    ['GPU', 'NVIDIA', 'RTX 4070 Ti', '12GB GDDR6X, 285W', 3200, 4000, 'Available', ''],
    ['GPU', 'AMD', 'RX 7900 XTX', '24GB GDDR6, 355W', 2800, 3500, 'Out of Stock', ''],
    ['Storage', 'Samsung', '990 Pro 1TB NVMe', 'M.2 NVMe PCIe 4.0, 7450MB/s', 380, 490, 'Available', ''],
    ['PSU', 'Corsair', 'RM850x 850W', '80+ Gold, Fully Modular', 520, 660, 'Available', ''],
    ['Cabinet', 'Lian Li', 'PC-O11 Dynamic EVO', 'Mid-Tower ATX, Tempered Glass', 480, 620, 'Available', ''],
    ['Cooling', 'NZXT', 'Kraken X63 280mm', '280mm AIO Liquid Cooler', 420, 540, 'Available', ''],
    ['Monitor', 'LG', '27GP850-B 27"', '27" QHD 165Hz IPS, 1ms', 1400, 1750, 'Available', ''],
    ['Keyboard', 'Keychron', 'K8 Pro TKL', 'TKL Mechanical, RGB, Wireless', 340, 440, 'Available', ''],
    ['Mouse', 'Logitech', 'G502 X Plus', 'Wireless, 25600 DPI, HERO sensor', 270, 350, 'Available', ''],
    ['Peripherals', 'Logitech', 'C920 HD Pro Webcam', '1080p 30fps, Auto-focus', 290, 380, 'Available', ''],
  ];

  const ws = XLSX.utils.aoa_to_sheet([headers, ...sampleRows]);
  ws['!cols'] = [
    { wch: 14 }, { wch: 12 }, { wch: 28 }, { wch: 36 },
    { wch: 12 }, { wch: 14 }, { wch: 12 }, { wch: 12 },
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Parts List');
  XLSX.writeFile(wb, 'PC_Parts_Template.xlsx');
}
