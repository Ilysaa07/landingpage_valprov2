import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Loader2, AlertCircle, RefreshCw, Download, Search, ChevronLeft, ChevronRight, FileText, AlertTriangle, Info, ExternalLink } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ValproAssistant from '../components/ValproAssistant';

// Import PDF documents
import pmpupr8 from '../assets/dokumen/1.2022pmpupr8.pdf';
import pedomanSBU from '../assets/dokumen/ilide.info-pedoman-pencatatan-sertifikat-badan-usaha-dan-sertifikat-kompetensi-kerja-konstr-pr_9041a258cc613b352994f291319b16ad.pdf';
import sanksiAdministratif from '../assets/dokumen/LPJK-SOSIALISASI-PENGENAAN-SANKSI-ADMINSTRATIF_26022024-1.pdf';

const DataPemenuhanAlat = () => {
  const [data, setData] = useState({
    komitmentAlat: [],
    jenisAlat: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('komitment');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Google Sheets API configuration
  const SHEET_ID = '1Thb57tW6slr9f5MIvaTmdLUgX2rOEvbKzK5lKB-OJDU';
  const KOMITMENT_SHEET_ID = '647195516';
  const JENIS_ALAT_SHEET_ID = '0'; // Default sheet

  // Fetch data from Google Sheets
  const fetchSheetData = async (sheetId, sheetName) => {
    try {
      const response = await fetch(
        `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&gid=${sheetId}`
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch ${sheetName} data`);
      }
      
      const csvText = await response.text();
      const lines = csvText.split('\n');
      const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
      
      const rows = lines.slice(1)
        .filter(line => line.trim())
        .map(line => {
          const values = line.split(',').map(v => v.replace(/"/g, '').trim());
          const row = {};
          headers.forEach((header, index) => {
            row[header] = values[index] || '';
          });
          return row;
        });
      
      return { headers, rows };
    } catch (error) {
      console.error(`Error fetching ${sheetName}:`, error);
      throw error;
    }
  };

  // Load all data
  const loadData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [komitmentData, jenisAlatData] = await Promise.all([
        fetchSheetData(KOMITMENT_SHEET_ID, 'Komitment Alat SBU'),
        fetchSheetData(JENIS_ALAT_SHEET_ID, 'Jenis Alat')
      ]);
      
      setData({
        komitmentAlat: komitmentData.rows,
        jenisAlat: jenisAlatData.rows
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Filter and search data
  const getFilteredData = () => {
    let filteredData = [];
    
    if (filterType === 'komitment') {
      filteredData = data.komitmentAlat;
    } else if (filterType === 'jenis') {
      filteredData = data.jenisAlat;
    }
    
    if (searchTerm) {
      filteredData = filteredData.filter(row =>
        Object.values(row).some(value =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    
    return filteredData;
  };

  // Get status color based on status value
  const getStatusColor = (status) => {
    if (!status) return 'text-gray-400';
    
    const statusLower = status.toString().toLowerCase();
    
    if (statusLower.includes('sudah') || statusLower.includes('selesai') || statusLower.includes('complete')) {
      return 'text-green-400 bg-green-500/20 ring-1 ring-green-400/30';
    } else if (statusLower.includes('on process') || statusLower.includes('proses') || statusLower.includes('sedang')) {
      return 'text-yellow-400 bg-yellow-500/20 ring-1 ring-yellow-400/30';
    } else if (statusLower.includes('belum') || statusLower.includes('pending') || statusLower.includes('menunggu')) {
      return 'text-red-400 bg-red-500/20 ring-1 ring-red-400/30';
    }
    
    return 'text-gray-400';
  };

  // Pagination logic
  const getPaginatedData = (data) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const getTotalPages = (data) => {
    return Math.ceil(data.length / itemsPerPage);
  };

  // Sort data
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = (data) => {
    if (!sortConfig.key) return data;
    
    return [...data].sort((a, b) => {
      const aVal = a[sortConfig.key] || '';
      const bVal = b[sortConfig.key] || '';
      
      if (sortConfig.direction === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
  };

  // Export to CSV
  const exportToCSV = () => {
    const filteredData = getFilteredData();
    const headers = Object.keys(filteredData[0] || {});
    
    const csvContent = [
      headers.join(','),
      ...filteredData.map(row => 
        headers.map(header => `"${row[header] || ''}"`).join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data-pemenuhan-alat.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Download document handlers
  const downloadDocument = (file, filename) => {
    const link = document.createElement('a');
    link.href = file;
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadPMPUPR8 = () => {
    downloadDocument(pmpupr8, 'Peraturan-Menteri-PUPR-No-8-2022-Tata-Cara-Pemenuhan-Sertifikat.pdf');
  };

  const handleDownloadPedomanSBU = () => {
    downloadDocument(pedomanSBU, 'SE-LPJK-No-18-2021-Pedoman-Pencatatan-SBU-SKK.pdf');
  };

  const handleDownloadSanksiAdministratif = () => {
    downloadDocument(sanksiAdministratif, 'SE-Menteri-PUPR-BK-10MM75-2024-Sanksi-Administratif-Pencabutan-SBU.pdf');
  };

  const filteredData = getSortedData(getFilteredData());
  const paginatedData = getPaginatedData(filteredData);
  const totalPages = getTotalPages(filteredData);
  const headers = paginatedData.length > 0 ? Object.keys(paginatedData[0]) : [];

  // Reset to first page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filterType, searchTerm]);

  return (
    <>
      <Helmet>
        <title>Data Pemenuhan Alat - Valpro Intertech</title>
        <meta name="description" content="Data pemenuhan alat dan komitment alat SBU untuk proyek konstruksi" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-[#0e0637] text-white">
        <Header />
        
        {/* Page Header - with proper spacing from navbar */}
        <div className="bg-gradient-to-r from-[#5792ff] to-[#4a7cd6] pt-24 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Data Pemenuhan Alat</h1>
              <p className="text-lg opacity-90">Komitment Alat SBU & Jenis Alat Konstruksi</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Information Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 mb-8 ring-1 ring-white/10">
            <div className="flex items-start gap-4 mb-8">
              <Info className="h-6 w-6 text-[#5792ff] mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Informasi Data</h2>
                <p className="text-gray-300 leading-relaxed mb-4 text-base">
                  Data di bawah ini diambil secara real-time dari database kami dan menampilkan informasi pemenuhan SBU badan usaha.
                </p>
                <p className="text-gray-300 leading-relaxed text-base">
                  Setiap badan usaha yang telah memperoleh Sertifikat Badan Usaha (SBU) wajib melakukan registrasi peralatan melalui portal SIMPK. 
                  Surat Pernyataan Pemenuhan Peralatan hanya berlaku 1 bulan sejak terbitnya SBU.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Dasar Hukum */}
              <div className="bg-white/5 rounded-xl p-6 ring-1 ring-white/10">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                  <FileText className="h-6 w-6 text-[#5792ff]" />
                  Dasar Hukum
                </h3>
                <ul className="space-y-3 text-base text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-[#5792ff] mt-1">•</span>
                    <span>Peraturan LPJK Nomor 6 Tahun 2022</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#5792ff] mt-1">•</span>
                    <span>Permen PUPR Nomor 8 Tahun 2022</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#5792ff] mt-1">•</span>
                    <span>Surat Edaran LPJK terkait SIMPK</span>
                  </li>
                </ul>
              </div>

              {/* Sanksi */}
              <div className="bg-white/5 rounded-xl p-6 ring-1 ring-white/10">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                  Sanksi Jika Tidak Registrasi
                </h3>
                <ul className="space-y-3 text-base text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span>Status SBU dihentikan sementara</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span>Pencabutan permanen bila tidak dipenuhi</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Dokumen Resmi */}
            <div className="mt-8 bg-white/5 rounded-xl p-6 ring-1 ring-white/10">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                <FileText className="h-6 w-6 text-[#5792ff]" />
                Dokumen Resmi
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <span className="text-base text-gray-300 flex-1 mr-4">Peraturan menteri PUPR No. 8/2022 — Tata cara pemenuhan sertifikat</span>
                  <button 
                    onClick={handleDownloadPMPUPR8}
                    className="text-[#5792ff] hover:text-[#4a7cd6] transition-colors p-2 hover:bg-white/10 rounded-lg"
                    title="Download PDF"
                  >
                    <Download className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <span className="text-base text-gray-300 flex-1 mr-4">SE LPJK No. 2/2024 — Batas pencatatan alat di SIMPK</span>
                  <ExternalLink className="h-5 w-5 text-gray-400" />
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <span className="text-base text-gray-300 flex-1 mr-4">SE LPJK No. 18/2021 — Pedoman pencatatan SBU/SKK</span>
                  <button 
                    onClick={handleDownloadPedomanSBU}
                    className="text-[#5792ff] hover:text-[#4a7cd6] transition-colors p-2 hover:bg-white/10 rounded-lg"
                    title="Download PDF"
                  >
                    <Download className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <span className="text-base text-gray-300 flex-1 mr-4">SE Menteri PUPR BK-10MM75/2024 — Sanksi administratif pencabutan SBU</span>
                  <button 
                    onClick={handleDownloadSanksiAdministratif}
                    className="text-[#5792ff] hover:text-[#4a7cd6] transition-colors p-2 hover:bg-white/10 rounded-lg"
                    title="Download PDF"
                  >
                    <Download className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 mb-8 ring-1 ring-white/10">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <label className="block text-sm font-medium text-gray-300 mb-2">Cari Data</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Masukkan kata kunci..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5792ff] text-base"
                  />
                </div>
              </div>

              {/* Filter and Actions */}
              <div className="flex flex-col sm:flex-row gap-4 items-end">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-300 mb-2">Pilih Data</label>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#5792ff] text-base min-w-[200px]"
                  >
                    <option value="komitment">Komitment Alat SBU</option>
                    <option value="jenis">Jenis Alat</option>
                  </select>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={loadData}
                    disabled={loading}
                    className="px-6 py-3 bg-[#5792ff] hover:bg-[#4a7cd6] text-white rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2 text-base font-medium"
                  >
                    <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                  </button>

                  <button
                    onClick={exportToCSV}
                    disabled={filteredData.length === 0}
                    className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2 text-base font-medium"
                  >
                    <Download className="h-5 w-5" />
                    Export CSV
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl ring-1 ring-white/10 overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-[#5792ff]" />
                <span className="ml-3 text-lg">Memuat data...</span>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center py-12">
                <AlertCircle className="h-8 w-8 text-red-400" />
                <div className="ml-3 text-center">
                  <p className="text-lg font-semibold text-red-400">Error</p>
                  <p className="text-gray-300">{error}</p>
                  <button
                    onClick={loadData}
                    className="mt-4 px-4 py-2 bg-[#5792ff] hover:bg-[#4a7cd6] text-white rounded-lg transition-colors"
                  >
                    Coba Lagi
                  </button>
                </div>
              </div>
            ) : filteredData.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-gray-300">Tidak ada data yang ditemukan</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-white/10">
                      <tr>
                        {headers.map((header, index) => (
                          <th
                            key={index}
                            className="px-6 py-4 text-left text-sm font-semibold text-white cursor-pointer hover:bg-white/20 transition-colors"
                            onClick={() => handleSort(header)}
                          >
                            <div className="flex items-center gap-2">
                              {header}
                              {sortConfig.key === header && (
                                <span className="text-[#5792ff]">
                                  {sortConfig.direction === 'asc' ? '↑' : '↓'}
                                </span>
                              )}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {paginatedData.map((row, index) => (
                        <tr key={index} className="hover:bg-white/5 transition-colors">
                          {headers.map((header, cellIndex) => {
                            const value = row[header] || '-';
                            const isStatusColumn = header.toLowerCase().includes('status') || 
                                                  header.toLowerCase().includes('kondisi') ||
                                                  header.toLowerCase().includes('progres');
                            
                            return (
                              <td key={cellIndex} className="px-6 py-4 text-sm">
                                {isStatusColumn ? (
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(value)}`}>
                                    {value}
                                  </span>
                                ) : (
                                  <span className="text-gray-300">{value}</span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-6 border-t border-white/10 gap-4">
                    <div className="text-base text-gray-400">
                      Menampilkan {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, filteredData.length)} dari {filteredData.length} data
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="p-3 rounded-lg bg-white/10 hover:bg-white/20 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                              currentPage === pageNum
                                ? 'bg-[#5792ff] text-white'
                                : 'bg-white/10 hover:bg-white/20 text-gray-300'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                      
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="p-3 rounded-lg bg-white/10 hover:bg-white/20 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Stats */}
          {!loading && !error && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 ring-1 ring-white/10 text-center">
                <p className="text-3xl font-bold text-[#5792ff] mb-2">{data.komitmentAlat.length}</p>
                <p className="text-base text-gray-300">Komitment Alat SBU</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 ring-1 ring-white/10 text-center">
                <p className="text-3xl font-bold text-[#4a7cd6] mb-2">{data.jenisAlat.length}</p>
                <p className="text-base text-gray-300">Jenis Alat</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 ring-1 ring-white/10 text-center">
                <p className="text-3xl font-bold text-green-400 mb-2">{paginatedData.length}</p>
                <p className="text-base text-gray-300">Data Ditampilkan</p>
              </div>
            </div>
          )}
        </div>
        
        <Footer />
        <ValproAssistant />
      </div>
    </>
  );
};

export default DataPemenuhanAlat;
