import * as XLSX from 'xlsx';

export function downloadTemplate() {
  const headers = [
    'Category',
    'Brand',
    'Model',
    'Specifications',
    'Cost Price',
    'Selling Price',
    'Stock',
    'Tag',
  ];

  const sampleRows = [
    ['CPU', 'Intel', 'Core i7-13700K', '16 Cores, 5.4GHz, 125W TDP', 28000, 35000, 'Available', 'LGA1700'],
    ['CPU', 'AMD', 'Ryzen 9 7900X', '12 Cores, 5.6GHz, 170W TDP', 32000, 40000, 'Available', 'AM5'],
    ['Motherboard', 'ASUS', 'ROG STRIX Z790-E', 'ATX, DDR5, PCIe 5.0', 32000, 40000, 'Available', 'LGA1700'],
    ['Motherboard', 'MSI', 'MAG X670E TOMAHAWK', 'ATX, DDR5, PCIe 5.0', 28000, 35000, 'Available', 'AM5'],
    ['RAM', 'Corsair', 'Vengeance DDR5 32GB', '32GB (2x16GB) DDR5 6000MHz', 8500, 11000, 'Available', ''],
    ['GPU', 'NVIDIA', 'RTX 4070 Ti', '12GB GDDR6X, 285W', 65000, 80000, 'Available', ''],
    ['Storage', 'Samsung', '990 Pro 1TB NVMe', 'M.2 NVMe PCIe 4.0, 7450MB/s', 8000, 10500, 'Available', ''],
    ['PSU', 'Corsair', 'RM850x 850W', '80+ Gold, Fully Modular', 10000, 13000, 'Available', ''],
    ['Cabinet', 'Lian Li', 'PC-O11 Dynamic EVO', 'Mid-Tower ATX, Tempered Glass', 9000, 12000, 'Available', ''],
    ['Cooling', 'NZXT', 'Kraken X63 280mm', '280mm AIO Liquid Cooler', 8500, 11000, 'Available', ''],
    ['Monitor', 'LG', '27GP850-B 27"', '27" QHD 165Hz IPS, 1ms', 28000, 35000, 'Available', ''],
    ['Keyboard', 'Keychron', 'K8 Pro TKL', 'TKL Mechanical, RGB, Wireless', 7000, 9000, 'Available', ''],
    ['Mouse', 'Logitech', 'G502 X Plus', 'Wireless, 25600 DPI, HERO sensor', 5500, 7500, 'Available', ''],
    ['Peripherals', 'Logitech', 'C920 HD Pro Webcam', '1080p 30fps, Auto-focus', 6000, 8000, 'Available', ''],
  ];

  const ws = XLSX.utils.aoa_to_sheet([headers, ...sampleRows]);

  // Column widths
  ws['!cols'] = [
    { wch: 14 }, { wch: 12 }, { wch: 28 }, { wch: 36 },
    { wch: 12 }, { wch: 14 }, { wch: 12 }, { wch: 12 },
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Parts List');
  XLSX.writeFile(wb, 'PC_Parts_Template.xlsx');
}
