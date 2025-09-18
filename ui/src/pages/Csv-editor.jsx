import React, { useState, useRef } from "react";
import Papa from "papaparse";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload, Download, Plus, Trash2, FileSpreadsheet } from "lucide-react";

const CsvEditor = () => {
  const [data, setData] = useState([]);
  const [filename, setFilename] = useState("edited.csv");
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  // Handle file upload
  const handleFileUpload = (file) => {
    if (!file) return;
    setIsUploading(true);
    setFilename(file.name.replace(/\.[^/.]+$/, ".csv"));
    
    Papa.parse(file, {
      complete: (results) => {
        setData(results.data);
        setIsUploading(false);
      },
      header: false,
      skipEmptyLines: true,
    });
  };

  // Handle drag and drop
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  // Edit a single cell
  const handleCellChange = (rowIdx, colIdx, value) => {
    const newData = [...data];
    newData[rowIdx][colIdx] = value;
    setData(newData);
  };

  // Add a new row
  const addRow = () => {
    const newRow = new Array(data[0]?.length || 3).fill("");
    setData([...data, newRow]);
  };

  // Add a new column
  const addColumn = () => {
    setData(data.map((row) => [...row, ""]));
  };

  // Delete a row
  const deleteRow = (rowIdx) => {
    const newData = data.filter((_, i) => i !== rowIdx);
    setData(newData);
  };

  // Delete a column
  const deleteColumn = (colIdx) => {
    const newData = data.map(row => row.filter((_, i) => i !== colIdx));
    setData(newData);
  };

  // Export CSV
  const exportCSV = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename || "edited.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Main Card */}
        <Card className="shadow-2xl rounded-3xl overflow-hidden">
          <CardContent className="p-8">
            {/* Upload Section */}
            <div className="mb-8">
              <div
                className={`relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 ${
                  dragActive
                    ? "border-blue-400 bg-blue-50 scale-105"
                    : "border-gray-300 hover:border-blue-500 hover:bg-blue-50/50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="text-center">
                  <div className="mb-4">
                    <Upload className={`w-12 h-12 mx-auto transition-all duration-300 ${
                      dragActive ? "text-blue-500 scale-110" : "text-gray-400"
                    }`} />
                  </div>
                  <p className="text-gray-600 mb-4 text-lg">
                    Drag and drop your CSV file here or click to browse
                  </p>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Choose File
                      </>
                    )}
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv"
                    onChange={(e) => handleFileUpload(e.target.files[0])}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Filename Input */}
              <div className="mt-6 flex items-center gap-4">
                <label className="text-gray-700 font-medium whitespace-nowrap">
                  Export as:
                </label>
                <Input
                  type="text"
                  value={filename}
                  onChange={(e) => setFilename(e.target.value)}
                  placeholder="Enter filename.csv"
                  className="focus:border-blue-400 focus:ring-blue-400/30 rounded-xl"
                />
              </div>
            </div>

            {/* Table Section */}
            {data.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <FileSpreadsheet className="w-5 h-5 text-blue-500" />
                    Data Table
                    <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                      {data.length} rows × {data[0]?.length || 0} columns
                    </span>
                  </h3>
                  
                  <div className="flex gap-2">
                    <Button
                      onClick={addColumn}
                      variant="outline"
                      className="hover:bg-blue-50 hover:border-blue-400 transition-all duration-300"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Column
                    </Button>
                    <Button
                      onClick={addRow}
                      variant="outline"
                      className="hover:bg-blue-50 hover:border-blue-400 transition-all duration-300"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Row
                    </Button>
                  </div>
                </div>

                <div className="overflow-auto max-h-[60vh] rounded-2xl border border-gray-200 bg-white">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        {data[0]?.map((_, colIdx) => (
                          <th key={colIdx} className="px-4 py-3 text-left text-gray-700 font-medium relative group">
                            <div className="flex items-center justify-between">
                              <span>Column {colIdx + 1}</span>
                              <Button
                                onClick={() => deleteColumn(colIdx)}
                                variant="ghost"
                                size="sm"
                                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-red-600 hover:text-red-700 hover:bg-red-50 p-1 h-auto"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </th>
                        ))}
                        <th className="px-4 py-3 w-20"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((row, rowIdx) => (
                        <tr
                          key={rowIdx}
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 group"
                        >
                          {row.map((cell, colIdx) => (
                            <td key={colIdx} className="border-r border-gray-100 p-0">
                              <input
                                className="w-full px-4 py-3 bg-transparent text-gray-900 placeholder:text-gray-400 focus:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all duration-200"
                                value={cell || ""}
                                onChange={(e) =>
                                  handleCellChange(rowIdx, colIdx, e.target.value)
                                }
                                placeholder="Enter value..."
                              />
                            </td>
                          ))}
                          <td className="px-4 py-3">
                            <Button
                              onClick={() => deleteRow(rowIdx)}
                              variant="ghost"
                              size="sm"
                              className="opacity-0 group-hover:opacity-100 transition-all duration-200 text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Export Section */}
                <div className="flex justify-end">
                  <Button
                    onClick={exportCSV}
                    className="bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105 px-6 py-3"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </div>
            )}

            {/* Empty State */}
            {data.length === 0 && !isUploading && (
              <div className="text-center py-16">
                <div className="inline-flex p-6 bg-blue-50 rounded-full mb-6">
                  <FileSpreadsheet className="w-12 h-12 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No CSV loaded</h3>
                <p className="text-gray-600 mb-6">Upload a CSV file to start editing, or create a new table</p>
                <Button
                  onClick={() => {
                    setData([["Header 1", "Header 2", "Header 3"], ["Row 1", "", ""], ["Row 2", "", ""]]);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Table
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stats Card */}
        {data.length > 0 && (
          <Card className="mt-6 shadow-xl rounded-2xl">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {data.length}
                  </div>
                  <div className="text-gray-600 text-sm font-medium">Total Rows</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {data[0]?.length || 0}
                  </div>
                  <div className="text-gray-600 text-sm font-medium">Total Columns</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-1">
                    {data.length * (data[0]?.length || 0)}
                  </div>
                  <div className="text-gray-600 text-sm font-medium">Total Cells</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        /* Scrollbar Styling */
        .overflow-auto::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        .overflow-auto::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 10px;
        }
        
        .overflow-auto::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #3b82f6, #1d4ed8);
          border-radius: 10px;
        }
        
        .overflow-auto::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #2563eb, #1e40af);
        }
      `}</style>
    </div>
  );
};

export default CsvEditor;